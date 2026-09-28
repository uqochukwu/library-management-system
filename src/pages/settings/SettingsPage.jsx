import {useState } from "react";
import { settingsService } from "../../core/services/settingsService";
import ConfirmModal from "../../shared/components/common/ConfirmModal";
import "./settings.css";

export default function SettingsPage() {
  const [form, setForm] = useState({
      loanPeriodDays: 14,
      fineRatePerDay: 0,
      maxActiveLoans: 3,
      unpaidFinethreshold: 0,
    }),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [confirm, setConfirm] = useState(false),
    [saved, setSaved] = useState(false);

  const save = async () => {
    console.log("SAVE FUNCTION STARTED")
    setBusy(true);
    setError("");
    try {
      const payload = {
        ...form,
        loanPeriodDays: Number(form.loanPeriodDays),
        fineRatePerDay: Number(form.fineRatePerDay),
        maxActiveLoans: Number(form.maxActiveLoans),
        unpaidFinethreshold: Number(form.unpaidFinethreshold),
      };

      console.log("SETTINGS PAYLOAD:", payload);

      await settingsService.update(payload);

      console.log("UPDATE SUCCESS")
      setSaved(true);
      setConfirm(false);
    } catch (e) {
      console.error("SETTINGS UPDATE FAILED", e)
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <main className="settings-page">
      <div className="settings-card">
        <h1>System Settings</h1>
        <p>Configure loan period, fine rate and maximum active loans.</p>
        {[
          "loanPeriodDays",
          "fineRatePerDay",
          "maxActiveLoans",
          "unpaidFinethreshold",
        ].map((k) => (
          <label key={k}>
            {k === "loanPeriodDays"
              ? "Loan Period (days)"
              : k === "fineRatePerDay"
                ? "Fine Rate Per Day"
                : k === "maxActiveLoans"
                  ? "Maximum Active Loans"
                  : "Unpaid Fine Threshold"}
            <input
              type="number"
              value={form[k]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            />
          </label>
        ))}
        {error && <div className="setting-error">{error}</div>}
        <div className="setting-actions">
          <button className="cancel" onClick={() => location.reload()}>
            CANCEL
          </button>
          <button onClick={() => setConfirm(true)}>SAVE</button>
        </div>
        {saved && <p className="success">Settings saved successfully.</p>}
      </div>
      {confirm && (
        <ConfirmModal
          title="Confirm Settings"
          message="Save these library policy changes?"
          confirmText={busy ? "SAVING..." : "CONFIRM"}
          onConfirm={save}
          onClose={() => setConfirm(false)}
        />
      )}
    </main>
  );
}

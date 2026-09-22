import { useCallback, useEffect, useState } from "react";
import { reservationService } from "../../core/services/reservationService";
import { listOf, totalOf } from "../../utilities/helpers";
import Pagination from "../../shared/components/common/Pagination";
import Modal from "../../shared/components/common/Modal";
import "../members/mb.css";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]),
    [total, setTotal] = useState(0),
    [page, setPage] = useState(1),
    [busy, setBusy] = useState(true),
    [error, setError] = useState(""),
    [open, setOpen] = useState(false),
    [form, setForm] = useState({ memberEmail: "", isbn: "" }),
    [saving, setSaving] = useState(false);
  const size = 10;
  const load = useCallback(async () => {
    try {
      setBusy(true);
      setError("");
      const r = await reservationService.list({
        pageNumber: page,
        pageSize: size,
      });
      const l = listOf(r);
      setReservations(l);
      setTotal(totalOf(r, l));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }, [page]);
  useEffect(() => {
    load();
  }, [load]);
  async function create() {
    try {
      setSaving(true);
      await reservationService.create(form);
      setOpen(false);
      setForm({ memberEmail: "", isbn: "" });
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }
  return (
    <main className="mb-page">
      <div className="mb-page-head">
        <h1>Reservations</h1>
        <button className="mb-primary" onClick={() => setOpen(true)}>
          ＋ Reserve Book
        </button>
      </div>
      <section className="mb-card">
        {busy ? (
          <div className="mb-state">Loading reservations...</div>
        ) : error ? (
          <div className="mb-state">
            <p>{error}</p>
            <button onClick={load}>RETRY</button>
          </div>
        ) : !reservations.length ? (
          <div className="mb-state">No reservations found.</div>
        ) : (
          <div className="mb-table-wrap">
            <table className="mb-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Member</th>
                  <th>Book</th>
                  <th>Status</th>
                  <th>Queue</th>
                  <th>Hold Until</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r, i) => (
                  <tr key={r.id ?? i}>
                    <td>{r.reservationId ?? "—"}</td>
                    <td>{r.memberEmail ?? "—"}</td>
                    <td>{r.isbn ?? r.bookIsbn ?? r.bookId ?? "—"}</td>
                    <td>{r.status ?? "Pending"}</td>
                    <td>{r.position ?? r.queuePosition ?? "—"}</td>
                    <td>{r.holdUntil ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination
          page={page}
          pageSize={size}
          total={total}
          onChange={setPage}
        />
      </section>
      {open && (
        <Modal title="Reserve Unavailable Book" onClose={() => setOpen(false)}>
          <div className="mb-form">
            <label>
              Member Email
              <input
                value={form.memberEmail}
                onChange={(e) =>
                  setForm({ ...form, memberEmail: e.target.value })
                }
              />
            </label>
            <label>
              Book ISBN
              <input
                value={form.isbn}
                onChange={(e) => setForm({ ...form, isbn: e.target.value })}
              />
            </label>
            <div className="mb-buttons">
              <button className="mb-secondary" onClick={() => setOpen(false)}>
                CANCEL
              </button>
              <button
                className="mb-primary"
                disabled={saving}
                onClick={create}
              >
                {saving ? "RESERVING..." : "RESERVE"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}

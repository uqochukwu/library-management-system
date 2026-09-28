import { useState } from "react";
import Modal from "./Modal";
import {loanService} from "../../../core/services/loanService";

export default function IssueBookModal({ onClose, onSaved }) {
  const [f, setF] = useState({ memberEmail: "", isbn: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    if (!f.memberEmail || !f.isbn) {
      setError("Member email and ISBN are required.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const payload = {
  memberEmail: f.memberEmail.trim(),
  isbn: f.isbn.trim(),
    };
      const r = await loanService.borrow(payload);
      onSaved(r);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal title="Issue Book" onClose={onClose}>
      <form className="reserve-form" onSubmit={submit}>
        <input
          placeholder="Member Email"
          value={f.memberEmail}
          onChange={(e) => setF({ ...f, memberEmail: e.target.value })}
        />
        <input
          placeholder="Book ISBN"
          value={f.isbn}
          onChange={(e) => setF({ ...f, isbn: e.target.value })}
        />
        {error && <p>{error}</p>}
        <div>
          <button type="button" onClick={onClose}>
            CANCEL
          </button>
          <button className="black" disabled={busy}>
            {busy ? "ISSUING..." : "ISSUE"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

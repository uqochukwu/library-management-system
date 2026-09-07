import { useState } from "react";
import Modal from "./Modal";
import { loanService } from "../../../core/services/loanService";

export default function BorrowBookModal({
  memberEmail,
  memberId,
  books,
  onClose,
  onSaved,
}) {
  const [selected, setSelected] = useState(""),
    [error, setError] = useState(""),
    [saving, setSaving] = useState(false);
  async function submit() {
    const book = books.find((b) => (b.id ?? b.bookId ?? b.isbn) === selected);
    if (!book) return setError("Select a book.");
    try {
      setSaving(true);
      await loanService.borrow({
        isbn: book.isbn ?? book.ISBN ?? book.id,
        memberEmail: memberEmail ?? memberId,
      });
      onSaved();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }
  return (
    <Modal title="Borrow Book" wide onClose={onClose}>
      <div className="mb-book-list">
        {books.map((book) => {
          const id = book.id ?? book.bookId ?? book.isbn;
          return (
            <label key={id} className="mb-book-row">
              <input
                type="radio"
                name="book"
                checked={selected === id}
                onChange={() => setSelected(id)}
              />
              <span>{book.title ?? book.name ?? book.bookName}</span>
              <small>
                {book.type ?? "Educational"} · {book.language ?? "English"}
              </small>
            </label>
          );
        })}
      </div>
      {error && <p className="mb-form-error">{error}</p>}
      <div className="mb-buttons">
        <button className="mb-secondary" onClick={onClose}>
          CANCEL
        </button>
        <button className="mb-primary" disabled={saving} onClick={submit}>
          {saving ? "BORROWING..." : "CONFIRM"}
        </button>
      </div>
    </Modal>
  );
}

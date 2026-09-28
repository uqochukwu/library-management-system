import { useEffect, useMemo, useState } from "react";
import { bookService } from "../../core/services/bookService";
import { loanService } from "../../core/services/loanService";
import IssueBookModal from "../../shared/components/common/IssueBookModal";
import BorrowedBooksPopup from "../../shared/components/catalog/BorrowedBooksPopup";
import OverdueBooksPopup from "../../shared/components/catalog/OverdueBooksPopup";
import { bookId } from "../../utilities/helpers";
import ConfirmModal from "../../shared/components/common/ConfirmModal";
import Modal from "../../shared/components/common/Modal";
import {SendHorizonal, CirclePlus, Eye, Pencil, Trash } from "lucide-react"
import "./catalog.css";
import "../books/books.css";

const PAGE_SIZE = 10;

const emptyIssueForm = {
  bookId: "",
  memberId: "",
};

const empty = { title: "", author: "", isbn: "", genre: "", numberOfCopies: 1 };

function Form({ initial = empty, onSubmit, onClose, busy, label }) {
  const [f, setF] = useState({ ...empty, ...initial });
  const [e, setE] = useState("");
  const change = (k, v) => setF((x) => ({ ...x, [k]: v }));
  function submit(ev) {
    ev.preventDefault();
    if (
      !f.title ||
      !f.author ||
      !f.isbn ||
      !f.genre ||
      Number(f.numberOfCopies) < 0
    ) {
      setE("Title, author, ISBN, genre and copies are required.");
      return;
    }
    onSubmit({
      ...f,
      totalCopies: Number(f.numberOfCopies),
      name: f.title,
      quantity: Number(f.numberOfCopies),
    });
  }
  return (
    <form className="book-form" onSubmit={submit}>
      <label>
        Title
        <input
          value={f.title}
          onChange={(e) => change("title", e.target.value)}
          required
        />
      </label>
      <label>
        Author
        <input
          value={f.author}
          onChange={(e) => change("author", e.target.value)}
          required
        />
      </label>
      <label>
        ISBN
        <input
          value={f.isbn}
          onChange={(e) => change("isbn", e.target.value)}
          required
        />
      </label>
      <label>
        Genre
        <input
          value={f.genre}
          onChange={(e) => change("genre", e.target.value)}
          required
        />
      </label>
      <label>
        Number of Copies
        <input
          type="number"
          min="0"
          value={f.numberOfCopies}
          onChange={(e) => change("numberOfCopies", e.target.value)}
          required
        />
      </label>
      {e && <p className="field-error">{e}</p>}
      <div className="modal-actions">
        <button type="button" className="light" onClick={onClose}>
          CANCEL
        </button>
        <button disabled={busy}>{busy ? "SAVING..." : label}</button>
      </div>
    </form>
  );
}

export default function CatalogPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false)
  const [activePopup, setActivePopup] = useState(null);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [modal, setModal] = useState(null);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [issueForm, setIssueForm] = useState(emptyIssueForm);
  const [issuing, setIssuing] = useState(false);
  const [issueError, setIssueError] = useState("");

  useEffect(() => {
    loadBooks();
  }, [pageNumber]);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await bookService.list({
        pageNumber,
        pageSize: PAGE_SIZE,
      });

      setBooks(response?.data || response || []);
    } catch (error) {
      console.error("Failed to load books:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return books;
    }

    return books.filter((book) => {
      const title = String(book?.title ?? "").toLowerCase();
      const author = String(book?.author ?? "").toLowerCase();
      const isbn = String(book?.isbn ?? "").toLowerCase();
      const genre = String(book?.genre ?? "").toLowerCase();

      return (
        title.includes(query) ||
        author.includes(query) ||
        isbn.includes(query) ||
        genre.includes(query)
      );
    });
  }, [books, search]);

  const handleIssueClick = (book) => {
    setSelectedBook(book);

    setIssueForm({
      bookId: book?.id ?? book?.bookId ?? "",
      memberId: "",
    });

    setIssueError("");
    setShowIssueModal(true);
  };

  const closeIssueModal = () => {
    if (issuing) return;

    setShowIssueModal(false);
    setSelectedBook(null);
    setIssueForm(emptyIssueForm);
    setIssueError("");
  };

  const handleIssueChange = (event) => {
    const { name, value } = event.target;

    setIssueForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleIssueBook = async (event) => {
    event?.preventDefault();

    if (!issueForm.bookId) {
      setIssueError("A book must be selected.");
      return;
    }

    if (!issueForm.memberId.trim()) {
      setIssueError("Please enter or select a member.");
      return;
    }

    try {
      setIssuing(true);
      setIssueError("");

      await loanService.issueBook({
        bookId: issueForm.bookId,
        memberId: issueForm.memberId.trim(),
      });

      closeIssueModal();

      await loadBooks();
    } catch (err) {
      console.error("Failed to issue book:", err);

      setIssueError(err?.message || "Unable to issue this book.");
    } finally {
      setIssuing(false);
    }
  };

  const openPopup = (popupName) => {
    setActivePopup(popupName);
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  const handlePreviousPage = () => {
    setPageNumber((current) => Math.max(current - 1, 1));
  };

  const handleNextPage = () => {
    setPageNumber((current) => current + 1);
  };

  const normalize = (b) => ({
    title: b?.title,
    author: b?.author,
    isbn: b?.isbn,
    genre: b?.genre,
    totalCopies: b?.numberOfCopies,
  });

  async function save(payload) {
    setSaving(true);
    setError("");
    try {
      if (modal === "add") await bookService.create(payload);
      else
        await bookService.update({
          ...payload,
          id: bookId(selected),
          bookId: bookId(selected),
        });
      setModal(null);
      setSelected(null);
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }
  async function remove() {
    setError("");
    try {
      await bookService.remove({
        id: bookId(selected),
        bookId: bookId(selected),
        isbn: selected?.isbn,
      });
      setSelected(null);
      load();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="catalog-page">
      <div className="catalog-top">
        <div>
          <h1>Catalog</h1>
          <p>Browse available books and manage book loans</p>
        </div>

        <div className="catalog-user">
          <div className="catalog-user-avatar">A</div>

          <span>Admin</span>

          <span className="catalog-user-arrow">▾</span>
        </div>
      </div>

      <div className="catalog-toolbar">
        <div className="catalog-buttons">
          <button
            type="button"
            className={
              activePopup === "borrowed"
                ? "catalog-action active"
                : "catalog-action"
            }
            onClick={() => openPopup("borrowed")}
          >
            Borrowed Books
          </button>

          <button
            type="button"
            className={
              activePopup === "overdue"
                ? "catalog-action active"
                : "catalog-action"
            }
            onClick={() => openPopup("overdue")}
          >
            Overdue Borrowers
          </button>
        </div>

        <div className="bk-tools">
          <button onClick={() => setModal("add")}><CirclePlus size={15} /> Add Book</button>
          <button
            type="button"
            className="catalog-button"
            onClick={() => handleIssueClick()}
          > <SendHorizonal size={15} />
          Issue Book
          </button>          
          
          <input
            type="text"
            placeholder="⌕ Search by book title, author or ISBN..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPageNumber(1);
            }}
          />
        </div>
      </div>

            {error && (
        <div className="catalog-error">
          {error}
        </div>
      )}

      <div className="catalog-table-wrapper">
        {loading ? (
          <div className="catalog-loading">Loading books...</div>
        ) : filteredBooks.length === 0 ? (
          <div className="catalog-empty">No books found.</div>
        ) : (
          <table className="catalog-table">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Name</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Available Copies</th>                
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.isbn}>
                  <td>{book.isbn}</td>

                  <td className="book-name">{book.title}</td>

                  <td>{book.author}</td>

                  <td>{book.genre}</td>

                  <td>{book.availableCopies}</td>

                  <td className="">
                    <button
                      onClick={() => {
                        setSelected(book);
                        setModal("view");
                      }}
                      >
                        <Eye size={15} />
                    </button>
                    <button
                      onClick={() => {
                        setSelected(book);
                        setModal("edit");
                      }}
                    >
                      <Pencil size={15} />
                    </button>
                    <button 
                      onClick={() => setSelected(book)}
                    >
                      <Trash size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="catalog-pagination">
        <div className="pagination-buttons">
          <button
            type="button"
            onClick={handlePreviousPage}
            disabled={pageNumber === 1 || loading}
          >
            Previous
          </button>

          <span>Page {pageNumber}</span>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={loading || books.length < PAGE_SIZE}
          >
            Next
          </button>
        </div>

        <div className="pagination-info">Total Books: {books.length}</div>
      </div>

      {showIssueModal && (
        <IssueBookModal
          book={selectedBook}
          formData={issueForm}
          loading={issuing}
          error={issueError}
          onChange={handleIssueChange}
          onSubmit={handleIssueBook}
          onClose={() => setShowIssueModal(false)}
          onSaved={() => {
            setShowIssueModal(false);
            loadBooks();
          }}
        />
      )}

      {modal === "add" && (
        <Modal title="Add Book" onClose={() => setModal(null)}>
          <Form
            onSubmit={save}
            onClose={() => setModal(null)}
            busy={saving}
            label="ADD"
          />
        </Modal>
      )}
      {modal === "edit" && (
        <Modal title="Update Book" onClose={() => setModal(null)}>
          <Form
            initial={normalize(selected)}
            onSubmit={save}
            onClose={() => setModal(null)}
            busy={saving}
            label="UPDATE"
          />
        </Modal>
      )}
      {modal === "view" && (
        <Modal title="View Book" onClose={() => setModal(null)}>
          <div className="book-view">
            <p>
              <b>Title:</b> {selected?.title ?? selected?.name}
            </p>
            <p>
              <b>Author:</b> {selected?.author ?? "—"}
            </p>
            <p>
              <b>ISBN:</b> {selected?.isbn ?? "—"}
            </p>
            <p>
              <b>Genre:</b> {selected?.genre ?? selected?.type ?? "—"}
            </p>
            <p>
              <b>Available Copies:</b> {selected?.availableCopies ?? "—"}
            </p>
            <button onClick={() => setModal(null)}>CLOSE</button>
          </div>
        </Modal>
      )}
      {selected && !modal && (
        <ConfirmModal
          title="Delete Confirmation"
          message="Are you certain you wish to proceed with the deletion of the selected entry?"
          confirmText="CONFIRM"
          onConfirm={remove}
          onClose={() => setSelected(null)}
        />
      )}

      {activePopup === "borrowed" && (
        <BorrowedBooksPopup onClose={closePopup} />
      )}

      {activePopup === "overdue" && <OverdueBooksPopup onClose={closePopup} />}
    </div>
  );
}

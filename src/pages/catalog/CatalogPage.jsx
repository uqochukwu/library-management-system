import { useEffect, useState } from "react";
import { bookService } from "../../core/services/bookService";
import BorrowedBooksPopup from "../../shared/components/catalog/BorrowedBooksPopup";
import OverdueBooksPopup from "../../shared/components/catalog/OverdueBooksPopup";
import "./catalog.css";

export default function CatalogPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activePopup, setActivePopup] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);

      const response = await bookService.getBooks();

      setBooks(response?.data || response || []);
    } catch (error) {
      console.error("Failed to load books:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter((book) => {
    const searchValue = search.toLowerCase();

    return (
      String(book.id || "")
        .toLowerCase()
        .includes(searchValue) ||
      String(book.title || "")
        .toLowerCase()
        .includes(searchValue) ||
      String(book.author || "")
        .toLowerCase()
        .includes(searchValue) ||
      String(book.isbn || "")
        .toLowerCase()
        .includes(searchValue)
    );
  });

  return (
    <div className="catalog-page">

      <div className="catalog-top">

        <div>
          <h1>Catalog</h1>
          <p>Manage and view library books</p>
        </div>

        <div className="catalog-user">
          <div className="catalog-user-avatar">
            A
          </div>

          <span>Admin</span>

          <span className="catalog-user-arrow">
            ▾
          </span>
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
            onClick={() => setActivePopup("borrowed")}
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
            onClick={() => setActivePopup("overdue")}
          >
            Overdue Borrowers
          </button>

        </div>


        <div className="catalog-search">

          <span className="search-icon">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search by book title, author or ISBN..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

      </div>


      <div className="catalog-table-wrapper">

        {loading ? (
          <div className="catalog-loading">
            Loading books...
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="catalog-empty">
            No books found.
          </div>
        ) : (

          <table className="catalog-table">

            <thead>
              <tr>
                <th>Book ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Language</th>
                <th>Copies</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredBooks.map((book) => (

                <tr key={book.id}>

                  <td>
                    {book.id}
                  </td>

                  <td className="book-name">
                    {book.title}
                  </td>

                  <td>
                    {book.type || book.genre || "-"}
                  </td>

                  <td>
                    {book.language || "-"}
                  </td>

                  <td>
                    {book.totalCopies ??
                      book.copies ??
                      "-"}
                  </td>

                  <td>
                    <button
                      type="button"
                      className="catalog-more-button"
                    >
                      •••
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

          <button className="pagination-button active">
            1
          </button>

          <button className="pagination-button">
            2
          </button>

          <button className="pagination-button">
            3
          </button>

          <button className="pagination-button">
            4
          </button>

          <button className="pagination-button">
            5
          </button>

          <button className="pagination-button next">
            ›
          </button>

        </div>


        <div className="pagination-info">
          Total Books: {books.length}
          <span>Page 1 of 5</span>
        </div>

      </div>


      {activePopup === "borrowed" && (
        <BorrowedBooksPopup
          onClose={() => setActivePopup(null)}
        />
      )}

      {activePopup === "overdue" && (
        <OverdueBooksPopup
          onClose={() => setActivePopup(null)}
        />
      )}

    </div>
  );
}
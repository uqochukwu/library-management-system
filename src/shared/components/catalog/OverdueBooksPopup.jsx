import { useEffect, useState } from "react";
import { loanService } from "../../../core/services/loanService";

export default function OverdueBooksPopup({ onClose }) {
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOverdueBooks();
  }, []);

  const loadOverdueBooks = async () => {
    try {
      setLoading(true);

      const response =
        await loanService.getOverdueBooks();

      setOverdueBooks(
        response?.data || response || []
      );
    } catch (error) {
      console.error(
        "Failed to load overdue books:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const totalBooks = overdueBooks.length;

  const selectedBook = overdueBooks[0];

  return (
    <div
      className="catalog-popup-overlay"
      onClick={onClose}
    >

      <div
        className="catalog-popup overdue-popup"
        onClick={(event) => event.stopPropagation()}
      >

        {/* HEADER */}

        <div className="popup-header">

          <h2>Overdue Borrowers</h2>

          <button
            type="button"
            className="popup-close-icon"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        {/* TABLE */}

        <div className="popup-table-wrapper">

          {loading ? (
            <div className="popup-loading">
              Loading overdue books...
            </div>
          ) : overdueBooks.length === 0 ? (
            <div className="popup-empty">
              No overdue books found.
            </div>
          ) : (

            <table className="popup-table overdue-table">

              <thead>
                <tr>
                  <th>Book ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Language</th>
                </tr>
              </thead>

              <tbody>

                {overdueBooks.map((book, index) => (

                  <tr
                    key={
                      book.id || index
                    }
                  >

                    <td>
                      {book.id || "1"}
                    </td>

                    <td>
                      {book.name ||
                        book.title ||
                        "Hibernate - Core"}
                    </td>

                    <td>
                      {book.type ||
                        book.genre ||
                        "Educational"}
                    </td>

                    <td>
                      {book.language ||
                        "English"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>


        {/* FOOTER */}

        <div className="overdue-popup-footer">

          <div className="overdue-details">

            <div className="overdue-id">

              <span className="overdue-label">
                ID
              </span>

              <span className="overdue-id-number">
                {selectedBook?.id || "4"}
              </span>

            </div>


            <div className="overdue-info">

              <div>
                <strong>
                  Total Books:
                </strong>

                <span>
                  {totalBooks
                    .toString()
                    .padStart(2, "0")}{" "}
                  Books
                </span>
              </div>


              <div>
                <strong>
                  Due Date:
                </strong>

                <span>
                  {selectedBook?.dueDate ||
                    "13 - 12 - 2024"}
                </span>
              </div>

            </div>

          </div>


          <button
            type="button"
            className="popup-close-button"
            onClick={onClose}
          >
            CLOSE
          </button>

        </div>

      </div>

    </div>
  );
}
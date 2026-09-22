import { useEffect, useState } from "react";
import { loanService } from "../../../core/services/loanService";

export default function BorrowedBooksPopup({ onClose }) {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBorrowedBooks();
  }, []);

  const loadBorrowedBooks = async () => {
    try {
      setLoading(true);

      const response =
        await loanService.getBorrowedBooks();

      setBorrowedBooks(
        response?.data || response || []
      );
    } catch (error) {
      console.error(
        "Failed to load borrowed books:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="catalog-popup-overlay"
      onClick={onClose}
    >

      <div
        className="catalog-popup borrowed-popup"
        onClick={(event) => event.stopPropagation()}
      >

        {/* HEADER */}

        <div className="popup-header">

          <h2>Borrowed Books</h2>

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
              Loading borrowed books...
            </div>
          ) : borrowedBooks.length === 0 ? (
            <div className="popup-empty">
              No borrowed books found.
            </div>
          ) : (

            <table className="popup-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Date & Time</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {borrowedBooks.map((item, index) => (

                  <tr
                    key={
                      item.id ||
                      item.loanId ||
                      index
                    }
                  >

                    <td>
                      {item.id || "001"}
                    </td>

                    <td>
                      {item.userId ||
                        item.memberId ||
                        "001"}
                    </td>

                    <td>
                      {item.amount ||
                        "002 Books"}
                    </td>

                    <td>
                      {item.dueDate || "-"}
                    </td>

                    <td>
                      {item.borrowedAt ||
                        item.dateTime ||
                        "-"}
                    </td>

                    <td>

                      <button
                        type="button"
                        className="popup-action-button"
                      >
                        ▣
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>


        {/* FOOTER */}

        <div className="popup-footer">

          <div className="popup-summary">

            <div className="summary-item">

              <span className="summary-label">
                Total Books
              </span>

              <span className="summary-value">
                {borrowedBooks.length
                  .toString()
                  .padStart(2, "0")}{" "}
                Books
              </span>

            </div>


            <div className="summary-divider" />


            <div className="summary-item">

              <span className="summary-label">
                Due Date
              </span>

              <span className="summary-value">
                {borrowedBooks[0]?.dueDate ||
                  "-"}
              </span>

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
import { useEffect, useState } from "react";
import { loanService } from "../../../core/services/loanService";
import {
  listOf,
  loanId,
  loanMemberId,
  loanDueDate,
  loanDate,
} from "../../../utilities/helpers";
import "../../../pages/books/books.css";

const daysLate = (date) =>
  Math.max(
    0,
    Math.ceil((Date.now() - new Date(date).getTime()) / 86400000)
  );

export default function OverduePage() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    loanService
      .list({
        returned: false,
        pageNumber: 1,
        pageSize: 100,
      })
      .then((response) => {
        const overdueLoans = listOf(response)
          .filter(
            (loan) =>
              new Date(loanDueDate(loan)) < new Date()
          )
          .sort(
            (a, b) =>
              daysLate(loanDueDate(b)) -
              daysLate(loanDueDate(a))
          );

        setRows(overdueLoans);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setBusy(false);
      });
  }, []);

  return (
    <main className="bk-page">
      <h1>Overdue Loans</h1>

      <p>Sorted by most overdue first.</p>

      <section className="bk-card">
        {busy ? (
          "Loading..."
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="table-wrap">
            <table className="bk-table">
              <thead>
                <tr>
                  <th>Loan ID</th>
                  <th>Member</th>
                  <th>Book</th>
                  <th>Due Date</th>
                  <th>Days Overdue</th>
                  <th>Issue Date</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((loan, index) => (
                  <tr key={loanId(loan) || index}>
                    <td>{loanId(loan)}</td>

                    <td>{loanMemberId(loan)}</td>

                    <td>
                      {loan.bookTitle ||
                        loan.title ||
                        loan.bookName ||
                        loan.isbn ||
                        "—"}
                    </td>

                    <td>{loanDueDate(loan)}</td>

                    <td>
                      {daysLate(loanDueDate(loan))}
                    </td>

                    <td>{loanDate(loan)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
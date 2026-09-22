import { useEffect, useState } from "react";
import { loanService } from "../../core/services/loanService";
import { listOf, loanId, loanMemberId, loanDueDate, loanDate, } from "../../utilities/helpers";
import Pagination from "../../shared/components/common/Pagination";
import "./reports.css";

export function HistoryPage() {
  const [email, setEmail] = useState(""),
    [rows, setRows] = useState([]),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const size = 12;
  async function load() {
    setBusy(true);
    setError("");
    try {
      const r = await loanService.list({
        returned: true,
        memberEmail: email,
        pageNumber: page,
        pageSize: size,
      });
      const l = listOf(r);
      setRows(l);
      setTotal(r?.totalCount ?? r?.totalItems ?? r?.count ?? l.length);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    load();
  }, [page]);
  return (
    <main className="report-page">
      <div className="report-head">
        <div>
          <h1>Member Borrowing History</h1>
          <p>
            Borrowed books, issue date, due date, return date and fine amount.
          </p>
        </div>
        <div>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setPage(1);
            }}
            placeholder="Member email"
          />
          <button onClick={load}>SEARCH</button>
        </div>
      </div>
      <section className="report-card">
        {busy ? (
          <div className="state">Loading...</div>
        ) : error ? (
          <div className="state">{error}</div>
        ) : !rows.length ? (
          <div className="state">No borrowing history found.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Loan ID</th>
                  <th>Member</th>
                  <th>Book</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Return Date</th>
                  <th>Fine</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={loanId(r) || i}>
                    <td>{loanId(r) || "—"}</td>
                    <td>{loanMemberId(r)}</td>
                    <td>
                      {r.bookTitle ?? r.title ?? r.bookName ?? r.isbn ?? "—"}
                    </td>
                    <td>{r.issueDate ?? r.createdAt ?? loanDate(r)}</td>
                    <td>{loanDueDate(r)}</td>
                    <td>{r.returnDate ?? r.returnedAt ?? "—"}</td>
                    <td>{r.fineAmount ?? r.fine ?? 0}</td>
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
    </main>
  );
}
export function OverduePage() {
  return null;
}

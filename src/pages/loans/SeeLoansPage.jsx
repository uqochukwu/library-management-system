import { useCallback, useEffect, useState } from "react";
import { loanService } from "../../core/services/loanService";
import {
  listOf,
  totalOf,
  loanId,
  loanMemberId,
  loanAmount,
  loanDueDate,
  loanDate,
} from "../../utilities/helpers";
import ConfirmModal from "../../shared/components/common/ConfirmModal";
import Pagination from "../../shared/components/common/Pagination";
import IssueBookModal from "../../shared/components/common/IssueBookModal";
import "./loans.css";

export default function SeeLoansPage() {
  const [returned, setReturned] = useState(false),
    [search, setSearch] = useState(""),
    [page, setPage] = useState(1),
    [rows, setRows] = useState([]),
    [total, setTotal] = useState(0),
    [busy, setBusy] = useState(true),
    [error, setError] = useState(""),
    [selected, setSelected] = useState(null),
    [issue, setIssue] = useState(false);
  const size = 12;
  const load = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const r = await loanService.list({
        returned,
        memberId: search,
        pageNumber: page,
        pageSize: size,
      });
      const l = listOf(r);
      setRows(l);
      setTotal(totalOf(r, l));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }, [returned, search, page]);
  useEffect(() => {
  load();
}, [load]);
  async function doReturn() {
    try {
      await loanService.returnBook({
        isbn: selected?.isbn ?? selected?.bookIsbn,
        loanId: loanId(selected),
      });
      setSelected(null);
      load();
    } catch (e) {
      setError(e.message);
    }
  }
  return (
    <section className="ln-page">
      <div className="ln-head">
        <h1>{returned ? "Returned Books" : "Borrowed Books"}</h1>
        {!returned && (
          <button className="black" onClick={() => setIssue(true)}>
            ＋ Issue Book
          </button>
        )}
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="⌕ Search by ID"
        />
      </div>
      <div className="ln-card">
        <div className="tabs">
          <button
            className={!returned ? "on" : ""}
            onClick={() => {
              setReturned(false);
              setPage(1);
            }}
          >
            Borrowed Books
          </button>
          <button
            className={returned ? "on" : ""}
            onClick={() => {
              setReturned(true);
              setPage(1);
            }}
          >
            Returned Books
          </button>
        </div>
        {busy ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="scroll">
            <table>
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
                {rows.map((l, i) => (
                  <tr key={loanId(l) || i}>
                    <td>{loanId(l)}</td>
                    <td>{loanMemberId(l)}</td>
                    <td>{loanAmount(l)} Books</td>
                    <td>{loanDueDate(l)}</td>
                    <td>{loanDate(l)}</td>
                    <td>
                      {!returned && (
                        <button
                          className="black small"
                          onClick={() => setSelected(l)}
                        >
                          RETURN
                        </button>
                      )}
                    </td>
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
      </div>
      {issue && (
        <IssueBookModal
          onClose={() => setIssue(false)}
          onSaved={() => {
            setIssue(false);
            load();
          }}
        />
      )}
      {selected && (
        <ConfirmModal
          title="Return Confirmation"
          message={`Confirm return. The backend calculates any applicable late fee. ${selected?.dueDate && new Date(selected.dueDate) < new Date() ? `This loan is overdue; the configured fine rate will be applied.` : ""}`}
          confirmText="RETURN"
          onConfirm={doReturn}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}

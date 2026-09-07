import { useCallback, useEffect, useState } from "react";
import { loanService } from "../../core/services/loanService";
import { listOf, totalOf, loanId, loanMemberId, loanAmount, loanDueDate, loanDate } from "../../utilities/helpers";
import ConfirmModal from "../../shared/components/common/ConfirmModal";
import Pagination from "../../shared/components/common/Pagination";
import "../members/mb.css";

export default function LoansPage() {
  const [returned, setReturned] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loans, setLoans] = useState([]);
  const [total, setTotal] = useState(0);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const size = 12;

  const load = useCallback(async () => {
    try {
      setBusy(true); setError("");
      const r = await loanService.list({ returned, memberId: search, pageNumber: page, pageSize: size });
      const list = listOf(r); setLoans(list); setTotal(totalOf(r, list));
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }, [returned, search, page]);

  useEffect(() => { load(); }, [load]);

  async function doReturn() {
    await loanService.returnBook({isbn:selected?.isbn ?? selected?.bookIsbn ?? selected?.ISBN, loanId:loanId(selected)});
    setSelected(null); load();
  }

  return (
    <main className="mb-page">
      <div className="mb-page-head">
        <h1>{returned ? "Returned Books" : "Borrowed Books"}</h1>
        <input className="mb-search" value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}} placeholder="⌕  Search by ID" />
      </div>
      <section className="mb-card">
        <div className="mb-tabs">
          <button className={!returned ? "selected":""} onClick={()=>{setReturned(false);setPage(1)}}>Borrowed Books</button>
          <button className={returned ? "selected":""} onClick={()=>{setReturned(true);setPage(1)}}>Returned Books</button>
        </div>
        {busy ? <div className="mb-state">Loading loans...</div> :
         error ? <div className="mb-state"><p>{error}</p><button onClick={load}>RETRY</button></div> :
         <div className="mb-table-wrap"><table className="mb-table">
          <thead><tr><th>ID</th><th>User ID</th><th>Amount</th><th>Due Date</th><th>Date & Time</th><th>Action</th></tr></thead>
          <tbody>{loans.map((l,i)=><tr key={`${loanId(l)}-${i}`}>
            <td>{loanId(l)}</td><td>{loanMemberId(l)}</td><td>{loanAmount(l)} Books</td><td>{loanDueDate(l)}</td><td>{loanDate(l)}</td>
            <td>{!returned && <button className="mb-return" onClick={()=>setSelected(l)}>↩ Return</button>}</td>
          </tr>)}</tbody>
         </table></div>}
        <Pagination page={page} pageSize={size} total={total} onChange={setPage}/>
      </section>
      {selected && <ConfirmModal title="Return Confirmation" message="Are you sure you want to return the selected books?" confirmText="RETURN" onConfirm={doReturn} onClose={()=>setSelected(null)}/>}
    </main>
  );
}

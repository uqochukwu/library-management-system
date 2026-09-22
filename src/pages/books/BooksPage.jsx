// import { useCallback, useEffect, useState } from "react";
// import { bookService } from "../../core/services/bookService";
// import { listOf, bookId, bookName, bookType, bookLanguage, } from "../../utilities/helpers";
// import ConfirmModal from "../../shared/components/common/ConfirmModal";
// import Modal from "../../shared/components/common/Modal";
// import Pagination from "../../shared/components/common/Pagination";
// import "./books.css";

// const empty = { title: "", author: "", isbn: "", genre: "", totalCopies: 1 };

// function Form({ initial = empty, onSubmit, onClose, busy, label }) {
//   const [f, setF] = useState({ ...empty, ...initial });
//   const [e, setE] = useState("");
//   const change = (k, v) => setF((x) => ({ ...x, [k]: v }));
//   function submit(ev) {
//     ev.preventDefault();
//     if (
//       !f.title ||
//       !f.author ||
//       !f.isbn ||
//       !f.genre ||
//       Number(f.totalCopies) < 0
//     ) {
//       setE("Title, author, ISBN, genre and copies are required.");
//       return;
//     }
//     onSubmit({
//       ...f,
//       totalCopies: Number(f.totalCopies),
//       name: f.title,
//       quantity: Number(f.totalCopies),
//     });
//   }
//   return (
//     <form className="book-form" onSubmit={submit}>
//       <label>
//         Title
//         <input
//           value={f.title}
//           onChange={(e) => change("title", e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Author
//         <input
//           value={f.author}
//           onChange={(e) => change("author", e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         ISBN
//         <input
//           value={f.isbn}
//           onChange={(e) => change("isbn", e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Genre
//         <input
//           value={f.genre}
//           onChange={(e) => change("genre", e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Number of Copies
//         <input
//           type="number"
//           min="0"
//           value={f.totalCopies}
//           onChange={(e) => change("totalCopies", e.target.value)}
//           required
//         />
//       </label>
//       {e && <p className="field-error">{e}</p>}
//       <div className="modal-actions">
//         <button type="button" className="light" onClick={onClose}>
//           CANCEL
//         </button>
//         <button disabled={busy}>{busy ? "SAVING..." : label}</button>
//       </div>
//     </form>
//   );
// }
// export default function BooksPage() {
//   const [rows, setRows] = useState([]),
//     [search, setSearch] = useState(""),
//     [page, setPage] = useState(1),
//     [total, setTotal] = useState(0),
//     [busy, setBusy] = useState(true),
//     [error, setError] = useState(""),
//     [modal, setModal] = useState(null),
//     [selected, setSelected] = useState(null),
//     [saving, setSaving] = useState(false);
//   const size = 12;

//   const load = useCallback(async () => {
//     setBusy(true);
//     setError("");
//     try {
//       const r = await bookService.list({
//         search,
//         pageNumber: page,
//         pageSize: size,
//       });
//       const l = listOf(r);
//       setRows(l);
//       setTotal(r?.totalCount ?? r?.totalItems ?? r?.count ?? l.length);
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setBusy(false);
//     }
//   }, [search, page]);

// //   useEffect(() => load(), [load]);
//   useEffect(() => {
//   async function fetchBooks() {
//     setBusy(true);
//     setError("");

//     try {
//       const r = await bookService.list({
//         search,
//         pageNumber: page,
//         pageSize: size,
//       });

//       const l = listOf(r);

//       setRows(l);
//       setTotal(r?.totalCount ?? r?.totalItems ?? r?.count ?? l.length);
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setBusy(false);
//     }
//   }

//   fetchBooks();
// }, [search, page]);


//   const normalize = (b) => ({
//     title: b?.title ?? "",
//     author: b?.author ?? "",
//     isbn: b?.isbn ?? "",
//     genre: b?.genre ?? b?.type ?? "",
//     totalCopies: b?.totalCopies ?? b?.quantity ?? 0,
//   });

//   async function save(payload) {
//     setSaving(true);
//     setError("");
//     try {
//       if (modal === "add") await bookService.create(payload);
//       else
//         await bookService.update({
//           ...payload,
//           id: bookId(selected),
//           bookId: bookId(selected),
//         });
//       setModal(null);
//       setSelected(null);
//       load();
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setSaving(false);
//     }
//   }
//   async function remove() {
//     setError("");
//     try {
//       await bookService.remove({
//         id: bookId(selected),
//         bookId: bookId(selected),
//         isbn: selected?.isbn,
//       });
//       setSelected(null);
//       load();
//     } catch (e) {
//       setError(e.message);
//     }
//   }
//   return (
//     <main className="bk-page">
//       <div className="bk-head">
//         <div>
//           <h1>Book Management</h1>
//           <p>Manage the library catalogue.</p>
//         </div>
//         <div className="bk-tools">
//           <button onClick={() => setModal("add")}>＋ Add Book</button>
//           <input
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//             placeholder="⌕ Search title, author, ISBN or genre"
//           />
//         </div>
//       </div>
//       <section className="bk-card">
//         {busy ? (
//           <div className="state">Loading books...</div>
//         ) : error ? (
//           <div className="state">
//             <p>{error}</p>
//             <button onClick={load}>RETRY</button>
//           </div>
//         ) : !rows.length ? (
//           <div className="state">No books found.</div>
//         ) : (
//           <>
//             <div className="table-wrap">
//               <table className="bk-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Title</th>
//                     <th>Author</th>
//                     <th>ISBN</th>
//                     <th>Genre</th>
//                     <th>Available / Total</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {rows.map((b, i) => (
//                     <tr key={bookId(b) || i}>
//                       <td>{bookId(b) || i + 1}</td>
//                       <td>{b?.title ?? bookName(b)}</td>
//                       <td>{b?.author ?? "—"}</td>
//                       <td>{b?.isbn ?? "—"}</td>
//                       <td>{b?.genre ?? bookType(b)}</td>
//                       <td>
//                         {b?.availableCopies ?? "—"} /{" "}
//                         {b?.totalCopies ?? b?.quantity ?? "—"}
//                       </td>
//                       <td className="actions">
//                         <button
//                           onClick={() => {
//                             setSelected(b);
//                             setModal("view");
//                           }}
//                         >
//                           ◉
//                         </button>
//                         <button
//                           onClick={() => {
//                             setSelected(b);
//                             setModal("edit");
//                           }}
//                         >
//                           ✎
//                         </button>
//                         <button onClick={() => setSelected(b)}>♜</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <Pagination
//               page={page}
//               pageSize={size}
//               total={total}
//               onChange={setPage}
//             />
//           </>
//         )}
//       </section>
//       {modal === "add" && (
//         <Modal title="Add Book" onClose={() => setModal(null)}>
//           <Form
//             onSubmit={save}
//             onClose={() => setModal(null)}
//             busy={saving}
//             label="ADD"
//           />
//         </Modal>
//       )}
//       {modal === "edit" && (
//         <Modal title="Update Book" onClose={() => setModal(null)}>
//           <Form
//             initial={normalize(selected)}
//             onSubmit={save}
//             onClose={() => setModal(null)}
//             busy={saving}
//             label="UPDATE"
//           />
//         </Modal>
//       )}
//       {modal === "view" && (
//         <Modal title="View Book" onClose={() => setModal(null)}>
//           <div className="book-view">
//             <p>
//               <b>Title:</b> {selected?.title ?? selected?.name}
//             </p>
//             <p>
//               <b>Author:</b> {selected?.author ?? "—"}
//             </p>
//             <p>
//               <b>ISBN:</b> {selected?.isbn ?? "—"}
//             </p>
//             <p>
//               <b>Genre:</b> {selected?.genre ?? selected?.type ?? "—"}
//             </p>
//             <p>
//               <b>Available Copies:</b> {selected?.availableCopies ?? "—"}
//             </p>
//             <button onClick={() => setModal(null)}>CLOSE</button>
//           </div>
//         </Modal>
//       )}
//       {selected && !modal && (
//         <ConfirmModal
//           title="Delete Confirmation"
//           message="Are you certain you wish to proceed with the deletion of the selected entry?"
//           confirmText="CONFIRM"
//           onConfirm={remove}
//           onClose={() => setSelected(null)}
//         />
//       )}
//     </main>
//   );
// }


import React, { useState } from 'react';
import SearchBar from './SearchBar';
import BookTable from './Booktable';
import Pagination from './Pagination';

// Sample book data
const initialBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', status: 'Available' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', status: 'Borrowed' },
  { id: 3, title: '1984', author: 'George Orwell', category: 'Dystopian', status: 'Available' },
  { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', status: 'Available' },
  { id: 5, title: 'React Guide', author: 'Dev Community', category: 'Technology', status: 'Available' },
];

function BooksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 3;

  // Filter books based on search input
  const filteredBooks = initialBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Library Management System</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BookTable books={currentBooks} />
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}

export default BooksPage;
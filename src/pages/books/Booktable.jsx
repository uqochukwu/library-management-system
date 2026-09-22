import React from 'react';

function BookTable({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p style={{ color: '#666', fontStyle: 'italic' }}>No books found in catalog.</p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Title</th>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Author</th>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Category</th>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Status</th>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '10px' }}>{book.title}</td>
            <td style={{ padding: '10px' }}>{book.author}</td>
            <td style={{ padding: '10px' }}>{book.category}</td>
            <td style={{ padding: '10px' }}>{book.status}</td>
            <td style={{ padding: '10px' }}>
              <button 
                onClick={() => onEdit(book)} 
                style={{ marginRight: '8px', padding: '5px 10px', cursor: 'pointer' }}
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(book.id)} 
                style={{ padding: '5px 10px', color: 'white', backgroundColor: '#d9534f', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookTable;
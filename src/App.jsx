import React, { useState } from 'react';
import SearchBar from './SearchBar';
import BookTable from './BookTable';
import Pagination from './Pagination';

// Sample book data
const initialBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', status: 'Available' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', status: 'Borrowed' },
  { id: 3, title: '1984', author: 'George Orwell', category: 'Dystopian', status: 'Available' },
  { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', status: 'Available' },
  { id: 5, title: 'React Guide', author: 'Dev Community', category: 'Technology', status: 'Available' },
];

function App() {
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

export default App;
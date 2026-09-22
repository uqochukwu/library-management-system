import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search catalog by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '14px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          boxSizing: 'border-box'
        }}
      />
    </div>
  );
}

export default SearchBar;
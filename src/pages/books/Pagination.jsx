import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', marginTop: '15px' }}>
      <button 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
        style={{ padding: '6px 12px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
      >
        Previous
      </button>
      
      <span>Page {currentPage} of {totalPages || 1}</span>

      <button 
        disabled={currentPage === totalPages || totalPages === 0} 
        onClick={() => onPageChange(currentPage + 1)}
        style={{ padding: '6px 12px', cursor: (currentPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer' }}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
import React, { useState, useEffect } from 'react';

function BookForm({ onSubmit, editingBook, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Fiction',
    status: 'Available',
  });

  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook);
    } else {
      setFormData({ title: '', author: '', category: 'Fiction', status: 'Available' });
    }
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      alert('Please fill in both title and author.');
      return;
    }
    onSubmit(formData);
    setFormData({ title: '', author: '', category: 'Fiction', status: 'Available' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '25px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#fafafa' }}>
      <h3 style={{ marginTop: 0 }}>{editingBook ? 'Edit Book' : 'Add New Book'}</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Book Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={{ padding: '8px', flex: '1', minWidth: '180px' }}
        />
        <input
          type="text"
          placeholder="Author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          style={{ padding: '8px', flex: '1', minWidth: '180px' }}
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          style={{ padding: '8px' }}
        >
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Dystopian">Dystopian</option>
          <option value="History">History</option>
          <option value="Technology">Technology</option>
        </select>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          style={{ padding: '8px' }}
        >
          <option value="Available">Available</option>
          <option value="Borrowed">Borrowed</option>
        </select>
      </div>
      <div>
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' }}>
          {editingBook ? 'Update Book' : 'Add Book'}
        </button>
        {editingBook && (
          <button type="button" onClick={onCancel} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default BookForm;
import React from 'react';
import './SortModal.css';

const SortModal = ({ isOpen, onClose, currentSort, onSortChange }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSortChange = (sortType) => {
    onSortChange(sortType);
    onClose();
  };

  return (
    <div className="sort-modal-overlay" onClick={handleOverlayClick}>
      <div className="sort-modal">
        <div className="sort-modal-header">
          <h3>Sort by:</h3>
        </div>
        <div className="sort-modal-body">
          <label className="sort-option">
            <input
              type="radio"
              name="sort"
              value="number"
              checked={currentSort === 'number'}
              onChange={() => handleSortChange('number')}
            />
            <span className="radio-custom"></span>
            <span className="option-text">Number</span>
          </label>
          
          <label className="sort-option">
            <input
              type="radio"
              name="sort"
              value="name"
              checked={currentSort === 'name'}
              onChange={() => handleSortChange('name')}
            />
            <span className="radio-custom"></span>
            <span className="option-text">Name</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SortModal;

import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';

/**
 * ExamCard Component
 * @param {string} code - The exam code
 * @param {string} title - The exam title
 * @param {string|number} year - The exam year
 * @param {string} imageUrl - URL of the exam image (optional)
 * @param {function} onEdit - Callback for edit action
 * @param {function} onDelete - Callback for delete action
 * @param {function} onClick - Callback for card click
 */
export default function ExamCard({ code, title, year, imageUrl, onEdit, onDelete, onClick }) {
  // State for dropdown menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Closes menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Handles image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/220x140?text=No+Image';
  };

  // Toggles dropdown menu
  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen((open) => !open);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition cursor-pointer min-w-[220px] max-w-[260px] relative" onClick={onClick}>
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={title} 
          className="h-40 w-56 object-cover rounded-lg mb-3 border"
          onError={handleImageError}
        />
      ) : (
        <div className="h-40 w-56 bg-gray-100 rounded-lg mb-3 flex items-center justify-center border">
          <span className="text-gray-400 text-sm">No Image</span>
        </div>
      )}
      <div className="text-base font-bold text-gray-700 mb-1">{code}</div>
      <div className="text-xl text-center text-gray-800 mb-2">{title}</div>
      <div className="text-lg font-bold text-blue-600 mb-2">Year: {year}</div>
      <button
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100"
        onClick={toggleMenu}
        aria-label="More actions"
        type="button"
      >
        <MoreVertical className="h-6 w-6 text-gray-500" />
      </button>
      {menuOpen && (
        <div ref={menuRef} className="absolute top-10 right-3 bg-white border rounded shadow-lg z-10 w-32 py-1">
          <button
            className="block w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
            onClick={e => { e.stopPropagation(); setMenuOpen(false); onEdit(); }}
          >
            Edit
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            onClick={e => { e.stopPropagation(); setMenuOpen(false); onDelete(); }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

ExamCard.propTypes = {
  code: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  imageUrl: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
};

// src/pages/DeleteCourse.jsx
import PropTypes from "prop-types";

const DeleteCourse = ({ isOpen, onClose, onDelete, course }) => {
  console.log("DeleteCourse rendered", isOpen, course);

  if (!isOpen || !course) return null;

  const handleDelete = () => {
    onDelete(course.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[960px] max-h-[90vh] overflow-auto shadow-lg">
        {/* Title Bar */}
        <div className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-semibold">Deleting Course</h2>
          <button onClick={onClose} className="text-white text-xl font-bold">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* S. No */}
          <div>
            <label className="block mb-1 text-sm font-medium">S. No:</label>
            <input
              type="text"
              value={course.sNo ?? ""}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Course Code */}
          <div>
            <label className="block mb-1 text-sm font-medium">Course Code:</label>
            <input
              type="text"
              value={course.code ?? ""}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Course Level */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Level of the Course:
            </label>
            <input
              type="text"
              value={course.level ?? ""}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Course Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">Course Name:</label>
            <input
              type="text"
              value={course.title ?? ""}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Confirmation Box */}
          <div className="mt-12 border border-gray-200 rounded-lg p-6">
            <h3 className="text-center font-medium text-lg mb-2">
              Delete this course?
            </h3>
            <p className="text-center text-gray-600 mb-6">
              Are you sure you want to delete this course?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DeleteCourse.propTypes = {
  isOpen:   PropTypes.bool.isRequired,
  onClose:  PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  course:   PropTypes.shape({
    id:    PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    sNo:   PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    code:  PropTypes.string,
    level: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default DeleteCourse;

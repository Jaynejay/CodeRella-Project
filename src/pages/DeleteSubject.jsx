import PropTypes from 'prop-types';

const DeleteSubject = ({ onClose, onDelete, courseDetails }) => {

  // Default course details if not provided
  const defaultCourseDetails = {
    level: 'NVQ 4',
    courseCode: 'A01S003F4.3',
    courseName: 'Field Assistant (Agriculture)',
    subjectCode: 'SUB-55',
    subjectName: 'Establishment And Maintenance Of Other Field Crops (OFC)'
  };

  const course = courseDetails || defaultCourseDetails;

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-800 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-medium">Deleting Subject</h2>
          <button 
            onClick={onClose} 
            className="text-white text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="space-y-4 mb-8">
            <div>
              <label className="block mb-1 text-sm font-medium">Level of the course:</label>
              <input 
                type="text" 
                value={course.level} 
                readOnly 
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Course code:</label>
              <input 
                type="text" 
                value={course.courseCode} 
                readOnly 
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Course Name:</label>
              <input 
                type="text" 
                value={course.courseName} 
                readOnly 
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Subject Code:</label>
              <input 
                type="text" 
                value={course.subjectCode} 
                readOnly 
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Subject Name:</label>
              <input 
                type="text" 
                value={course.subjectName} 
                readOnly 
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Confirmation Box */}
          <div className="border border-gray-200 rounded-md p-4 mb-4 text-center">
            <p className="font-medium mb-2">Delete this course?</p>
            <p className="text-gray-600">Are you sure you want to delete this course?</p>

            <div className="flex justify-center space-x-4 mt-4">
              <button 
                onClick={handleDelete} 
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
              >
                Delete
              </button>
              <button 
                onClick={onClose} 
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium"
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

DeleteSubject.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  courseDetails: PropTypes.object,
};

export default DeleteSubject;

import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const AddingCourse = ({ isOpen, onClose, onSubmit }) => {
  const [courseLevel, setCourseLevel] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseImage, setCourseImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCourseImage(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCourseImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      courseLevel,
      courseName,
      courseCode,
      courseImage
    });
    resetForm();
  };

  const resetForm = () => {
    setCourseLevel('');
    setCourseName('');
    setCourseCode('');
    setCourseImage(null);
  };

  const handleSaveChanges = () => {
    console.log("Changes saved");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg overflow-hidden shadow-xl">
        {/* Header with darker blue */}
        <div className="bg-indigo-900 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-medium">Adding Course</h2>
          <button onClick={onClose} className="text-white text-xl">
            ✕
          </button>
        </div>

        {/* Form content with more spacing */}
        <div className="p-8">
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Level of the course:</label>
              <input
                type="text"
                value={courseLevel}
                onChange={(e) => setCourseLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Course Name:</label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Course code:</label>
              <input
                type="text"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Upload the image of the relevant course:</label>
              <div className="flex gap-3 mb-3">
                <button 
                  className="p-2 border border-gray-300 rounded-md"
                  onClick={() => fileInputRef.current.click()}
                >
                  <div className="flex items-center justify-center text-blue-600">
                    {/* Folder icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                      <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <button 
                  className="p-2 border border-gray-300 rounded-md"
                  onClick={() => fileInputRef.current.click()}
                >
                  <div className="flex items-center justify-center text-blue-600">
                    {/* Square icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                </button>
                <span className="text-xs text-gray-500 self-center">
                  Maximum file size: 2 MB, Maximum number of files 1
                </span>
              </div>

              <div 
                className="border-2 border-gray-200 border-dashed rounded-md p-10 flex items-center justify-center flex-col cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                {courseImage ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Selected file: {courseImage.name}</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="mb-6">
                      {/* Down arrow icon */}
                      <svg className="mx-auto h-12 w-12 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">You can drag and drop files here to add them.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Button section with updated styling */}
        <div className="px-8 py-6 flex justify-between">
          <div className="flex gap-3">
            <button 
              onClick={handleSaveChanges}
              className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium"
            >
              Save changes
            </button>
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
          </div>
          <div>
            <button 
              onClick={handleSubmit}
              className="px-8 py-2 bg-blue-600 text-white rounded-full font-medium"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

AddingCourse.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default AddingCourse;
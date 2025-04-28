import { useState } from 'react';
import PropTypes from 'prop-types';

const AddSubject = ({ onClose, onSubmit }) => {
  const [courseLevel, setCourseLevel] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      const validFiles = droppedFiles.filter(file => file.size <= 2 * 1024 * 1024);
      const newFiles = [...files, ...validFiles].slice(0, 1);
      setFiles(newFiles);
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      const validFiles = selectedFiles.filter(file => file.size <= 2 * 1024 * 1024);
      const newFiles = [...files, ...validFiles].slice(0, 1);
      setFiles(newFiles);
    }
  };

  const handleSave = () => {
    const subjectData = {
      courseLevel,
      courseName,
      courseCode,
      subjectCode,
      subjectName,
      files
    };
    onSubmit(subjectData);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md w-full max-w-md h-auto p-4">
        <div className="bg-blue-800 text-white py-2 px-4 flex justify-between items-center rounded-t-md">
          <h2 className="text-lg font-medium">Add Subject</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 text-xl focus:outline-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3">
          {/* Course Details */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Level of the Course</label>
            <input
              type="text"
              value={courseLevel}
              onChange={(e) => setCourseLevel(e.target.value)}
              className="w-full px-2 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full px-2 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Course Code</label>
            <input
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full px-2 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Subject Details */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Subject Code</label>
            <input
              type="text"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              className="w-full px-2 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Subject Name</label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full px-2 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Upload Subject Image</label>
            <div className="flex space-x-2 mb-2">
              {/* Upload Buttons */}
              <label className="cursor-pointer w-12 h-12 border flex items-center justify-center rounded-md hover:bg-gray-50">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileInputChange}
                  accept="image/*"
                />
                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7H13L11 5H5C3.89543 5 3 5.89543 3 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </label>

              <label className="cursor-pointer w-12 h-12 border flex items-center justify-center rounded-md hover:bg-gray-50">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileInputChange}
                  accept="image/*"
                />
                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V9L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 2V9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </label>
            </div>

            {/* Drag-and-Drop Area */}
            <div
              className={`border-2 border-dashed rounded-md p-4 text-center ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {files.length > 0 ? (
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-between w-full p-2 bg-gray-100 rounded mb-2">
                    <span className="text-sm truncate max-w-xs">{files[0].name}</span>
                    <button 
                      onClick={() => handleRemoveFile(0)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8 text-gray-400 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20M12 4L8 8M12 4L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-gray-500">Drag and drop the file here.</p>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

AddSubject.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddSubject;

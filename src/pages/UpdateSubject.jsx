import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const UpdateSubject = ({ onClose, onSubmit, initialData = {} }) => {
  // Using initialData if provided, otherwise empty strings
  const [formData, setFormData] = useState({
    courseCode: initialData.courseCode || '',
    subjectCode: initialData.subjectCode || '',
    newLevel: initialData.newLevel || '',
    newCourseName: initialData.newCourseName || '',
    subjectName: initialData.subjectName || '',
    files: initialData.files || []
  });
  
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);
  
  // Effect to position the modal properly when it renders
  useEffect(() => {
    if (modalRef.current) {
      // Set initial position to be lower on the page
      window.scrollTo(0, 0);
      modalRef.current.style.paddingTop = '80px';
    }
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) {
      // Limit to one file as per the UI requirement
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert("File size exceeds 2MB limit");
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        files: [file]
      }));
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropAreaRef.current.classList.add('border-blue-500');
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropAreaRef.current.classList.remove('border-blue-500');
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropAreaRef.current.classList.remove('border-blue-500');
    
    if (e.dataTransfer.files.length > 0) {
      // Limit to one file as per the UI requirement
      const file = e.dataTransfer.files[0];
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert("File size exceeds 2MB limit");
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        files: [file]
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const handleSaveChanges = () => {
    onSubmit(formData);
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-auto pt-20"
    >
      <div className="bg-white rounded-lg w-full max-w-2xl mb-10">
        {/* Header */}
        <div className="bg-indigo-800 text-white p-3 flex justify-between items-center">
          <h2 className="text-xl font-medium">Updating Subjects</h2>
          <button 
            onClick={onClose} 
            className="text-white text-xl font-bold"
          >
            ×
          </button>
        </div>
        
        {/* Form */}
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Course code */}
            <div>
              <label className="block mb-1 text-sm font-medium">Course code:</label>
              <input 
                type="text" 
                name="courseCode"
                value={formData.courseCode} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-full"
              />
            </div>
            
            {/* Subject Code */}
            <div>
              <label className="block mb-1 text-sm font-medium">Subject Code:</label>
              <input 
                type="text" 
                name="subjectCode"
                value={formData.subjectCode} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-full"
              />
            </div>
            
            {/* New level of the course */}
            <div>
              <label className="block mb-1 text-sm font-medium">New level of the course:</label>
              <input 
                type="text" 
                name="newLevel"
                value={formData.newLevel} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-full"
              />
            </div>
            
            {/* New Course Name */}
            <div>
              <label className="block mb-1 text-sm font-medium">New Course Name:</label>
              <input 
                type="text" 
                name="newCourseName"
                value={formData.newCourseName} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-full"
              />
            </div>
            
            {/* Subject Name */}
            <div>
              <label className="block mb-1 text-sm font-medium">Subject Name:</label>
              <input 
                type="text" 
                name="subjectName"
                value={formData.subjectName} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-full"
              />
            </div>
            
            {/* File Upload */}
            <div>
              <label className="block mb-1 text-sm font-medium">Upload the image of the relevant subject:</label>
              
              <div className="flex items-center space-x-2 mb-2">
                <button 
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="border border-gray-300 p-2 rounded-lg bg-white hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
                
                <button 
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="border border-gray-300 p-2 rounded-lg bg-white hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                
                <span className="text-xs text-gray-500">
                  Maximum file size: 2 MB, Maximum number of files: 1
                </span>
                
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileSelect}
                  accept="image/*"
                />
              </div>
              
              <div 
                ref={dropAreaRef}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <div className="flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <p className="text-sm text-gray-500">You can drag and drop files here to add them.</p>
                </div>
              </div>
              
              {formData.files.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-green-600">
                    {formData.files[0].name} uploaded successfully
                  </p>
                </div>
              )}
            </div>
            
            {/* Buttons */}
            <div className="flex justify-center space-x-2 pt-3">
              <button 
                type="button"
                onClick={handleSaveChanges}
                className="bg-blue-600 text-white px-4 py-1 rounded-md"
              >
                Save changes
              </button>
              
              <button 
                type="button"
                onClick={onClose}
                className="border border-gray-300 px-4 py-1 rounded-md"
              >
                Cancel
              </button>
            </div>
            
            <div className="flex justify-center pt-2">
              <button 
                type="submit"
                className="bg-blue-600 text-white px-8 py-2 rounded-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation to fix ESLint errors
UpdateSubject.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    courseCode: PropTypes.string,
    subjectCode: PropTypes.string,
    newLevel: PropTypes.string,
    newCourseName: PropTypes.string,
    subjectName: PropTypes.string,
    files: PropTypes.array
  })
};

export default UpdateSubject;
import { useState, useRef } from "react";
import axios from "axios";
import { UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function FileUploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const allowedFileTypes = ['.pdf', '.docx'];
  const maxFileSize = 50 * 1024 * 1024; // 50MB in bytes

  const validateFile = (file) => {
    if (!file) return false;
    
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedFileTypes.includes(fileExtension)) {
      setError('Only PDF and DOCX files are allowed');
      return false;
    }

    if (file.size > maxFileSize) {
      setError('File size must be less than 50MB');
      return false;
    }

    setError('');
    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
    } else {
      setFile(null);
    }
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      } else {
        setFile(null);
      }
    }
    setDragActive(false);
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    if (!validateFile(file)) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("comment", comment);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post("http://localhost:8080/api/submissions/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      // Create submission details object
      const submissionDetails = {
        status: "Submitted",
        lastModified: new Date().toISOString(),
        fileName: file.name,
        fileSize: file.size,
        comment: comment
      };

      // Store submission details in localStorage
      localStorage.setItem('submissionDetails', JSON.stringify(submissionDetails));
      
      setMessage("Upload successful!");
      setFile(null);
      setComment("");
      navigate("/addsubmission");
    } catch (err) {
      setMessage("Upload failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Submission</h1>
        <div className="mb-6 text-base text-gray-700 text-left">
          <div>
            <span className="font-semibold">Open Date</span> : Saturday, 21 December 2024, 12:00 AM
          </div>
          <div>
            <span className="font-semibold">Due Date</span> : Tuesday, 21 January 2024, 11:59 PM
          </div>
        </div>
        <div className="bg-white rounded-md shadow border p-4 sm:p-8 mt-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-full max-w-xl mx-auto mb-4">
              <div className="flex items-center justify-between mb-2 w-full">
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow text-base transition-colors duration-200"
                >
                  Choose File
                </button>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                  Maximum File size: 50 MB, Maximum number of file: 1
                </span>
              </div>
              <div
                className={`flex flex-col items-center w-full p-6 sm:p-8 bg-gray-50 border-2 border-dashed rounded-lg transition-colors duration-200 ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                } ${error ? 'border-red-500 bg-red-50' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <UploadCloud className={`w-14 h-14 mb-2 ${error ? 'text-red-500' : 'text-blue-500'}`} />
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.docx"
                  ref={inputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <span className="font-medium text-gray-700 mt-2 mb-1">
                  {file ? file.name : "No file chosen"}
                </span>
                <span className="text-gray-500 text-sm text-center mb-2">
                  You can drag & drop file here to add them
                </span>
                {error && (
                  <span className="text-red-500 text-sm mt-2">{error}</span>
                )}
              </div>
            </div>
            <textarea
              placeholder="Submission Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />
            <div className="w-full text-left mb-4">
              <span className="text-sm text-gray-600">
                Allowed formats: <span className="font-mono">.pdf</span>, <span className="font-mono">.docx</span>
              </span>
            </div>
            <div className="flex gap-4 w-full justify-center flex-wrap">
              <button
                className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded shadow text-base font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleUpload}
                disabled={!file || !!error}
              >
                Upload Paper
              </button>
              <button
                className="bg-white border border-gray-300 py-2 px-6 rounded shadow text-base font-semibold hover:bg-gray-100 transition-colors duration-200"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
            </div>
            {message && (
              <div className={`mt-2 ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
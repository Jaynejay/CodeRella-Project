// src/pages/NewAnnouncement.jsx
import { useState } from 'react';

function NewAnnouncement() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sending the announcement
    console.log({ subject, content });
    // Reset form or redirect as needed
  };

  return (
    <div className="w-[600px] h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-900 text-white p-4">
        <h2 className="text-xl font-semibold">New Announcement</h2>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex flex-col h-[calc(100%-64px)]">
        {/* Subject Input */}
        <div className="px-4 pt-3 pb-2 border-b">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full text-lg focus:outline-none"
            required
          />
        </div>

        {/* Message Content */}
        <div className="flex-grow p-4 overflow-auto">
          <textarea
            placeholder="Write your announcement here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full resize-none focus:outline-none"
          />
        </div>

        {/* Footer with Send Button and Formatting Options */}
        <div className="p-4 flex items-center border-t">
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full"
          >
            Send
          </button>
          
          <div className="ml-auto flex space-x-4">
            {/* Text Formatting Icon */}
            <button type="button" className="text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 7V4h16v3"></path>
                <path d="M9 20h6"></path>
                <path d="M12 4v16"></path>
              </svg>
            </button>
            
            {/* Attach Icon */}
            <button type="button" className="text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"></path>
              </svg>
            </button>
            
            {/* Emoji Icon */}
            <button type="button" className="text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </button>
            
            {/* Insert Link Icon */}
            <button type="button" className="text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </button>
            
            {/* Alert/Important Icon */}
            <button type="button" className="text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewAnnouncement;
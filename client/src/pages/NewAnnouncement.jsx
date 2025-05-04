// src/components/NewAnnouncement.jsx
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { X, Bold, Link as LinkIcon, Paperclip, Send } from 'lucide-react';

export default function NewAnnouncement({ onClose, onSend }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Formatting menu state
  const [showFormatMenu, setShowFormatMenu] = useState(false);
  // Link menu state
  const [showLinkMenu, setShowLinkMenu] = useState(false);

  // Link inputs
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  // File attachments
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleSubmit = () => {
    const newErrors = {};
    if (!to.trim()) newErrors.to = 'Recipient is required';
    if (!subject.trim()) newErrors.subject = 'Subject is required';
    if (!message.trim()) newErrors.message = 'Message is required';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    onSend({ to, subject, message, files });
  };

  const applyFormat = (tag) => {
    let formatted = message;
    switch (tag) {
      case 'bold':
        formatted = `**${message}**`;
        break;
      case 'italic':
        formatted = `*${message}*`;
        break;
      case 'underline':
        formatted = `<u>${message}</u>`;
        break;
    }
    setMessage(formatted);
    setShowFormatMenu(false);
  };

  const handleLinkInsert = () => {
    if (!linkText.trim() || !linkUrl.trim()) {
      setErrors(prev => ({ ...prev, link: 'Both text and URL are required' }));
      return;
    }
    const mdLink = `[${linkText}](${linkUrl})`;
    setMessage(prev => prev + ' ' + mdLink);
    setLinkText('');
    setLinkUrl('');
    setErrors(prev => ({ ...prev, link: undefined }));
    setShowLinkMenu(false);
  };

  const handleAttachClick = () => fileInputRef.current?.click();
  const handleFileChange = (e) => setFiles(Array.from(e.target.files));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={onClose}>
      <div className="w-full max-w-md rounded-lg shadow-lg bg-white animate-fadeIn" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-blue-800 px-6 py-4 flex justify-between items-center rounded-lg">
          <h2 className="text-white text-xl font-semibold">New Announcement</h2>
          <button type="button" className="text-white hover:text-gray-200" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        {/* Form */}
        <div className="px-6 py-4 space-y-4">
          {/* To */}
          <div>
            <input
              type="text"
              placeholder="To"
              className={`w-full py-2 border-b ${errors.to ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              value={to}
              onChange={e => { setTo(e.target.value); setErrors(prev => ({ ...prev, to: undefined })); }}
            />
            {errors.to && <p className="text-red-500 text-xs mt-1">{errors.to}</p>}
          </div>
          {/* Subject */}
          <div>
            <input
              type="text"
              placeholder="Subject"
              className={`w-full py-2 border-b ${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              value={subject}
              onChange={e => { setSubject(e.target.value); setErrors(prev => ({ ...prev, subject: undefined })); }}
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
          </div>
          {/* Message */}
          <div>
            <textarea
              placeholder="Write your announcement here..."
              className={`w-full h-40 p-2 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded resize-none focus:outline-none`}
              value={message}
              onChange={e => { setMessage(e.target.value); setErrors(prev => ({ ...prev, message: undefined })); }}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>
        </div>
        {/* Footer with actions */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <button type="button" onClick={() => setShowFormatMenu(!showFormatMenu)} className="text-blue-800 hover:text-blue-600">
              <Bold size={20} />
            </button>
            <button type="button" onClick={() => setShowLinkMenu(!showLinkMenu)} className="text-blue-800 hover:text-blue-600">
              <LinkIcon size={20} />
            </button>
            <button type="button" onClick={handleAttachClick} className="text-blue-800 hover:text-blue-600">
              <Paperclip size={20} />
            </button>
            <button type="button" onClick={handleSubmit} className="ml-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full flex items-center">
              <Send size={16} className="mr-2" />Send
            </button>
          </div>
          {showFormatMenu && (
            <div className="mt-2 flex space-x-2">
              <button type="button" onClick={() => applyFormat('bold')} className="font-bold">B</button>
              <button type="button" onClick={() => applyFormat('italic')} className="italic">I</button>
              <button type="button" onClick={() => applyFormat('underline')} className="underline">U</button>
            </div>
          )}
          {showLinkMenu && (
            <div className="mt-2 space-y-2">
              {errors.link && <p className="text-red-500 text-xs">{errors.link}</p>}
              <input
                type="text"
                placeholder="Link text"
                className="w-full border border-gray-300 p-1 rounded focus:outline-none"
                value={linkText}
                onChange={e => setLinkText(e.target.value)}
              />
              <input
                type="text"
                placeholder="URL"
                className="w-full border border-gray-300 p-1 rounded focus:outline-none"
                value={linkUrl}
                onChange={e => setLinkUrl(e.target.value)}
              />
              <button type="button" onClick={handleLinkInsert} className="bg-blue-600 text-white px-3 py-1 rounded">Insert Link</button>
            </div>
          )}
          <input type="file" ref={fileInputRef} multiple className="hidden" onChange={handleFileChange} />
          {files.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600">
              {files.map((file, i) => <li key={i}>{file.name}</li>)}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

NewAnnouncement.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSend:  PropTypes.func.isRequired,
};

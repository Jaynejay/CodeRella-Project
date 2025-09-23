// src/components/NewAnnouncement.jsx
import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { X, Bold, Link as LinkIcon, Paperclip, Send } from "lucide-react";

export default function NewAnnouncement({ onClose, onSend }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Formatting menu state
  const [showFormatMenu, setShowFormatMenu] = useState(false);
  // Link menu state
  const [showLinkMenu, setShowLinkMenu] = useState(false);

  // Link inputs
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  // File attachments
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const validate = () => {
    const newErrors = {};
    if (!subject.trim()) newErrors.subject = "Subject is required";
    if (!message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validate()) return;

    if (typeof onSend !== "function") {
      console.error("[NewAnnouncement] onSend is missing");
      return;
    }

    console.log("[NewAnnouncement] Sending:", { subject, message, files });
    onSend({ subject, message, files });
  };

  const applyFormat = (tag) => {
    let formatted = message;
    switch (tag) {
      case "bold":
        formatted = `**${message}**`;
        break;
      case "italic":
        formatted = `*${message}*`;
        break;
      case "underline":
        formatted = `<u>${message}</u>`;
        break;
      default:
        break;
    }
    setMessage(formatted);
    setShowFormatMenu(false);
  };

  const handleLinkInsert = () => {
    if (!linkText.trim() || !linkUrl.trim()) {
      setErrors((prev) => ({ ...prev, link: "Both text and URL are required" }));
      return;
    }
    const mdLink = `[${linkText}](${linkUrl})`;
    setMessage((prev) => prev + " " + mdLink);
    setLinkText("");
    setLinkUrl("");
    setErrors((prev) => ({ ...prev, link: undefined }));
    setShowLinkMenu(false);
  };

  const handleAttachClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => setFiles(Array.from(e.target.files));

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg shadow-lg bg-white animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-blue-800 px-6 py-4 flex justify-between items-center rounded-lg">
          <h2 className="text-white text-xl font-semibold">New Announcement</h2>
          <button
            type="button"
            className="text-white hover:text-gray-200"
            onClick={onClose}
            aria-label="Close modal"
            title="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-4 space-y-4">
          <div className="text-sm text-blue-800 bg-blue-50 border border-blue-200 rounded p-2">
            This announcement will be sent to{" "}
            <span className="font-semibold">all users</span>.
          </div>

          {/* Subject */}
          <div>
            <input
              type="text"
              placeholder="Subject"
              className={`w-full py-2 border-b ${
                errors.subject ? "border-red-500" : "border-gray-300"
              } focus:outline-none`}
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setErrors((prev) => ({ ...prev, subject: undefined }));
              }}
            />
            {errors.subject && (
              <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              placeholder="Write your announcement here..."
              className={`w-full h-40 p-2 border ${
                errors.message ? "border-red-500" : "border-gray-200"
              } rounded resize-none focus:outline-none`}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setErrors((prev) => ({ ...prev, message: undefined }));
              }}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowFormatMenu(!showFormatMenu);
              }}
              className="text-blue-800 hover:text-blue-600"
              aria-label="Formatting options"
              title="Formatting"
            >
              <Bold size={20} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowLinkMenu(!showLinkMenu);
              }}
              className="text-blue-800 hover:text-blue-600"
              aria-label="Insert link"
              title="Insert link"
            >
              <LinkIcon size={20} />
            </button>
            <button
              type="button"
              onClick={handleAttachClick}
              className="text-blue-800 hover:text-blue-600"
              aria-label="Attach files"
              title="Attach files"
            >
              <Paperclip size={20} />
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="ml-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full flex items-center"
              aria-label="Send announcement"
              title="Send"
            >
              <Send size={16} className="mr-2" />
              Send
            </button>
          </div>

          {showFormatMenu && (
            <div className="mt-2 flex space-x-2">
              <button
                type="button"
                onClick={() => applyFormat("bold")}
                className="font-bold"
                aria-label="Bold"
                title="Bold"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => applyFormat("italic")}
                className="italic"
                aria-label="Italic"
                title="Italic"
              >
                I
              </button>
              <button
                type="button"
                onClick={() => applyFormat("underline")}
                className="underline"
                aria-label="Underline"
                title="Underline"
              >
                U
              </button>
            </div>
          )}

          {showLinkMenu && (
            <div className="mt-2 space-y-2">
              {errors.link && (
                <p className="text-red-500 text-xs">{errors.link}</p>
              )}
              <input
                type="text"
                placeholder="Link text"
                className="w-full border border-gray-300 p-1 rounded focus:outline-none"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
              />
              <input
                type="text"
                placeholder="URL"
                className="w-full border border-gray-300 p-1 rounded focus:outline-none"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <button
                type="button"
                onClick={handleLinkInsert}
                className="bg-blue-600 text-white px-3 py-1 rounded"
                aria-label="Insert link"
                title="Insert link"
              >
                Insert Link
              </button>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            multiple
            className="hidden"
            onChange={handleFileChange}
            aria-label="File upload"
            title="File upload"
          />

          {files.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600">
              {files.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

NewAnnouncement.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
};

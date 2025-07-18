// src/pages/AddingCourse.jsx
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Folder, Square, ArrowDown, X } from "lucide-react";

const AddingCourse = ({ isOpen, onClose, onSubmit }) => {
  const [sNo,    setSNo]    = useState("");
  const [level,  setLevel]  = useState("");
  const [name,   setName]   = useState("");
  const [code,   setCode]   = useState("");
  const [image,  setImage]  = useState(null);

  const levels = ["final", "5s1", "5s2", "5s3", "6s1", "6s2"];
  const fileInputRef = useRef(null);

  // ─── Drag state ─────────────────────────────────────
  const modalRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [offset,   setOffset]   = useState({ x: 0, y: 0 });
  const [origin,   setOrigin]   = useState({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    if (!e.target.closest(".modal-handle")) return;
    setDragging(true);
    setOrigin({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };
  const onMouseMove = (e) => {
    if (!dragging) return;
    setOffset({ x: e.clientX - origin.x, y: e.clientY - origin.y });
  };
  const onMouseUp = () => dragging && setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  });

  // ─── File handlers ──────────────────────────────────
  const handleDragOver   = (e) => e.preventDefault();
  const handleDrop       = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) setImage(e.dataTransfer.files[0]);
  };
  const handleFileChange = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
  };

  const reset = () => {
    setSNo(""); setLevel(""); setName(""); setCode(""); setImage(null);
  };
  const handleSubmit = () => {
    onSubmit({ sNo, level, courseName: name, courseCode: code, courseImage: image });
    reset();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      onMouseDown={onMouseDown}
      style={{ cursor: dragging ? "grabbing" : "default" }}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* modal */}
      <div
        ref={modalRef}
        className="absolute w-full max-w-lg bg-white rounded-lg shadow-xl  max-h-[90vh] overflow-y-auto"
        style={{
          top: `calc(50% + ${offset.y}px)`,
          left: `calc(50% + ${offset.x}px)`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* header (drag handle) */}
        <div className="modal-handle bg-indigo-900 text-white px-6 py-4 flex justify-between items-center rounded-t-lg select-none cursor-grab">
          <h2 className="text-xl font-medium">Adding Course</h2>
          <button onClick={onClose}>
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* body */}
        <div className="p-8 space-y-6">

          {/* S. No */}
          <div>
            <label className="block mb-2 text-sm font-medium">S. No:</label>
            <input
              type="number"
              value={sNo}
              onChange={e => setSNo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Level */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Level of the course:
            </label>
            <select
              value={level}
              onChange={e => setLevel(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white"
            >
              <option value="" disabled>— Select level —</option>
              {levels.map(lvl => (
                <option key={lvl} value={lvl}>{lvl.toUpperCase()}</option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">Course Name:</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Code */}
          <div>
            <label className="block mb-2 text-sm font-medium">Course code:</label>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Upload the image of the relevant course:
            </label>
            <div className="flex gap-3 mb-3">
              <button
                onClick={() => fileInputRef.current.click()}
                className="p-2 border border-gray-300 rounded-md"
              >
                <Folder size={20} className="text-blue-600" />
              </button>
              <button
                onClick={() => fileInputRef.current.click()}
                className="p-2 border border-gray-300 rounded-md"
              >
                <Square size={20} className="text-blue-600" />
              </button>
              <span className="text-xs text-gray-500 self-center">
                Max 2 MB, 1 file
              </span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-gray-200 rounded-md p-8 flex flex-col items-center justify-center cursor-pointer"
            >
              {image ? (
                <p className="text-sm text-gray-600">
                  Selected: {image.name}
                </p>
              ) : (
                <>
                  <ArrowDown size={32} className="text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600">
                    You can drag & drop files here.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="px-8 py-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-2 bg-blue-600 text-white rounded-full font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

AddingCourse.propTypes = {
  isOpen:   PropTypes.bool.isRequired,
  onClose:  PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddingCourse;

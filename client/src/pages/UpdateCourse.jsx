import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Folder, Square, ArrowDown, X } from "lucide-react";

export default function UpdateCourse({ isOpen, onClose, onSubmit, course }) {
  const [sNo]   = useState(course.sNo ?? "");
  const [level, setLevel] = useState("");
  const [name,  setName]  = useState("");
  const [code,  setCode]  = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const levels = ["final", "5s1", "5s2", "5s3", "6s1", "6s2"];
  const fileInputRef = useRef(null);

  // Prefill fields from course prop
  useEffect(() => {
    if (course) {
      setLevel(course.level || "");
      setName(course.name || "");
      setCode(course.code || "");
      setTitle(course.title || "");
    }
  }, [course]);

  const handleSubmit = () => {
    onSubmit({
      name,
      code,
      title,
      level,
      imageFile: image
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      onMouseDown={(e) => {
        if (e.target.closest(".modal-handle")) {
          const modal = e.currentTarget.querySelector(".modal");
          const offsetX = e.clientX - modal.getBoundingClientRect().left;
          const offsetY = e.clientY - modal.getBoundingClientRect().top;
          const onMouseMove = (e) => {
            modal.style.left = `${e.clientX - offsetX}px`;
            modal.style.top = `${e.clientY - offsetY}px`;
          };
          const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
          };
          window.addEventListener("mousemove", onMouseMove);
          window.addEventListener("mouseup", onMouseUp);
        }
      }}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* modal */}
      <div
        className="modal absolute w-full max-w-lg bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* header */}
        <div className="modal-handle bg-indigo-900 text-white px-6 py-4 flex justify-between items-center rounded-t-lg select-none cursor-grab">
          <h2 className="text-xl font-medium">Update Course</h2>
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
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Level */}
          <div>
            <label className="block mb-2 text-sm font-medium">Level of the course:</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white"
            >
              <option value="" disabled>— Select level —</option>
              {levels.map((lvl) => (
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
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter new course name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Code */}
          <div>
            <label className="block mb-2 text-sm font-medium">Course code:</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter new course code"
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Title (NEW) */}
          <div>
            <label className="block mb-2 text-sm font-medium">Course Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter course title"
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="block mb-2 text-sm font-medium">Upload image of the course:</label>
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
              <span className="text-xs text-gray-500 self-center">Max 2 MB, 1 file</span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
              accept="image/*"
            />
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files[0]) setImage(e.dataTransfer.files[0]);
              }}
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-gray-200 rounded-md p-8 flex flex-col items-center justify-center cursor-pointer"
            >
              {image ? (
                <p className="text-sm text-gray-600">Selected: {image.name}</p>
              ) : (
                <>
                  <ArrowDown size={32} className="text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600">You can drag & drop files here.</p>
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
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

UpdateCourse.propTypes = {
  isOpen:   PropTypes.bool.isRequired,
  onClose:  PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  course:   PropTypes.shape({
    sNo:    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    level:  PropTypes.string,
    name:   PropTypes.string,
    code:   PropTypes.string,
    title:  PropTypes.string
  }).isRequired,
};

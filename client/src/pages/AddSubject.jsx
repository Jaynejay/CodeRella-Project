import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import DraggableModalWrapper from '../components/layout/DraggableModalWrapper';

const AddSubject = ({ onClose, onSubmit }) => {
  /* ───────── state ───────── */
  const [courseLevel, setCourseLevel] = useState('');
  const [courseName,  setCourseName]  = useState('');
  const [courseCode,  setCourseCode]  = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [files,       setFiles]       = useState([]);
  const [isDragging,  setIsDragging]  = useState(false);

  const fileInputRef = useRef(null);

  /* drag & drop */
  const onFileSelect = (e) => {
    const file = e.target.files?.[0];
    file && file.size <= 2 * 1024 * 1024 && setFiles([file]);
  };
  const onDragOver  = (e) => e.preventDefault();
  const onDragEnter = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const onDrop      = (e) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    file && file.size <= 2 * 1024 * 1024 && setFiles([file]);
  };
  const removeFile = () => setFiles([]);

  /* submit */
  const handleSave = () =>
    onSubmit({ courseLevel, courseName, courseCode, subjectName, subjectCode, files });

  /* ───────── render ───────── */
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 py-10">
      <div className="mx-auto flex min-h-full items-start justify-center">
        <DraggableModalWrapper>
          {/* ▼ added max-h & overflow */}
          <div className="w-[760px] max-h-[80vh] overflow-y-auto rounded-lg bg-white shadow-2xl">
            {/* header (drag handle) */}
            <div
              data-drag-handle
              className="flex cursor-move items-center justify-between rounded-t-lg bg-[#151d87] px-6 py-3 text-white select-none"
            >
              <h2 className="text-lg font-semibold">Adding Subjects</h2>
              <button onClick={onClose} className="text-xl leading-none hover:opacity-80">×</button>
            </div>

            {/* light-gray panel */}
            <div className="space-y-6 rounded-b-lg bg-gray-50 px-10 pb-10 pt-8">
              <InputRow label="Level of the course:" value={courseLevel}  onChange={setCourseLevel} />
              <InputRow label="Course Name:"         value={courseName}   onChange={setCourseName}  />
              <InputRow label="Course code:"         value={courseCode}   onChange={setCourseCode}  />
              <InputRow label="Subject Name:"        value={subjectName}  onChange={setSubjectName} />
              <InputRow label="Subject Code:"        value={subjectCode}  onChange={setSubjectCode} />

              {/* upload section */}
              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">
                  Upload the image of the relevant subject:
                </p>

                {/* icons + helper */}
                <div className="mb-3 flex items-center gap-3">
                  {['folder', 'file'].map((icon) => (
                    <label
                      key={icon}
                      className="grid h-8 w-8 cursor-pointer place-items-center rounded border border-gray-400 hover:bg-gray-100"
                    >
                      <input
                        ref={icon === 'file' ? fileInputRef : null}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onFileSelect}
                      />
                      {icon === 'folder' ? (
                        <svg className="h-5 w-5 text-indigo-700" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-indigo-700" viewBox="0 0 20 20" fill="currentColor">
                          <rect x="3" y="3" width="14" height="14" rx="2" />
                        </svg>
                      )}
                    </label>
                  ))}
                  <span className="text-xs text-gray-500">
                    Maximum file size: 2&nbsp;MB, Maximum number of files 1
                  </span>
                </div>

                {/* drag box */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  className={`flex h-40 flex-col items-center justify-center rounded-md border-2 border-dashed ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  } cursor-pointer`}
                >
                  {files.length ? (
                    <div className="flex w-64 items-center justify-between rounded bg-gray-100 px-3 py-1">
                      <span className="truncate text-sm">{files[0].name}</span>
                      <button onClick={removeFile} className="text-lg text-red-600 hover:text-red-800">×</button>
                    </div>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="mb-4 h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0L5 14m7 7V3" />
                      </svg>
                      <p className="text-sm text-gray-600">You can drag and drop files here to add them.</p>
                    </>
                  )}
                </div>
              </div>

              {/* buttons */}
              <div className="flex flex-col items-center gap-4 pt-1">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Save changes
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded border border-gray-400 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-full bg-blue-600 px-8 py-2 font-medium text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </DraggableModalWrapper>
      </div>
    </div>
  );
};

/* pill input */
const InputRow = ({ label, value, onChange }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-full border border-gray-300 px-5 py-2.5 focus:border-indigo-500 focus:outline-none"
    />
  </div>
);

InputRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

AddSubject.propTypes = {
  onClose:  PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddSubject;

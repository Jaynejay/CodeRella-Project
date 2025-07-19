// src/pages/AddSubject.jsx
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import DraggableModalWrapper from '../components/layout/DraggableModalWrapper';

const AddSubject = ({
  onClose,
  onSubmit,
  initialCourseLevel = '',
  initialCourseName  = '',
  initialCourseCode  = '',
}) => {
  // ─── course fields (pre-filled, read-only) ─────────────────
  const [courseLevel, setCourseLevel] = useState(initialCourseLevel);
  const [courseName,  setCourseName]  = useState(initialCourseName);
  const [courseCode,  setCourseCode]  = useState(initialCourseCode);

  // ─── subject fields ───────────────────────────────────────
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');

  // ─── file drag/drop ───────────────────────────────────────
  const [files,      setFiles]      = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // if parent changes course props, re-sync our inputs
  useEffect(() => {
    setCourseLevel(initialCourseLevel);
    setCourseName(initialCourseName);
    setCourseCode(initialCourseCode);
  }, [initialCourseLevel, initialCourseName, initialCourseCode]);

  const onFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024) setFiles([file]);
  };
  const onDragOver  = e => e.preventDefault();
  const onDragEnter = e => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = e => { e.preventDefault(); setIsDragging(false); };
  const onDrop      = e => {
    e.preventDefault(); 
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024) setFiles([file]);
  };
  const removeFile = () => setFiles([]);

  // ─── when user clicks “Save” ────────────────────────────
  const handleSave = () => {
    onSubmit({
      courseLevel,
      courseName,
      courseCode,
      subjectName,
      subjectCode,
      files
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 py-10">
      <div className="mx-auto flex min-h-full items-start justify-center">
        <DraggableModalWrapper>
          <div className="w-[760px] max-h-[80vh] overflow-y-auto rounded-lg bg-white shadow-2xl">
            {/* header */}
            <div data-drag-handle className="flex cursor-move items-center justify-between bg-[#151d87] px-6 py-3 text-white">
              <h2 className="text-lg font-semibold">Adding Subject</h2>
              <button onClick={onClose}>×</button>
            </div>

            {/* form */}
            <div className="space-y-6 bg-gray-50 px-10 pb-10 pt-8">
              {/* course info, all read-only */}
              <InputRow
                label="Level of the course:"
                value={courseLevel}
                onChange={setCourseLevel}
                readOnly
              />
              <InputRow
                label="Course Name:"
                value={courseName}
                onChange={setCourseName}
                readOnly
              />
              <InputRow
                label="Course Code:"
                value={courseCode}
                onChange={setCourseCode}
                readOnly
              />

              {/* subject info */}
              <InputRow
                label="Subject Name:"
                value={subjectName}
                onChange={setSubjectName}
              />
              <InputRow
                label="Subject Code:"
                value={subjectCode}
                onChange={setSubjectCode}
              />

              {/* file upload */}
              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">
                  Upload the image of the relevant subject:
                </p>
                <div className="mb-3 flex items-center gap-3">
                  {/* folder icon */}
                  <label className="grid h-8 w-8 cursor-pointer place-items-center rounded border border-gray-400 hover:bg-gray-100">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onFileSelect}
                    />
                    {/* svg folder */}
                    <svg className="h-5 w-5 text-indigo-700" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                  </label>
                  <span className="text-xs text-gray-500">
                    Max 2 MB, 1 file
                  </span>
                </div>
                <div
                  onClick={() => fileInputRef.current.click()}
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
                      <p className="text-sm text-gray-600">You can drag & drop here.</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* footer buttons */}
            <div className="flex justify-center gap-4 px-10 py-4">
              <button onClick={handleSave} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Save changes
              </button>
              <button onClick={onClose} className="rounded border border-gray-400 px-4 py-2 text-gray-700 hover:bg-gray-100">
                Cancel
              </button>
            </div>
          </div>
        </DraggableModalWrapper>
      </div>
    </div>
  );
};

const InputRow = ({ label, value, onChange, readOnly = false }) => (
  <div>
    <label className="mb-1 block text-sm font-medium">{label}</label>
    <input
      type="text"
      value={value}
      readOnly={readOnly}
      onChange={e => onChange(e.target.value)}
      className={
        `w-full rounded-full border px-5 py-2.5 focus:outline-none ` +
        (readOnly ? 'bg-gray-100 text-gray-600' : 'bg-white')
      }
    />
  </div>
);

AddSubject.propTypes = {
  onClose:             PropTypes.func.isRequired,
  onSubmit:            PropTypes.func.isRequired,
  initialCourseLevel:  PropTypes.string,
  initialCourseName:   PropTypes.string,
  initialCourseCode:   PropTypes.string,
};

InputRow.propTypes = {
  label:    PropTypes.string.isRequired,
  value:    PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

export default AddSubject;

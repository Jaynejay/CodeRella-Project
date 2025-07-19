import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import DraggableModalWrapper from '../components/layout/DraggableModalWrapper'; // adjust path if needed

const UpdateSubject = ({ onClose, onSubmit, initialData = {} }) => {
  /* ───────── state ───────── */
  const [formData, setFormData] = useState({
    courseCode:    initialData.courseCode    || '',
    subjectCode:   initialData.subjectCode   || '',
    newLevel:      initialData.newLevel      || '',
    newCourseName: initialData.newCourseName || '',
    subjectName:   initialData.subjectName   || '',
    files:         initialData.files         || [],
  });

  const fileInputRef = useRef(null);
  const dropRef      = useRef(null);

  /* centre viewport on mount */
  useEffect(() => window.scrollTo(0, 0), []);

  /* input change */
  const updateField = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  /* file helpers */
  const selectFile = (file) => {
    if (file.size > 2 * 1024 * 1024) return alert('File exceeds 2 MB');
    setFormData((prev) => ({ ...prev, files: [file] }));
  };
  const onFileSelect = (e) => e.target.files[0] && selectFile(e.target.files[0]);
  const onDragOver   = (e) => { e.preventDefault(); dropRef.current.classList.add('border-blue-500'); };
  const onDragLeave  = (e) => { e.preventDefault(); dropRef.current.classList.remove('border-blue-500'); };
  const onDrop       = (e) => {
    e.preventDefault();
    dropRef.current.classList.remove('border-blue-500');
    e.dataTransfer.files[0] && selectFile(e.dataTransfer.files[0]);
  };

  const saveChanges = () => onSubmit(formData);
  const submitForm  = (e) => { e.preventDefault(); onSubmit(formData); };

  /* ───────── render ───────── */
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 py-10">
      <div className="mx-auto flex min-h-full items-start justify-center">
        <DraggableModalWrapper>
          {/* ▼ added height cap & scrolling */}
          <div className="w-[720px] max-h-[80vh] overflow-y-auto rounded-lg bg-white shadow-2xl">
            {/* header (drag handle) */}
            <div
              data-drag-handle
              className="flex cursor-move items-center justify-between rounded-t-lg bg-[#151d87] px-6 py-3 text-white select-none"
            >
              <h2 className="text-lg font-semibold">Updating Subjects</h2>
              <button onClick={onClose} className="text-xl leading-none hover:opacity-80">×</button>
            </div>

            {/* form */}
            <form onSubmit={submitForm} className="space-y-6 rounded-b-lg bg-gray-50 px-10 pb-8 pt-6">
              <Input label="Course code:"            name="courseCode"    value={formData.courseCode}    onChange={updateField} />
              <Input label="Subject Code:"           name="subjectCode"   value={formData.subjectCode}   onChange={updateField} />
              <Input label="New level of the course:" name="newLevel"      value={formData.newLevel}      onChange={updateField} />
              <Input label="New Course Name:"        name="newCourseName" value={formData.newCourseName} onChange={updateField} />
              <Input label="Subject Name:"           name="subjectName"   value={formData.subjectName}   onChange={updateField} />

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
                      <input type="file" accept="image/*" className="hidden" onChange={onFileSelect} />
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
                    Maximum file size: 2 MB, Maximum number of files 1
                  </span>
                </div>

                {/* drag box */}
                <div
                  ref={dropRef}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300"
                >
                  {formData.files.length ? (
                    <div className="flex w-64 items-center justify-between rounded bg-gray-100 px-3 py-1">
                      <span className="truncate text-sm">{formData.files[0].name}</span>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, files: [] }))}
                        className="text-lg text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="mb-4 h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0L5 14m7 7V3" />
                      </svg>
                      <p className="text-sm text-gray-600">
                        You can drag and drop files here to add them.
                      </p>
                    </>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileSelect} />
                </div>
              </div>

              {/* buttons */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-4">
                  <button type="button" onClick={saveChanges} className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Save changes
                  </button>
                  <button type="button" onClick={onClose} className="rounded border border-gray-400 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Cancel
                  </button>
                </div>
                <button type="submit" className="rounded-full bg-blue-600 px-8 py-2 font-medium text-white hover:bg-blue-700">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </DraggableModalWrapper>
      </div>
    </div>
  );
};

/* pill input */
const Input = ({ label, name, value, onChange }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-full border border-gray-300 px-5 py-2.5 focus:border-indigo-500 focus:outline-none"
    />
  </div>
);

Input.propTypes = {
  label:    PropTypes.string.isRequired,
  name:     PropTypes.string,
  value:    PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

UpdateSubject.propTypes = {
  onClose:  PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    courseCode:    PropTypes.string,
    subjectCode:   PropTypes.string,
    newLevel:      PropTypes.string,
    newCourseName: PropTypes.string,
    subjectName:   PropTypes.string,
    files:         PropTypes.array,
  }),
};

export default UpdateSubject;

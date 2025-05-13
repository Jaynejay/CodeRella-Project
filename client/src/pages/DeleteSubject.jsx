import { useState } from 'react';
import PropTypes from 'prop-types';
import DraggableModalWrapper from '../components/layout/DraggableModalWrapper'; // adjust path if needed

const DeleteSubject = ({ isOpen, onClose, onDelete, initialData = {} }) => {
  /* ───────── state ───────── */
  const [form, setForm] = useState({
    courseLevel: initialData.courseLevel || '',
    courseCode:  initialData.courseCode  || '',
    courseName:  initialData.courseName  || '',
    subjectCode: initialData.subjectCode || '',
    subjectName: initialData.subjectName || '',
  });

  if (!isOpen) return null;

  const setField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleDelete = () => {
    onDelete(form);
    onClose();
  };

  /* ───────── render ───────── */
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 py-10">
      <div className="mx-auto flex min-h-full items-start justify-center">
        <DraggableModalWrapper>
          {/* ▼ height limited to 80 vh & scrolls if taller */}
          <div className="w-[720px] max-h-[80vh] overflow-y-auto rounded-lg bg-white shadow-2xl">
            {/* header (drag handle) */}
            <div
              data-drag-handle
              className="flex cursor-move items-center justify-between rounded-t-lg bg-[#151d87] px-6 py-3 text-white select-none"
            >
              <h2 className="text-lg font-semibold">Deleting Subject</h2>
              <button onClick={onClose} className="text-xl leading-none hover:opacity-80">×</button>
            </div>

            {/* body */}
            <div className="space-y-6 rounded-b-lg bg-gray-50 px-10 pb-10 pt-6">
              <Input label="Level of the course:" value={form.courseLevel} onChange={setField('courseLevel')} />
              <Input label="Course code:"         value={form.courseCode}  onChange={setField('courseCode')}  />
              <Input label="Course Name:"         value={form.courseName}  onChange={setField('courseName')}  />
              <Input label="Subject Code:"        value={form.subjectCode} onChange={setField('subjectCode')} />
              <Input label="Subject Name:"        value={form.subjectName} onChange={setField('subjectName')} />

              {/* confirmation */}
              <div className="mx-auto mt-4 w-full max-w-md rounded-lg border border-gray-300 p-8 text-center">
                <h3 className="mb-2 text-lg font-medium">Delete this course?</h3>
                <p className="mb-6 text-gray-600">Are you sure you want to delete this course?</p>

                <div className="flex justify-center gap-6">
                  <button
                    onClick={handleDelete}
                    className="rounded bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={onClose}
                    className="rounded border border-gray-400 bg-white px-6 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DraggableModalWrapper>
      </div>
    </div>
  );
};

/* pill input */
const Input = ({ label, value, onChange }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full rounded-full border border-gray-300 px-5 py-2.5 focus:border-indigo-500 focus:outline-none"
    />
  </div>
);

Input.propTypes = {
  label:    PropTypes.string.isRequired,
  value:    PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

DeleteSubject.propTypes = {
  isOpen:   PropTypes.bool.isRequired,
  onClose:  PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    courseLevel:  PropTypes.string,
    courseCode:   PropTypes.string,
    courseName:   PropTypes.string,
    subjectCode:  PropTypes.string,
    subjectName:  PropTypes.string,
  }),
};

export default DeleteSubject;

// src/pages/DeleteSubject.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DraggableModalWrapper from '../components/layout/DraggableModalWrapper'; // adjust path if needed

const DeleteSubject = ({ isOpen, onClose, onDelete, initialData = {} }) => {
  const [form, setForm] = useState({
    subjectCode: initialData.subjectCode || '',
    subjectName: initialData.subjectName || '',
  });

  // re-sync if initialData changes
  useEffect(() => {
    setForm({
      subjectCode: initialData.subjectCode || '',
      subjectName: initialData.subjectName || '',
    });
  }, [initialData.subjectCode, initialData.subjectName]);

  if (!isOpen) return null;

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // trim the code before sending
    const payload = {
      subjectCode: String(form.subjectCode || '').trim(),
      subjectName: form.subjectName,
    };

    try {
      const maybePromise = onDelete(payload);
      if (maybePromise && typeof maybePromise.then === 'function') {
        await maybePromise; // wait if parent returns a Promise
      }
      onClose();
    } catch (err) {
      // keep modal open if delete fails; parent already shows an alert
      console.error('Delete from modal failed:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 py-10" role="dialog" aria-modal="true">
      <div className="mx-auto flex min-h-full items-start justify-center">
        <DraggableModalWrapper>
          <div className="w-[720px] max-h-[80vh] overflow-y-auto rounded-lg bg-white shadow-2xl">
            {/* header (drag handle) */}
            <div
              data-drag-handle
              className="flex cursor-move items-center justify-between rounded-t-lg bg-[#151d87] px-6 py-3 text-white select-none"
              id="delete-subject-title"
            >
              <h2 className="text-lg font-semibold">Deleting Subject</h2>
              <button onClick={onClose} className="text-xl leading-none hover:opacity-80" aria-label="Close">
                ×
              </button>
            </div>

            {/* form body */}
            <form
              className="space-y-6 rounded-b-lg bg-gray-50 px-10 pb-10 pt-6"
              aria-labelledby="delete-subject-title"
              onSubmit={handleSubmit}
            >
              <Input
                id="subjectCode"
                name="subjectCode"
                label="Subject Code:"
                value={form.subjectCode}
                onChange={handleChange('subjectCode')}
                autoComplete="off"
                readOnly // prevent accidental edits in a delete modal
              />
              <Input
                id="subjectName"
                name="subjectName"
                label="Subject Name:"
                value={form.subjectName}
                onChange={handleChange('subjectName')}
                autoComplete="off"
                readOnly
              />

              {/* confirmation */}
              <div className="mx-auto mt-4 w-full max-w-md rounded-lg border border-gray-300 p-8 text-center bg-white">
                <h3 className="mb-2 text-lg font-medium">Delete this subject?</h3>
                <p className="mb-6 text-gray-600">
                  Are you sure you want to delete <span className="font-semibold">{form.subjectName || 'this subject'}</span>?
                  This action cannot be undone.
                </p>

                <div className="flex justify-center gap-6">
                  <button
                    type="submit"
                    className="rounded bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded border border-gray-400 bg-white px-6 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </DraggableModalWrapper>
      </div>
    </div>
  );
};

/* Accessible input with label link */
const Input = ({ id, name, label, value, onChange, autoComplete = 'off', readOnly = false }) => (
  <div>
    <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      readOnly={readOnly}
      className={
        `w-full rounded-full border border-gray-300 px-5 py-2.5 focus:border-indigo-500 focus:outline-none ` +
        (readOnly ? 'bg-gray-100 text-gray-600' : 'bg-white')
      }
      aria-readonly={readOnly ? 'true' : undefined}
    />
  </div>
);

Input.propTypes = {
  id:           PropTypes.string.isRequired,
  name:         PropTypes.string.isRequired,
  label:        PropTypes.string.isRequired,
  value:        PropTypes.string.isRequired,
  onChange:     PropTypes.func.isRequired,
  autoComplete: PropTypes.string,
  readOnly:     PropTypes.bool,
};

DeleteSubject.propTypes = {
  isOpen:     PropTypes.bool.isRequired,
  onClose:    PropTypes.func.isRequired,
  onDelete:   PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    subjectCode: PropTypes.string,
    subjectName: PropTypes.string,
  }),
};

export default DeleteSubject;

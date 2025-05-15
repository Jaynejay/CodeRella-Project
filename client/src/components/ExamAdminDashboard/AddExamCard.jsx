import { Plus } from "lucide-react";
import PropTypes from 'prop-types';

export default function AddExamCard({ onClick }) {
  return (
    <div
      className="bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl transition min-w-[220px] max-w-[260px] h-64"
      onClick={onClick}
    >
      <Plus className="h-16 w-16 text-blue-500 mb-4" />
      <div className="text-lg font-bold text-gray-700">Add Exam</div>
    </div>
  );
}

AddExamCard.propTypes = {
  onClick: PropTypes.func.isRequired
}; 
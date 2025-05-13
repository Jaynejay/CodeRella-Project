import React from "react";
import { Plus } from "lucide-react";

export default function AddExamCard({ onClick }) {
  return (
    <div
      className="bg-gradient-to-br from-blue-200 to-purple-200 rounded-lg shadow p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition min-h-[180px]"
      onClick={onClick}
    >
      <Plus className="h-16 w-16 text-blue-500 mb-2" />
      <div className="text-lg font-bold text-gray-700">Add Exam</div>
    </div>
  );
} 
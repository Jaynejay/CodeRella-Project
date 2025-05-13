import React from "react";

export default function ExamCard({ image, code, title }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition">
      <img src={image} alt={title} className="h-28 w-36 object-cover rounded mb-2" />
      <div className="text-xs font-bold text-gray-700">{code}</div>
      <div className="text-xs text-center text-gray-600">{title}</div>
    </div>
  );
}

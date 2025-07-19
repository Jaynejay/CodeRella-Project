import React from 'react';
import { format } from 'date-fns';

export default function ExamDates({ openDate, dueDate }) {
  // Format dates using date-fns
  const formattedOpenDate = format(new Date(openDate), 'EEEE, d MMMM yyyy, h:mm a');
  const formattedDueDate = format(new Date(dueDate), 'EEEE, d MMMM yyyy, h:mm a');

  return (
    <div className="mb-6 text-base text-gray-700 text-left">
      <div className="bg-white rounded-md shadow border p-5 flex items-center gap-4 text-left mb-4">
        <span className="font-semibold min-w-[120px]">Open Date :</span>
        <span>{formattedOpenDate}</span>
      </div>
      <div className="bg-white rounded-md shadow border p-5 flex items-center gap-4 text-left">
        <span className="font-semibold min-w-[120px]">Due Date :</span>
        <span>{formattedDueDate}</span>
      </div>
    </div>
  );
} 
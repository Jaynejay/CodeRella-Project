// src/pages/ExamManagement.jsx
import { useState } from 'react';
import { Search, Plus } from 'lucide-react';

const ExamManagement = () => {
  const exams = [
    { id: 'E_001_2024', title: 'Technical College Final Examination', year: '2024', type: 'Technical College', image: '/exam-grad.png' },
    { id: 'E_002_2024', title: 'NVQ Level 06 Written Examination', year: '2024', type: 'NVQ', image: '/exam-checklist.png' },
    { id: 'E_003_2024', title: 'NVQ Level 05 Written Examination', year: '2024', type: 'NVQ', image: '/exam-online.png' },
    { id: 'E_004_2024', title: 'Semester 01 Examination', year: '2024', type: 'Semester', image: '/exam-paper.png' },
    { id: 'E_005_2024', title: 'Semester 02 Examination', year: '2024', type: 'Semester', image: '/exam-note.png' },
    { id: 'E_006_2023', title: 'Technical College Final Examination', year: '2023', type: 'Technical College', image: '/exam-book.png' },
    { id: 'E_007_2023', title: 'NVQ Level 06 Written Examination', year: '2023', type: 'NVQ', image: '/exam-mcq.png' },
    { id: 'E_001_2022', title: 'Technical College Final Examination', year: '2022', type: 'Technical College', image: '/exam-blue.png' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-100 pl-10 pr-4 py-2 rounded-full w-full md:w-1/2 lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search"
          />
        </div>
        
        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Exam Card */}
          <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition duration-200 aspect-square">
            <div className="bg-blue-500 rounded-md p-3 mb-4">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-blue-800">Add Exam</h3>
          </div>
          
          {/* Exam Cards */}
          {exams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ExamCard component (internal to ExamManagement.jsx)
const ExamCard = ({ exam }) => {
  const { id, title, year, image } = exam;
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition duration-200">
      <div className="p-4 aspect-video bg-gray-100 flex items-center justify-center">
        <img src={image} alt={title} className="max-h-full object-contain" />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-blue-800">{id.split('_')[0]}_{id.split('_')[1]} - {title} - {year}</h3>
      </div>
    </div>
  );
};

export default ExamManagement;
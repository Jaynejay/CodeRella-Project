import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, FileText, Clock, Users, Calendar } from "lucide-react";
import NavBarExam from "../components/layout/NavBarExam";
import SideBarExam from "../components/layout/SideBarExam";

const ExamManagement2 = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const exams = [
    {
      id: 1,
      title: "Mathematics Final Exam",
      subject: "Mathematics",
      date: "2024-03-15",
      time: "09:00 AM",
      duration: "3 hours",
      totalStudents: 150,
      status: "upcoming",
    },
    {
      id: 2,
      title: "Physics Midterm",
      subject: "Physics",
      date: "2024-03-10",
      time: "10:30 AM",
      duration: "2 hours",
      totalStudents: 120,
      status: "upcoming",
    },
    {
      id: 3,
      title: "Chemistry Quiz",
      subject: "Chemistry",
      date: "2024-03-05",
      time: "02:00 PM",
      duration: "1 hour",
      totalStudents: 100,
      status: "completed",
    },
  ];

  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBarExam />
      <div className="flex">
        <SideBarExam />
        <main className="flex-1 p-8 ml-72">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Exam Management</h1>
              <Link
                to="/create-exam"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Exam
              </Link>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search exams by title or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Exam Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {exam.title}
                      </h3>
                      <p className="text-sm text-gray-600">{exam.subject}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        exam.status === "upcoming"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {exam.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{exam.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{exam.time} ({exam.duration})</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{exam.totalStudents} Students</span>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <Link
                      to={`/exam-details/${exam.id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExamManagement2; 
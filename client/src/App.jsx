/* eslint-disable no-unused-vars */
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPanel from "./pages/AdminPanel";
import PaperSetterPage from "./pages/PaperSetterPage";
import ExamAdminPage from "./pages/ExamAdminPage";
import PaymentCoordinatorPage from "./pages/PaymentCoordinatorPage";
import CourseAdminPage from "./pages/CourseAdminPage";
import PendingRequests from "./pages/PendingRequests";
import CreateUserPage from "./pages/CreateUserPage";


//File upload Functionality
import FileUploadPage from "./pages/FileUploadPage";
import AddSubmissionPage from "./pages/AddSubmissionPage";
import ExamDates from "./pages/ExamDates";

//Exam Administrator
import ExamManagement2 from "./pages/ExamAdministrator/ExamManagement2";
import ExamCourses from './pages/ExamAdministrator/ExamCourses';
import SubjectDetailsPage from './pages/ExamAdministrator/SubjectDetailsPage';
import PaperSetterAssignPage from './pages/ExamAdministrator/PaperSetterAssignPage';
import PaperSetterListPage from './pages/ExamAdministrator/PaperSetterListPage';
import UploadedPapersPage from './pages/ExamAdministrator/UploadedPapersPage';
import UploadedPaperDetail from './pages/ExamAdministrator/UploadedPaperDetail';
import AssignedCourses from './pages/ExamAdministrator/AssignedCourses.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Root Route - redirect to exam management */}
        <Route path="/" element={<Navigate to="/exam-management" replace />} />
        
        {/* File upload Routes */}
        <Route path="/upload" element={<FileUploadPage />} />
        <Route path="/addsubmission" element={<AddSubmissionPage />} />
        <Route path="/examdates" element={<ExamDates />} />

        {/* Exam Management */}
        <Route path="/exam-management" element={<ExamManagement2 />} />
        <Route path="/exam-management/:examId" element={<ExamCourses />} />
        <Route path="/exam-management/:examId/course/:courseId" element={<SubjectDetailsPage />} />
        <Route path="/exam-management/:examId/course/:courseId/papersetter/:papersetterId/assign" element={<PaperSetterAssignPage />} />
        <Route path="/exam-management/:examId/course/:courseId/papersetters" element={<PaperSetterListPage />} />
        <Route path="/uploaded-papers" element={<UploadedPapersPage />} />
        <Route path="/uploaded-paper-detail" element={<UploadedPaperDetail />} />
        <Route path="/assigned-courses" element={<AssignedCourses />} />
        <Route path="/subject-details/:courseId" element={<SubjectDetailsPage />} />
          
       
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/complete-profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/pending" element={<PendingRequests />} />
        <Route path="/admin/paper-setters" element={<PaperSetterPage />} />
        <Route path="/admin/exam-admins" element={<ExamAdminPage />} />
        <Route path="/admin/payment-coordinators"element={<PaymentCoordinatorPage />} />
        <Route path="/admin/course-admins" element={<CourseAdminPage />} />
        <Route path="/admin/create" element={<CreateUserPage />} />
      </Routes>
    </div>
  );
}

export default App;

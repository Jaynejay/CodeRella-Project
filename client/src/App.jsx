
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

function App() {
  return (
    <div className="App">
      <Routes>
        
        {/* File upload Routes */}
        <Route path="/upload" element={<FileUploadPage />} />
        <Route path="/addsubmission" element={<AddSubmissionPage />} />
        <Route path="/examdates" element={<ExamDates />} />

        {/* Exam Management */}
        <Route path="/exam-management" element={<ExamManagement2 />} />
          
       
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/complete-profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/pending" element={<PendingRequests />} />
        <Route path="/admin/paper-setters" element={<PaperSetterPage />} />
        <Route path="/admin/exam-admins" element={<ExamAdminPage />} />
        <Route path="/admin/payment-coordinators"element={<PaymentCoordinatorPage />} />
        <Route path="/admin/course-admins" element={<CourseAdminPage />} />
        <Route path="/admin/create" element={<CreateUserPage />} />

        {/* Redirect from root to landing page 
        <Route path="/" element={<Navigate to="/landing" replace />} />*/}
      </Routes>
    </div>
  );
}

export default App;

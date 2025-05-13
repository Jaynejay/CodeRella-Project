/* eslint-disable no-unused-vars */
import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import AccountSetup from "./pages/AccountSetup";
import RegistrationForm from "./pages/RegistrationForm";
import Forgotpw1 from "./pages/Forgotpw1";
import Changepw1 from "./pages/changepw1";
import AdminDashboard from "./pages/AdminDashboard";
import PaperSetterList from "./pages/PaperSetterList";
import FileUploadPage from "./pages/FileUploadPage";
import AddSubmissionPage from "./pages/AddSubmissionPage";
import ExamManagement2 from "./pages/ExamAdministrator/ExamManagement2";
import ExamDates from "./pages/ExamDates";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<AccountSetup />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/forgotpw" element={<Forgotpw1 />} />
        <Route path="/changepw" element={<Changepw1 />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/upload" element={<FileUploadPage />} />
        <Route path="/addsubmission" element={<AddSubmissionPage />} />
        <Route path="/examdates" element={<ExamDates />} />
        <Route path="/exam-management" element={<ExamManagement2 />} />

        {/* Redirect from root to landing page */}
        <Route path="/" element={<Navigate to="/landing" replace />} />
      </Routes>
    </div>
  );
}

export default App;

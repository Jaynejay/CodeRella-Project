import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Authentication & Profile
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CompleteProfile from "./pages/CompleteProfile";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AccountSetup from "./pages/AccountSetup";

// Admin Panel
import AdminPanel from "./pages/AdminPanel";
import PendingRequests from "./pages/PendingRequests";
import PaperSetterPage from "./pages/PaperSetterPage";
import ExamAdminPage from "./pages/ExamAdminPage";
import PaymentCoordinatorPage from "./pages/PaymentCoordinatorPage";
import CourseAdminPage from "./pages/CourseAdminPage";
import CreateUserPage from "./pages/CreateUserPage";
import UserDetailsPage from "./pages/UserDetailsPage";

// Dashboard & Navigation
import Dashboard from "./pages/Dashboard";
import NavbarCourse from "./components/layout/NavbarCourse";
import DashboardUser from "./pages/DashboardUser";
import NavbarUser from "./components/layout/NavbarUser";

// Course & Subject Management
import CourseOverview from "./pages/CourseOverview";
import SubjectOverview from "./pages/SubjectOverview";
import AddingCourse from "./pages/AddingCourse";
import DeleteCourse from "./pages/DeleteCourse";
import UpdateCourse from "./pages/UpdateCourse";
import AddSubject from "./pages/AddSubject";
import UpdateSubject from "./pages/UpdateSubject";
import AdminSubjectDetail from "./pages/AdminSubjectdetail";
import SubjectDetail from "./pages/SubjectDetail";
import UserSubjects from "./pages/UserSubjects";

// Announcements
import AnnouncementPage from "./pages/AnnouncementPage";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import NewAnnouncement from "./pages/NewAnnouncement";
import AnnouncementsUser from "./pages/AnnouncementsUser";
import AnnDetailUser from "./pages/AnnDetailUser";

// Exam Admin
import ExamManagement2 from "./pages/ExamAdministrator/ExamManagement2";
import ExamCourses from "./pages/ExamAdministrator/ExamCourses";
import SubjectDetailsPage from "./pages/ExamAdministrator/SubjectDetailsPage";
import PaperSetterAssignPage from "./pages/ExamAdministrator/PaperSetterAssignPage";
import PaperSetterListPage from "./pages/ExamAdministrator/PaperSetterListPage";
import UploadedPapersPage from "./pages/ExamAdministrator/UploadedPapersPage";
import UploadedPaperDetail from "./pages/ExamAdministrator/UploadedPaperDetail";
import AssignedCourses from "./pages/ExamAdministrator/AssignedCourses";

// File Upload
import FileUploadPage from "./pages/FileUploadPage";
import AddSubmissionPage from "./pages/AddSubmissionPage";
import ExamDates from "./pages/ExamDates";

// Other
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import PaperSetterList from "./pages/PaperSetterList";
import Forgotpw1 from "./pages/Forgotpw1";
import Changepw1 from "./pages/changepw1";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth & Profile */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/account" element={<AccountSetup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/forgotpw" element={<Forgotpw1 />} />
        <Route path="/changepw" element={<Changepw1 />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/pending" element={<PendingRequests />} />
        <Route path="/admin/paper-setters" element={<PaperSetterPage />} />
        <Route path="/admin/exam-admins" element={<ExamAdminPage />} />
        <Route
          path="/admin/payment-coordinators"
          element={<PaymentCoordinatorPage />}
        />
        <Route path="/admin/course-admins" element={<CourseAdminPage />} />
        <Route path="/admin/create" element={<CreateUserPage />} />
        <Route path="/admin/user/:id" element={<UserDetailsPage />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <>
              <NavbarCourse />
              <Dashboard />
            </>
          }
        />
        <Route path="/userdashboard" element={<DashboardUser />} />

        {/* Courses */}
        <Route
          path="/courses"
          element={
            <>
              <NavbarCourse />
              <CourseOverview />
            </>
          }
        />
        <Route
          path="/courses/:code"
          element={
            <>
              <NavbarCourse />
              <SubjectOverview />
            </>
          }
        />
        <Route path="/subjects/:id" element={<SubjectOverview />} />
        <Route path="/subject/:id" element={<SubjectDetail />} />
        <Route path="/mysubjects" element={<UserSubjects />} />

        {/* Announcements */}
        <Route
          path="/announcements"
          element={
            <>
              <NavbarCourse />
              <AnnouncementPage />
            </>
          }
        />
        <Route
          path="/announcement/:id"
          element={
            <>
              <NavbarCourse />
              <AnnouncementDetail />
            </>
          }
        />
        <Route path="/announcement" element={<AnnouncementPage />} />
        <Route
          path="/userannouncements"
          element={
            <>
              <NavbarUser />
              <AnnouncementsUser />
            </>
          }
        />
        <Route
          path="/userannouncements/:id"
          element={
            <>
              <NavbarUser />
              <AnnDetailUser />
            </>
          }
        />
        <Route path="/new-announcement" element={<NewAnnouncement />} />

        {/* Admin Subject Detail */}
        <Route
          path="/adminsubject-detail/:id"
          element={
            <>
              <NavbarCourse />
              <AdminSubjectDetail />
            </>
          }
        />

        {/* Course & Subject Modals */}
        <Route
          path="/adding-course"
          element={
            <AddingCourse
              isOpen={true}
              onClose={() => {}}
              onSubmit={() => {}}
            />
          }
        />
        <Route
          path="/delete-course"
          element={
            <DeleteCourse
              isOpen={true}
              onClose={() => {}}
              onDelete={() => {}}
            />
          }
        />
        <Route path="/update-course" element={<UpdateCourse />} />
        <Route path="/add-subject" element={<AddSubject />} />
        <Route path="/update-subject" element={<UpdateSubject />} />

        {/* File Upload */}
        <Route path="/upload" element={<FileUploadPage />} />
        <Route path="/addsubmission" element={<AddSubmissionPage />} />
        <Route path="/examdates" element={<ExamDates />} />

        {/* Exam Administrator */}
        <Route path="/exam-management" element={<ExamManagement2 />} />
        <Route path="/exam-management/:examId" element={<ExamCourses />} />
        <Route
          path="/exam-management/:examId/course/:courseId"
          element={<SubjectDetailsPage />}
        />
        <Route
          path="/exam-management/:examId/course/:courseId/papersetter/:papersetterId/assign"
          element={<PaperSetterAssignPage />}
        />
        <Route
          path="/exam-management/:examId/course/:courseId/papersetters"
          element={<PaperSetterListPage />}
        />
        <Route path="/uploaded-papers" element={<UploadedPapersPage />} />
        <Route
          path="/uploaded-paper-detail"
          element={<UploadedPaperDetail />}
        />
        <Route path="/assigned-courses" element={<AssignedCourses />} />
        <Route
          path="/subject-details/:courseId"
          element={<SubjectDetailsPage />}
        />

        {/* Other */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/paperSetter" element={<PaperSetterList />} />
      </Routes>
    </Router>
  );
}

export default App;

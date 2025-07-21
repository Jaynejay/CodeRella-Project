/* eslint-disable no-unused-vars */

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Admin & Auth Pages
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPanel from "./pages/AdminPanel";
import PaperSetterPage from "./pages/PaperSetterPage";
import ExamAdminPage from "./pages/ExamAdminPage";
import PaymentCoordinatorPage from "./pages/PaymentCoordinatorPage";
import CourseAdminPage from "./pages/CourseAdminPage";
import PendingRequests from "./pages/PendingRequests";
import CreateUserPage from "./pages/CreateUserPage";

// Dev / User Dashboard
// import LoginPage from "./pages/LoginPage";

// import AccountSetup from "./pages/AccountSetup";
// import Forgotpw1 from "./pages/Forgotpw1";
// import Changepw1 from "./pages/changepw1";
// import AdminDashboard from "./pages/AdminDashboard";
// import PaperSetterList from "./pages/PaperSetterList";

// Dashboard + Courses
import Dashboard from "./pages/Dashboard";
import CourseOverview from "./pages/CourseOverview";
import SubjectOverview from "./pages/SubjectOverview";
import AnnouncementPage from "./pages/AnnouncementPage";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import AddingCourse from "./pages/AddingCourse";
import DeleteCourse from "./pages/DeleteCourse";
import UpdateCourse from "./pages/UpdateCourse";
import AddSubject from "./pages/AddSubject";
import UpdateSubject from "./pages/UpdateSubject";
import NewAnnouncement from "./pages/NewAnnouncement";
import NavbarCourse from "./components/layout/NavbarCourse";
import AdminSubjectDetail from "./pages/AdminSubjectdetail";

// User Side
import DashboardUser from "./pages/DashboardUser";
import UserSubjects from "./pages/UserSubjects";
import SubjectDetail from "./pages/SubjectDetail";
import NavbarUser from "./components/layout/NavbarUser";
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

// Payment
import PaymentPage from "./pages/payments/PaymentPage.jsx";
import AdminRatesPage from "./pages/payments/AdminRatesPage.jsx";

// File Upload
import FileUploadPage from "./pages/FileUploadPage";
// import AddSubmissionPage from "./pages/AddSubmissionPage";
import ExamDates from "./pages/ExamDates";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Router>
        <Routes>
          {/* Root Redirect */}
          <Route path="/" element={<Navigate replace to="/dashboard" />} />

          {/* Auth & Admin Routes */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/complete-profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/pending" element={<PendingRequests />} />
          <Route path="/admin/paper-setters" element={<PaperSetterPage />} />
          <Route path="/admin/exam-admins" element={<ExamAdminPage />} />
          <Route
            path="/admin/payment-coordinators"
            element={<PaymentCoordinatorPage />}
          />
          <Route path="/admin/course-admins" element={<CourseAdminPage />} />
          <Route path="/admin/create" element={<CreateUserPage />} />

          {/* Dev Routes */}
          {/* <Route path="/landing" element={<LandingPage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/account" element={<AccountSetup />} /> */}
          {/* <Route path="/registration" element={<RegistrationForm />} /> */}
          {/* <Route path="/forgotpw" element={<Forgotpw1 />} /> */}
          {/* <Route path="/changepw" element={<Changepw1 />} /> */}
          {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
          {/* <Route path="/paperSetter" element={<PaperSetterList />} /> */}

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

          {/* User Dashboard */}
          <Route path="/userdashboard" element={<DashboardUser />} />
          <Route path="/mysubjects" element={<UserSubjects />} />
          <Route path="/subject/:id" element={<SubjectDetail />} />

          {/* User Announcements */}
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

          {/* Modals (as routes) */}
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
                course={{}}
              />
            }
          />
          <Route
            path="/update-course"
            element={
              <UpdateCourse
                isOpen={true}
                onClose={() => {}}
                onSubmit={() => {}}
                course={{ sNo: 1 }}
              />
            }
          />
          <Route
            path="/add-subject"
            element={<AddSubject onClose={() => {}} onSubmit={() => {}} />}
          />
          <Route
            path="/update-subject"
            element={<UpdateSubject onClose={() => {}} onSubmit={() => {}} />}
          />
          <Route
            path="/new-announcement"
            element={<NewAnnouncement onClose={() => {}} onSend={() => {}} />}
          />

          {/* Payment */}
          <Route path="/payments" element={<PaymentPage />} />
          <Route path="/admin/payments" element={<AdminRatesPage />} />

          {/* File Upload */}
          <Route path="/upload" element={<FileUploadPage />} />
          {/* <Route path="/addsubmission" element={<AddSubmissionPage />} /> */}
          <Route path="/examdates" element={<ExamDates />} />

          {/* Exam Management */}
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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

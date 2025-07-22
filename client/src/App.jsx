import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Common imports
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

import DashboardUser from "./pages/DashboardUser";
import UserSubjects from "./pages/UserSubjects";
import SubjectDetail from "./pages/SubjectDetail";
import NavbarUser from "./components/layout/NavbarUser";
import AnnouncementsUser from "./pages/AnnouncementsUser";
import AnnDetailUser from "./pages/AnnDetailUser";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CompleteProfile from "./pages/CompleteProfile";
import AdminPanel from "./pages/AdminPanel";
import PaperSetterPage from "./pages/PaperSetterPage";
import ExamAdminPage from "./pages/ExamAdminPage";
import PaymentCoordinatorPage from "./pages/PaymentCoordinatorPage";
import CourseAdminPage from "./pages/CourseAdminPage";
import PendingRequests from "./pages/PendingRequests";
import CreateUserPage from "./pages/CreateUserPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import AllActivitiesPage from "./pages/AllActivitiesPage";
import AllUsersPage from "./pages/AllUserPage";
import EditUserPage from "./pages/EditUserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pending"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <PendingRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/paper-setters"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <PaperSetterPage />
            </ProtectedRoute>
          }
        />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route
          path="/admin/exam-admins"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <ExamAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payment-coordinators"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <PaymentCoordinatorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/course-admins"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <CourseAdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <CreateUserPage />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <UserDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/activity"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <AllActivitiesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user-accounts"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <AllUsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id/edit"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <EditUserPage />
            </ProtectedRoute>
          }
        />

        {/* Admin dashboard */}
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

        {/* User Dashboard & Pages */}
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

        {/* Standalone modals */}
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
        <Route path="/new-announcement" element={<NewAnnouncement />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPanel from "./pages/AdminPanel";
import PaperSetterPage from "./pages/PaperSetterPage";
import ExamAdminPage from "./pages/ExamAdminPage";
import PaymentCoordinatorPage from "./pages/PaymentCoordinatorPage";
import CourseAdminPage from "./pages/CourseAdminPage";
import PendingRequests from "./pages/PendingRequests";
import CreateUserPage from "./pages/CreateUserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
      </Routes>
    </Router>
  );
}

export default App;

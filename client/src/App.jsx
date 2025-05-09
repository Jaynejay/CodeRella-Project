
// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// Common imports
import Dashboard          from './pages/Dashboard';
import CourseOverview     from './pages/CourseOverview';
import SubjectOverview    from './pages/SubjectOverview';
import AnnouncementPage   from './pages/AnnouncementPage';
import AnnouncementDetail from './pages/AnnouncementDetail';
import AddingCourse       from './pages/AddingCourse';
import DeleteCourse       from './pages/DeleteCourse';
import UpdateCourse       from './pages/UpdateCourse';
import AddSubject         from './pages/AddSubject';
import UpdateSubject      from './pages/UpdateSubject';
import NewAnnouncement    from './pages/NewAnnouncement';
import NavbarCourse       from './components/layout/NavbarCourse';
import AdminSubjectDetail from './pages/AdminSubjectdetail';

import DashboardUser      from './pages/DashboardUser';
import UserSubjects       from './pages/UserSubjects';
import SubjectDetail      from './pages/SubjectDetail';
import NavbarUser         from './components/layout/NavbarUser';
import AnnouncementsUser  from './pages/AnnouncementsUser';
import AnnDetailUser      from './pages/AnnDetailUser';

// Dev branch imports
import LoginPage          from './pages/LoginPage';
import LandingPage        from './pages/LandingPage';
import AccountSetup       from './pages/AccountSetup';
import RegistrationForm   from './pages/RegistrationForm';
import Forgotpw1          from './pages/Forgotpw1';
import Changepw1          from './pages/changepw1';
import AdminDashboard     from './pages/AdminDashboard';
import PaperSetterList    from './pages/PaperSetterList';



function App() {
  return (
    <div className="overflow-x-hidden">
      <Router>
        <Routes>
          {/* Redirect root → dashboard */}
          <Route path="/" element={<Navigate replace to="/dashboard" />} />

          {/* Dev branch routes */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountSetup />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/forgotpw" element={<Forgotpw1 />} />
          <Route path="/changepw" element={<Changepw1 />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/paperSetter" element={<PaperSetterList />} />

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
          <Route path="/adding-course" element={<AddingCourse isOpen={true} onClose={() => {}} onSubmit={() => {}} />} />
          <Route path="/delete-course" element={<DeleteCourse isOpen={true} onClose={() => {}} onDelete={() => {}} />} />
          <Route path="/update-course" element={<UpdateCourse />} />
          <Route path="/add-subject" element={<AddSubject />} />
          <Route path="/update-subject" element={<UpdateSubject />} />
          <Route path="/new-announcement" element={<NewAnnouncement />} />

       
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
import AdminSubjectDetail from './pages/AdminSubjectdetail'

import DashboardUser   from './pages/DashboardUser';
import UserSubjects from './pages/UserSubjects';
import SubjectDetail from './pages/SubjectDetail'; 
import NavbarUser from './components/layout/NavbarUser';
import AnnouncementsUser from './pages/AnnouncementsUser';
import AnnDetailUser from './pages/AnnDetailUser';


function App() {
  return (
    /* ▼ block horizontal scrolling everywhere */
    <div className="overflow-x-hidden">
      <Router>
        <Routes>
          {/* redirect root → dashboard */}
          <Route path="/" element={<Navigate replace to="/dashboard" />} />

          {/* dashboard */}
          <Route
            path="/dashboard"
            element={
              <>
                <NavbarCourse />
                <Dashboard />
              </>
            }
          />
          <Route
  path="/announcements/:id"
  element={
    <>
      <NavbarCourse />
      <AnnouncementDetail />
    </>
  }
/>

          {/* course overview */}
          <Route
            path="/courses"
            element={
              <>
                <NavbarCourse />
                <CourseOverview />
              </>
            }
          />

          {/* subject overview */}
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
          <Route path="/courses/:code" element={<SubjectOverview />} />

          {/* announcements */}
          <Route
            path="/announcements"
            element={
              <>
                <NavbarCourse />
                <AnnouncementPage />
              </>
            }
          />
            {/* announcement detail */}
         <Route
           path="/announcement/:id"
           element={
            <>
              <NavbarCourse />
               <AnnouncementDetail />
             </>
           }
         />
 <Route
    path="/adminsubject-detail/:id"
    element={
      <>
        <NavbarCourse />
        <AdminSubjectDetail />
      </>
    }
  />



         {/*User dashboard connections*/}
         <Route path="/mysubjects"   element={<UserSubjects />} />
         <Route path="/subject/:id" element={<SubjectDetail />} />
       
         <Route
  path="/userannouncements"
  element={
    <>
      <NavbarUser />      {/* or NavbarCourse, wherever you want your nav */}
      <AnnouncementsUser />
    </>
  }
/>
 {/* user-side announcement detail */}
        <Route
         path="/userannouncements/:id"
         element={
           <>
             <NavbarUser />
              <AnnDetailUser />
            </>
          }
        />






          {/* standalone modal routes (optional) */}
          <Route path="/adding-course"    element={<AddingCourse   isOpen={true} onClose={() => {}} onSubmit={() => {}} />} />
          <Route path="/delete-course"    element={<DeleteCourse   isOpen={true} onClose={() => {}} onDelete={() => {}} />} />
          <Route path="/update-course"    element={<UpdateCourse   />} />
          <Route path="/add-subject"      element={<AddSubject     />} />
          <Route path="/update-subject"   element={<UpdateSubject  />} />
          <Route path="/new-announcement" element={<NewAnnouncement />} />
          <Route path="/userdashboard" element={<DashboardUser/>}/>
          

          {/* fallback → dashboard */}



          <Route path="/announcement" element={<AnnouncementPage />} />

          
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;

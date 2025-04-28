// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnnouncementPage from './pages/AnnouncementPage';
import AddingCourse from './pages/AddingCourse';
import DeleteCourse from './pages/DeleteCourse';
import UpdateCourse from './pages/UpdateCourse';
import AddSubject from './pages/AddSubject';
import UpdateSubject from './pages/UpdateSubject';
import NewAnnouncement from './pages/NewAnnouncement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnnouncementPage />} />
        <Route path="/delete-course" element={<DeleteCourse />} />
        <Route path="/update-course" element={<UpdateCourse />} />
        <Route path="/add-subject" element={<AddSubject />} />
      
        <Route path="/update-subject" element={<UpdateSubject />} />
        <Route  path="/adding-course"  element={<AddingCourse isOpen={true}onClose={() => console.log('Close clicked')}
      onSubmit={(data) => console.log('Form submitted:', data)}
    />
    
    }
/>
<Route
  path="/delete-course"
  element={
    <DeleteCourse
      isOpen={true}  // This needs to be passed for the component to render
      onClose={() => console.log('Close clicked')}
      onDelete={(data) => console.log('Course deleted:', data)}
    />
  }
/>
<Route path="/new-announcement" element={<NewAnnouncement/>}/>




      </Routes>
    </Router>
  );
}

export default App;

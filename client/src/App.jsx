import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PaperSyncLogin from "./pages/PaperSyncLogin";
import AccountSetup from "./pages/AccountSetup";
import RegistrationForm from "./pages/RegistrationForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/main" element={<PaperSyncLogin />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<AccountSetup />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/" element={<Navigate to="/main" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

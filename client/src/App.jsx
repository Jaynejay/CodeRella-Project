import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import AccountSetup from "./pages/AccountSetup";
import RegistrationForm from "./pages/RegistrationForm";
import Forgotpw1 from "./pages/Forgotpw1";
import Changepw1 from "./pages/Changepw1";



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountSetup />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/forgotpw" element={<Forgotpw1 />} />
          <Route path="/changepw" element={<Changepw1 />} />
          <Route path="/" element={<Navigate to="/landing" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

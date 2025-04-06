import Landing from "./pages/Landing"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AccountSetup from "./pages/AccountSetup";
import RegistrationForm from "./pages/RegistrationForm";
import ForgotPassword from "./pages/ForgotPassword";
import Jayani from "./pages/jayani";


function App() {
  

  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<AccountSetup />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/jayani" element={<Jayani />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App

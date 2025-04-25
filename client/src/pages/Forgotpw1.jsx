import { useState } from "react";
import logo from "../assets/images/logo.svg";
import students from "../assets/images/bg.svg";
import { useNavigate, Link } from "react-router-dom";

const Forgotpw1 = () => {
  const [emailData, setEmailData] = useState({
    Email: ""
  });

  const navigate = useNavigate();

  // Handles input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email entered:", emailData.Email);
    // You can add validation or API calls here
    navigate("/changepw");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left panel */}
          <div className="w-full md:w-5/12 p-8 flex flex-col justify-between">
            <div>
              {/* Logo */}
              <div className="flex items-center mb-6">
                <Link to="/">
                  <img src={logo} alt="DTET logo" className="w-50 h-12 mr-3" />
                </Link>
              </div>

              <div className="mt-8 mb-8 py-40">
                <h1 className="text-xl font-bold text-center mb-2">
                  Forgot password?
                </h1>
                <form className="text-center" onSubmit={handleSubmit}>
                  <label htmlFor="email" className="block mb-2 pt-5">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="Email"
                    value={emailData.Email}
                    onChange={handleChange}
                    className="text-center w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                  <div className="mt-6 flex justify-center">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="w-full md:w-7/12 bg-gray-100">
            <img
              src={students}
              alt="Graduates throwing caps"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotpw1;

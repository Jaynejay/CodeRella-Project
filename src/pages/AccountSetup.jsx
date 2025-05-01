import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import students from "../assets/images/bg.svg";
import { Link } from "react-router-dom";

const AccountSetup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Panel */}
          <div className="w-full md:w-5/12 p-8 flex flex-col justify-between">
            <div>
              {/* Logo and Department Header */}
              <div className="flex items-center mb-6">
                <Link to="/">
                  <img src={logo} alt="DTET Logo" className="w-50 h-12 mr-3" />
                </Link>
              </div>

              {/* Account Setup Form */}
              <div className="mt-8 mb-8">
                <h1 className="text-2xl font-bold mb-8">
                  Set Up Your Account !
                </h1>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="username" className="block mb-1">
                      Username:
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="block mb-1">
                      Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block mb-1">
                      Confirm password:
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-2 px-12 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Panel - Graduation Image */}
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

export default AccountSetup;

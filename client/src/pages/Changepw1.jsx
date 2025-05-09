import logo from "../assets/images/logo.svg";
import students from "../assets/images/bg.svg";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Changepw1 = () => {
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordData.password !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Password changed successfully:", passwordData.password);
    // Do actual password update logic here (API call, etc.)
    navigate("/login"); // Example navigation after success
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-5/12 p-8 flex flex-col justify-between">
            <div className="flex items-center mb-2">
              <Link to="/">
                <img src={logo} alt="DTET logo" />
              </Link>
            </div>

            <div className="text-center mt-2 mb-14">
              <h1 className="font-bold text-xl mb-8">Enter new password</h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="password" className="block mb-1">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={passwordData.password}
                    onChange={handleChange}
                    className="w-full text-center border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block mb-1">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handleChange}
                    className="w-full text-center border border-gray-300 rounded-md px-3 py-2 mb-4"
                    required
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-2 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
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

export default Changepw1;

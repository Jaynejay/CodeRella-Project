import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from "../assets/images/logo.svg";
import students from "../assets/images/bg.svg";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login attempted:', loginData);
    // Example navigation after successful login
    // navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Panel - Login Form */}
          <div className="w-full md:w-5/12 p-8 flex flex-col justify-between">
            <div>
              {/* Logo and Department Header */}
              <div className="flex items-center mb-6">
                <Link to="/">
                  <img src={logo} alt="DTET Logo" className="w-50 h-12 mr-3" />
                </Link>
              </div>

              {/* Login Form */}
              <div className="mt-8 mb-8">
                <h1 className="text-2xl font-bold mb-2">Paper Sync</h1>
                <h2 className="text-xl font-medium mb-6">
                  Exam Paper Management System
                </h2>
                <p className="text-lg font-medium mb-6">Welcome Back!</p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-left mb-1">
                      Username:
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={loginData.username}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="block text-left mb-1">
                      Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      Login
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <a
                      href="/forgot-password"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      forgot password?
                    </a>
                  </div>
                </form>
              </div>
            </div>

            {/* Sign Up Section */}
            <div className="mt-4 text-center">
              <p className="text-sm mb-2">Don&apos;t have an account?</p>
              <button
                onClick={() => navigate("/sign-up")}
                className="w-full bg-white border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition duration-300"
              >
                Sign up
              </button>
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

export default LoginPage;
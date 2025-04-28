import { useState, useEffect } from "react";
import logo from "../assets/images/logo.svg";
import students from "../assets/images/bg.svg";
import Preloader from "../components/common/Preloader";
import {Link} from "react-router-dom"

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen bg-white flex justify-center items-center">
          <Preloader />
        </div>
      ) : (
        <div className="w-full h-screen bg-gradient-to-t from-[#4fa3e2] to-white flex justify-center items-center">
          <div className="w-4/5 lg:w-3/5 bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
            <div className="w-full md:w-1/2 p-10 flex flex-col justify-between">
              <div className="mb-8">
                <Link to="/">
                  <img src={logo} alt="Logo" className="h-14 mb-4" />
                </Link>
                <h2 className="text-2xl font-bold text-gray-800">Paper Sync</h2>
                <p className="text-gray-600">Exam Paper Management System</p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800">
                  Welcome Back!
                </h3>
                <div className="flex space-x-2 mt-4">
                  <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                  <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                  <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                  <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                </div>
              </div>

              <div className="mt-8 flex flex-col space-y-4">
                <Link to="/sign-in">
                  <button className="w-full bg-transparent text-blue-600 border border-blue-600 rounded-lg py-2 px-4 hover:bg-blue-600 hover:text-white">
                    Already have an account
                  </button>
                </Link>

                <Link to="/sign-up">
                  <button className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700">
                    Sign up
                  </button>
                </Link>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <img
                src={students}
                alt="Graduated Students"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;

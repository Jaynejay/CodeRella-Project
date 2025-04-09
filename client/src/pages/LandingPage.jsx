import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/images/bg.svg';
import logoImage from '../assets/images/logo.svg';


const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  // Handle slide navigation
  const handleDotClick = (index) => {
    setCurrentSlide(index);
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
                <img 
                  src={logoImage} 
                  alt="DTET Logo" 
                  className="w-50 h-12 mr-3" 
                />
                
              </div>
              
              {/* Main Content */}
              <div className="text-center mt-20 mb-8">
                <h1 className="text-2xl font-bold">Paper Sync</h1>
                <h2 className="text-xl font-bold">Exam Paper Management System</h2>
                <p className="text-lg font-medium mt-2">Welcome Back!</p>
              </div>
              
              {/* Dots Navigation */}
              <div className="flex justify-center space-x-2 mt-4 mb-8">
                {[0, 1, 2, 3, 4].map((index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentSlide === index ? 'bg-black' : index === 1 ? 'bg-blue-300' : index === 2 ? 'bg-blue-500' : index === 3 ? 'bg-blue-800' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Account Section */}
            <div className="mt-20">
              <p className="text-center mb-4">Already have an account</p>
              <button onClick={() => navigate('/signup')} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                Sign up
              </button>
            </div>
          </div>
          
          {/* Right Panel - Graduation Image */}
          <div className="w-full md:w-7/12 bg-gray-100">
            <img 
              src={bgImage} 
              alt="Graduates throwing caps" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
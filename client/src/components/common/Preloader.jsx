const Preloader = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-t from-[#4fa3e2] to-white flex flex-col justify-center items-center">
     
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-500 border-l-blue-500 border-r-transparent border-b-transparent rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-t-white border-l-white border-r-transparent border-b-transparent rounded-full animate-[spin_1.5s_linear_infinite]"></div>
      </div>

     
      <div className="mt-6">
        <img
          src="/src/assets/images/logo.svg"
          alt="Logo"
          className="h-12 w-auto animate-pulse"
        />
      </div>

      
      <p className="mt-4 text-gray-700 font-medium text-lg">
        Loading ...
      </p>
    </div>
  );
};

export default Preloader;

function Footer() {
  return (
    <footer className="bg-gray-100 p-6 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center space-x-4 mb-2 md:mb-0">
        <a href="#" className="hover:text-blue-600">
          📞
        </a>
        <a href="#" className="hover:text-blue-600">
          ✉️
        </a>
        <a href="#" className="hover:text-blue-600">
          🌐
        </a>
      </div>
      <div className="text-center mb-2 md:mb-0">
        You are logged in as{" "}
        <span className="font-semibold">Lokupathirage I.M (Reg.ID)</span> |{" "}
        <button className="text-red-500 hover:underline">Log Out</button>
      </div>
      <div className="flex space-x-2">
        <img src="/google-play-badge.png" alt="Google Play" className="h-8" />
        <img src="/app-store-badge.png" alt="App Store" className="h-8" />
      </div>
    </footer>
  );
}

export default Footer;

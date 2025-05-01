// src/pages/AnnouncementPage.jsx
import { useState } from 'react';
import logo from '../assets/images/logo.svg';

function AnnouncementPage() {
  const [announcements] = useState([
    { id: 1, sender: 'I.M. Lokupathirage', subject: 'Upgrade the website', date: '10 Dec', starred: false },
    { id: 2, sender: 'P.P.P. Jayathilake', subject: 'Scheduled System upgrade', date: '6 Oct', starred: false },
    { id: 3, sender: 'W.A.T.E. Wadanambi', subject: 'Power interruption', date: '2 Aug', starred: false },
    { id: 4, sender: 'H.M. Kularathne', subject: 'Upgrade the website', date: '15 May', starred: false },
    { id: 5, sender: 'I. Wimalasekara', subject: 'Data free access', date: '19 Feb', starred: false },
    { id: 6, sender: 'K.L. Perera', subject: 'New course registration', date: '15 Jan', starred: false },
    { id: 7, sender: 'A.B. Silva', subject: 'Exam schedule update', date: '10 Jan', starred: false },
    { id: 8, sender: 'R.M. Fernando', subject: 'Holiday notice', date: '5 Jan', starred: false },
    { id: 9, sender: 'S.T. Gunawardena', subject: 'Annual report submission', date: '1 Jan', starred: false },
  ]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-5 left-10 right-10 bg-white shadow z-50 rounded-b-lg">
  <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
    <div className="flex items-center">
    <img 
  src={logo} 
  alt="DTET Logo" 
  className="h-12 mr-4"
/>

    </div>

    <nav className="hidden md:flex space-x-8">
  <a href="#" className="py-2 px-3 text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600">Dashboard</a>
  <a href="#" className="py-2 px-3 text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600">Announcements</a>
  <a href="#" className="py-2 px-3 text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600">Courses</a>
  <a href="#" className="py-2 px-3 text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600">User Accounts</a>
  <a href="#" className="py-2 px-3 text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600">Payments</a>
</nav>


    <div className="flex items-center space-x-4">
      {/* Bell Icon */}
      <button className="text-gray-600 hover:text-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
      </button>

      {/* User Icon */}
      <button className="text-gray-600  hover:text-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </button>
    </div>
  </div>
</header>

{/* Main page content */}
<main className="pt-24">
  {/* Your page content here */}
</main>


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-60  bg-white shadow z-5 rounded-br-extra ">
              {/* Compose Button */}
              <button className="w-full bg-blue-800 text-white rounded-md py-2 px-4 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
                <span>Compose</span>
              </button>

              {/* Sidebar Links */}
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center justify-between py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                      <span className="ml-3">Inbox</span>
                    </div>
                    <span className="text-gray-500">5</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">
                    <div className="flex items-center">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                      </svg>
                       <span className="ml-3">Sent</span>
                    </div>
                   <span className="text-gray-500">10</span>
                </a>
                 </li>

<li>
  <a href="#" className="flex items-center justify-between py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">
    <div className="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
      <span className="ml-3">Draft</span>
    </div>
    <span className="text-gray-500">10</span>
  </a>
</li>
<li>
                  <a href="#" className="flex items-center justify-between py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                      </svg>
                      <span className="ml-3">Starred</span>
                    </div>
                    <span className="text-gray-500">2</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Main Announcements Section */}
            <div className="flex-1 pl-6">
  <div className="relative mb-6">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </div>
    <input
      type="text"
      placeholder="Search announcements"
      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  <div className="space-y-3">
    {announcements.map((announcement) => (
      <div 
        key={announcement.id}
        className="flex items-center bg-blue-100 p-4 rounded-full  cursor-pointer hover:bg-blue-200"
      >
        <div className="flex-shrink-0 mr-2">
          <input type="checkbox" className="rounded text-blue-600" />
        </div>
        <button className="text-blue-600 mx-2">
          ⭐
        </button>
        <div className="w-1/4 font-medium">{announcement.sender}</div>
        <div className="flex-1 text-gray-700">{announcement.subject}</div>
        <div className="text-gray-600">{announcement.date}</div>
      </div>
    ))}
  </div>
</div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default AnnouncementPage;

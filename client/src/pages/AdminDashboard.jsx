import Navbar from "../components/layout/Navbar";
import PendingRequests from "../components/AdminDashboard/PendingRequests";
import UserSummary from "../components/AdminDashboard/UserSummary";
import UserActivities from "../components/AdminDashboard/UserActivities";
import SystemStatus from "../components/AdminDashboard/SystemStatus";
import Footer from "../components/layout/Footer";
import RoleCard from "../components/AdminDashboard/RoleCard";

function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <RoleCard />
            <PendingRequests />
            <UserActivities />
          </div>
          <div>
            <UserSummary />
            <SystemStatus />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;

import Navbar from "../components/layout/Navbar";
/* import Sidebar from "../components/Sidebar"; */
import Table from "../components/layout/Table";

export default function PaperSetterList() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        {/* <Sidebar /> */}
        <Table />
      </div>
    </div>
  );
}

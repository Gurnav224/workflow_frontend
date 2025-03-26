import Sidebar from "../components/Sidebar";
import ProjectDashboard from "../components/dashboard/ProjectDashboard";
import TasksDashboard from "../components/dashboard/TasksDashboard";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-x-scroll">
        <ProjectDashboard />

        {/* Tasks Section */}
        <TasksDashboard />
      </main>
    </div>
  );
};

export default Dashboard;

import Sidebar from "../components/Sidebar";
import ProjectDashboard from "../components/dashboard/ProjectDashboard"

const Projects = () => {


  return (
    <div className="flex">
      <Sidebar />
      <div className="p-5">

      <ProjectDashboard/>
      </div>
    </div>
  );
};

export default Projects;

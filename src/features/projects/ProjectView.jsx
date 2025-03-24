import Sidebar from "../../components/Sidebar"
import ProjectForm from "./ProjectForm"
import ProjectList from "./ProjectList"

const ProjectView = () => {
  return (
    <div className="flex">
       <Sidebar/>
      <ProjectList/>
    </div>
  )
}

export default ProjectView

import ProjectList from "./ProjectList"
import { Link } from "react-router-dom"


const ProjectView = () => {
  
  return (
    <div className="flex">
    <aside className="w-64 bg-purple-100 p-5 min-h-screen py-15">
    <Link to={'/dashboard'} className="border-2 border-blue-500 block py-3 font-semibold px-2 rounded-lg text-blue-600">Back To Dashboard</Link>
    </aside>
      <ProjectList/>
    </div>
  )
}

export default ProjectView

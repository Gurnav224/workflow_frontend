import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addProjectAsync } from "./projectSlice";



const ProjectForm = () => {
    const { error,  status} = useSelector((state) => state.project);
    const dispatch = useDispatch();
    const [project , setProject] = useState({
        name:"",
        description:"",
        status:""
    })

    const handleInputChange = (e) => {
        const { name, value} = e.target;
        setProject((prev) => ({
            ...prev,
            [name]:value
        }))
    }

    const addProject = (e) => {
        e.preventDefault();
        dispatch(addProjectAsync(project))
        setProject({
            name:"",
            description:"",
            status:""
        })
    }

const projectStatus = ["To Do", "In Progress", "Completed", "Blocked"];



  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 my-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Add Project</h1>
    <form method="post" onSubmit={addProject} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={project.name}
          onChange={handleInputChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter project name"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description:
        </label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="4"
          value={project.description}
          onChange={handleInputChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter project description"
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Select Status</label>
        <select 
        value={project.status}
        onChange={handleInputChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
         name="status" id="status">
          {
          projectStatus.map((stat) => (
          <option value={stat}>{stat}</option>
          )  )
          }
        </select>
      </div>
      {status === 'loading' && <p>loading...</p>}
      {error && <p>{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
      >
        Add Project
      </button>
    </form>
  </div>
  
  )
}

export default ProjectForm

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchProject } from "../projects/projectSlice";
import { fetchTeams } from "../team/teamSlice";
import { fetchUsers } from "../auth/authSlice";
import { fetchTags } from "./taskSlice";

const TaskForm = () => {
  const {projects } = useSelector((state) => state.project);
  const {teams } = useSelector((state) => state.team);
  const  {owners , token} = useSelector((state) => state.auth);
  const {tags } = useSelector((state) => state.task);

  console.log(tags)
  

  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(fetchProject())
  },[dispatch])

  useEffect(() => {
    dispatch(fetchTeams())
  },[dispatch])

  useEffect(() => {
    dispatch(fetchUsers(token))
  },[dispatch, token])

  useEffect(() => {
    dispatch(fetchTags(token))
  },[])


  const status = ['To Do' , 'In Progress', 'Completed ', 'Blocked' ]

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200 my-5">
  <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Task</h1>

  <form className="space-y-4">
    {/* Select Project */}
    <div>
      <label htmlFor="project" className="block text-sm font-medium text-gray-700">
        Select Project
      </label>
      <select
        name="project"
        id="project"
        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>

    {/* Task Name */}
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Task Name:
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter task name"
      />
    </div>

    {/* Select Team */}
    <div>
      <label htmlFor="team" className="block text-sm font-medium text-gray-700">
        Select Team
      </label>
      <select
        name="team"
        id="team"
        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        {teams.map((team) => (
          <option key={team._id} value={team._id}>
            {team.name}
          </option>
        ))}
      </select>
    </div>

    {/* Select Owners */}
    <div>
      <label htmlFor="owners" className="block text-sm font-medium text-gray-700">
        Owners
      </label>
      <select
        name="owners"
        id="owners"
        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        {owners.map((owner) => (
          <option key={owner._id} value={owner._id}>
            {owner.name}
          </option>
        ))}
      </select>
    </div>

    {/* Select Tags */}
    <div>
      <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
        Tags:
      </label>
      <select
        name="tags"
        id="tags"
        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        {tags.map((tag) => (
          <option key={tag._id} value={tag._id}>
            {tag.name}
          </option>
        ))}
      </select>
    </div>

    {/* Time To Complete */}
    <div>
      <label htmlFor="timeToComplete" className="block text-sm font-medium text-gray-700">
        Time To Complete (hours)
      </label>
      <input
        type="number"
        name="timeToComplete"
        id="timeToComplete"
        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter estimated time"
      />
    </div>

    {/* Status */}
    <div>
      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
        Status:
      </label>
      <select
        name="status"
        id="status"
        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        {status.map((stat) => (
          <option key={stat} value={stat}>
            {stat}
          </option>
        ))}
      </select>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
    >
      Add Task
    </button>
  </form>
</div>

  )
}

export default TaskForm

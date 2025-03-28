import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../projects/projectSlice";
import { fetchTeams } from "../team/teamSlice";
import { fetchUsers } from "../auth/authSlice";
import { addTaskAsync, fetchTags, fetchTask } from "./taskSlice";
import Select from "react-select";

const TaskForm = () => {
  const { projects } = useSelector((state) => state.project);
  const { teams } = useSelector((state) => state.team);
  const { owners, token } = useSelector((state) => state.auth);
  const { tags } = useSelector((state) => state.task);
  const [newTask, setNewTask] = useState({
    name: "",
    project: "",
    team: "",
    timeToComplete: 0,
    status: "",
    priority:"",
    dueDate:""
  });
  const [selectedOwner, setSelectedOwner] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const dispatch = useDispatch();

  const formatOwners = owners.map((owner) => ({
    value: owner._id,
    label: owner.name,
  }));

  const formatTags = tags.map((tag) => ({
    value: tag.name,
    label: tag.name,
  }));

  const status = ["To Do", "In Progress", "Completed","Closed"];

  useEffect(() => {
    dispatch(fetchUsers(token));
    dispatch(fetchTags(token));
    dispatch(fetchProject());
    dispatch(fetchTask())
    dispatch(fetchTeams());
  }, [dispatch, token]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOwnerChange = (e) => {
    setSelectedOwner(e);
  };

  const handleTagsChange = (e) => {
    setSelectedTags(e);
  };

  const handleAddNewTask = (e) => {
    e.preventDefault();
    const task = {
      ...newTask,
      tags: selectedTags.map((tag) => tag.value),
      owners: selectedOwner.map((owner) => owner.value),
    };

    dispatch(addTaskAsync(task));

    setNewTask({
      name: "",
      project: "",
      team: "",
      timeToComplete: 0,
      status: "",
    });

    setSelectedOwner([])
    setSelectedTags([])
  };

  const priority = ['High', 'Medium', 'Low'];

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Task</h1>

      <form className="space-y-4" onSubmit={handleAddNewTask}>
        {/* Select Project */}
        <div>
          <label
            htmlFor="project"
            className="block text-sm font-medium text-gray-700"
          >
            Project
          </label>
          <select
            name="project"
            id="project"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            onChange={handleInputChange}
            value={newTask.project}
          >
          <option value="">select project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* Task Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Task Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={newTask.name}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter task name"
          />
        </div>

        {/* Select Team */}
        <div>
          <label
            htmlFor="team"
            className="block text-sm font-medium text-gray-700"
          >
            Select Team
          </label>
          <select
            name="team"
            id="team"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={newTask.team}
            onChange={handleInputChange}
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
          <label
            htmlFor="owners"
            className="block text-sm font-medium text-gray-700"
          >
            Owners
          </label>
          <Select
            name="owners"
            value={selectedOwner}
            options={formatOwners}
            onChange={handleOwnerChange}
            isMulti
          />
        </div>

        {/* Select Tags */}
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Tags:
          </label>
          <Select
            name="tags"
            options={formatTags}
            value={selectedTags}
            onChange={handleTagsChange}
            isMulti
          />
        </div>
        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium" htmlFor="dueDate">Due Date</label>
          <input   className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" type="date" name="dueDate" id="dueDate" value={newTask.dueDate} onChange={handleInputChange}  />
        </div>
        {/* Select Priority */}
            <div>
              <label htmlFor="priority">Priority</label>
              <select className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" name="priority" id="priority" onChange={handleInputChange}>
                <option value="">Select</option>
                {
                 priority.map((pri) => (
                  <option value={pri} key={pri}>{pri}</option>
                 ))
                }
              </select>
            </div>
        {/* Time To Complete */}
        <div>
          <label
            htmlFor="timeToComplete"
            className="block text-sm font-medium text-gray-700"
          >
            Time To Complete (hours)
          </label>
          <input
            type="number"
            name="timeToComplete"
            id="timeToComplete"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter estimated time"
            value={newTask.timeToComplete}
            onChange={handleInputChange}
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status:
          </label>
          <select
            name="status"
            id="status"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={newTask.status}
            onChange={handleInputChange}
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
  );
};

export default TaskForm;

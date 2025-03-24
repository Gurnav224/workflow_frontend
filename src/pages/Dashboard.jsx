import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUserAsync, logout, resetStatus } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import { fetchProject } from "../features/projects/projectSlice";
import { fetchTask } from "../features/tasks/taskSlice";
import ProjectForm from "../features/projects/ProjectForm";
import TaskForm from "../features/tasks/TaskForm";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.project);
  const { tasks , error, } = useSelector((state) => state.task);
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status") || ""
 
  console.log(error)

  const newParams = new URLSearchParams(searchParams);



  const [projectModal, setProjectModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [filterVisible, setFitlerVisible] = useState(false);

  const taskStatus = ["To Do", "In Progress", "Completed", "Blocked"];

  useEffect(() => {
    dispatch(authUserAsync(token));
    dispatch(fetchProject());
    dispatch(fetchTask());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(resetStatus());
    toast.success("Logged out successfully");
    dispatch(logout());
  };




  const handleSearchParams = (e) => {
    const {value} = e.target;
    if(value){
      newParams.set('status', value)
     }
     else{
      newParams.delete('status')
     }
    setSearchParams(newParams)
  };

  useEffect(() => {
    dispatch(fetchTask(status))
  },[status]) 


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-x-scroll">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-lg py-2 px-4 w-96 focus:ring-2 focus:ring-purple-300"
            />
          </div>
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Logout
          </button>
        </div>

        {/* Projects Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Projects</h2>
            <button
              onClick={() => setProjectModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              + New Project
            </button>
          </div>
          {projectModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-300 opacity-95">
              <div className="bg-white rounded-lg w-4xl p-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Create new Project</h3>
                  <button
                    className="font-bold text-xl"
                    onClick={() => setProjectModal(false)}
                  >
                    X
                  </button>
                </div>
                <ProjectForm />
              </div>
            </div>
          )}
          <div className="grid grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white p-4 shadow-md rounded-lg"
              >
                <span
                  className={`text-xs px-2 py-1 rounded-md ${
                    project.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {project.status}
                </span>
                <h3 className="text-lg font-semibold mt-2">{project.name}</h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tasks Section */}
        <section className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-3">
              <h2 className="text-lg font-semibold">My Tasks</h2>
              <button onClick={() => setFitlerVisible((prev) => !prev)}>
                Filters
              </button>
            </div>

            <button
              onClick={() => setTaskModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              + New Task
            </button>
          </div>

          {/* Filter section */}
          <div>
            {filterVisible && (
              <div className="flex gap-3 my-3">
                <p>Quick Filters</p>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <select
                    onChange={handleSearchParams}
                    className="w-full my-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    name="status"
                    id="status"
                  >
                  <option  value="">select</option>
                                      {taskStatus.map((stat) => (
                      <option key={stat} value={stat}>{stat}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {taskModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-300 opacity-90">
              <div className="bg-white rounded-lg w-4xl  p-6">
                <div className="flex justify-between items-center ">
                  <h3 className="font-medium">Create new Task</h3>
                  <button
                    className="font-bold text-xl"
                    onClick={() => setTaskModal(false)}
                  >
                    X
                  </button>
                </div>
                <TaskForm />
              </div>
            </div>
          )}
          <div className="grid grid-cols-3 gap-4">
          {error && <p>{error}</p>}
            {tasks.map((task) => (
              <div key={task._id} className="bg-white p-4 shadow-md rounded-lg">
                <span
                  className={`text-xs px-2 py-1 rounded-md ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {task.status}
                </span>
                <h3 className="text-lg font-semibold my-1">{task.name}</h3>
                <p className="text-gray-600 text-sm">
                  Time To Complete:{" "}
                  <span className="font-bold">{task.timeToComplete} days</span>{" "}
                </p>
                <div className="flex items-center mt-2">
                  <div className="flex -space-x-2 my-1">
                    {task.owners.map((owner) => (
                      <span
                        key={owner.name}
                        className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-md"
                      >
                        👤 {owner.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

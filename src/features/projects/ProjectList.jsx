import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags, fetchTask } from "../tasks/taskSlice";
import { fetchUsers } from "../auth/authSlice";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchProjectById, sortHighToLow, sortLowToHigh, sortNewestByDate, sortOldestByDate } from "./projectSlice";
import TaskForm from "../tasks/TaskForm";
import moment from "moment";

const ProjectList = () => {
  const dispatch = useDispatch();

  const { tags } = useSelector((state) => state.task);
  const { project, status, error } = useSelector((state) => state.project);
  const { owners, token } = useSelector((state) => state.auth);
  const [isVisible, setIsVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { projectId } = useParams();
  const [taskModal, setTaskModal] = useState(false);

  const newParams = new URLSearchParams(searchParams);

  const owner = searchParams.get("owners") || "";
  const tag = searchParams.get("tags") || "";

  useEffect(() => {
    dispatch(fetchUsers(token));
    dispatch(fetchTags());
    dispatch(fetchTask());
  }, [dispatch, token]);

  useEffect(() => {
    if (projectId) {
      dispatch(
        fetchProjectById(`projectId=${projectId}&owners=${owner}&tags=${tag}`)
      );
    }
  }, [dispatch, owner, projectId, tag ]);

  const handleOwnerChange = (e) => {
    const { value } = e.target;
    if (value) {
      newParams.set("owners", value);
    } else {
      newParams.delete("owners");
    }
    setSearchParams(newParams);
  };

  const handleTagChange = (e) => {
    const { value } = e.target;
    if (value) {
      newParams.set("tags", value);
    } else {
      newParams.delete("tags");
    }
    setSearchParams(newParams);
  };

  const priorityLowToHigh = () => {
    dispatch(sortLowToHigh());
  };

  const priorityHighToLow = () => {
    dispatch(sortHighToLow());
  };

  const getNewest = () => {
    dispatch(sortNewestByDate())
  };

  const getOldest = () => {
    dispatch(sortOldestByDate())
  }




  return (
    <div className="p-6 w-full">
      <div className=" mx-auto p-6 bg-white rounded-lg shadow">
        {status === "loading" && <p className="text-gray-500">Loading...</p>}

        <div className="mb-4">
          <h1 className="text-2xl font-bold">{project?.project?.name}</h1>
          <p className="text-lg font-normal my-1">
            {project?.project?.description}
          </p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="space-x-2">
            <button>Sort By:</button>
            <button
              onClick={priorityLowToHigh}
              className="border rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
            >
              Priority: Low-High
            </button>
            <button
              onClick={priorityHighToLow}
              className="border rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
            >
              Priority: High-Low
            </button>
            <button
              onClick={getNewest}
              className="border rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
            >
              Newest First
            </button>
            <button onClick={getOldest} className="border rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
              Oldest First
            </button>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setIsVisible((prev) => !prev)}
              className="border rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
            >
              Filter
            </button>
            <button onClick={() => setTaskModal(true)} className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700">
              + New Task
            </button>
          </div>
        </div>

        {isVisible && (
          <div className="flex gap-3">
            <div className="my-2">
              <label htmlFor="owners" className="block font-medium">
                owners
              </label>
              <select
                onChange={handleOwnerChange}
                name="owners"
                id="owners"
                className="p-2 border rounded-lg "
              >
                <option value="">select owner</option>
                {owners.map((owner) => (
                  <option key={owner._id} value={owner._id}>
                    {owner.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-2">
              <label htmlFor="tags" className="block font-medium">
                Tags
              </label>
              <select
                onChange={handleTagChange}
                name="tags"
                id="tags"
                className="p-2 border rounded-lg"
              >
                <option value="">select tag</option>
                {tags.map((tag) => (
                  <option key={tag.name} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {status === "loading" && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}



        {taskModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-300 opacity-90 ">
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

        <div className="overflow-hidden border rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr className="text-gray-700">
                <th className="px-4 py-2">TASKS</th>
                <th className="px-4 py-2">OWNER</th>
                <th className="px-4 py-2">TAGS</th>
                <th className="px-4 py-2">TEAM</th>
                <th className="px-4 py-2">PRIORITY</th>
                <th className="px-4 py-2">DUE DATE</th>
                <th className="px-4 py-2">TIME TO COMPLETE</th>
                <th className="px-4 py-2">STATUS</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            {/* Project Specific View  */}
            <tbody>
              {project && project?.tasks?.length <= 0 && (
                <tr className="border-b hover:bg-gray-100">
                  <td className="px-4 py-3">No Task found</td>
                </tr>
              )}
              {project?.tasks?.map((task) => (
                <tr key={task._id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-3">{task.name}</td>
                  <td className="px-4 py-3">
                    <div>
                      {task.owners.map((owner) => (
                        <p
                          key={owner._id}
                          className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 my-1 rounded-md flex gap-2"
                        >
                          👤 <span>{owner.name}</span>
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      {task.tags.map((tag) => (
                        <p
                          key={tag}
                          className="bg-blue-100 text-blue-600 text-xs px-2 py-1 my-1 rounded-md flex gap-2"
                        >
                          <span>{tag}</span>
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">{task.team.name}</td>
                  <td className="px-4 py-3">{task.priority}</td>
                  <td className="px-4 py-3">
                    {moment(task.dueDate).format("lll")}
                  </td>
                  <td className="px-4 py-3">{task.timeToComplete} Days</td>
                  <td className="px-4 py-3">
                    {task.status === "In Progress" && (
                      <span className="bg-yellow-100 text-yellow-500  text-xs font-medium px-2 py-1 rounded">
                        {task.status}
                      </span>
                    )}
                    {task.status === "Completed" && (
                      <span className="bg-green-100 text-green-500  text-xs font-medium px-2 py-1 rounded">
                        {task.status}
                      </span>
                    )}
                    {task.status === "To Do" && (
                      <span className="bg-blue-100  text-blue-500  text-xs font-medium px-2 py-1 rounded">
                        {task.status}
                      </span>
                    )}
                    {task.status === "Blocked" && (
                      <span className="bg-red-100  text-red-500  text-xs font-medium px-2 py-1 rounded">
                        {task.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">→</td>
                </tr>
              ))}
            </tbody>
            {/* All Tasks View */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags, fetchTask } from "../tasks/taskSlice";
import { fetchUsers } from "../auth/authSlice";
import { useSearchParams } from "react-router-dom";

const ProjectList = () => {
  const { tasks, status, error , tags} = useSelector((state) => state.task);
  const { owners, token } = useSelector((state) => state.auth);
  const [isVisible, setIsVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const newParams = new URLSearchParams(searchParams);

  const owner = searchParams.get('owner') || '';
  const tag = searchParams.get('tag') || '';


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTask());
    dispatch(fetchUsers(token));
    dispatch(fetchTags())
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTask(`owner=${owner}&tag=${tag}`))
  },[owner, tag])

  


  const handleOwnerChange = (e) => {
    const { value } = e.target;
    if (value) {
      newParams.set("owner", value);
    } else {
      newParams.delete("owner");
    }
    setSearchParams(newParams);
  };

  const handleTagChange = (e) => {
    const {value} = e.target;
    if(value) {
      newParams.set('tag', value)
    }
    else{
      newParams.delete('tag')
    }
    setSearchParams(newParams)
  }

  return (
    <div className="p-6">
     
   

      <div className=" mx-auto p-6 bg-white rounded-lg shadow">
        <div className="mb-4">
          <h1 className="text-xl font-bold">WorkFlow Projects</h1>
          <p className="text-gray-500 text-sm">
            This project centers around compiling a digital moodboard to set the
            visual direction and tone for a new brand identity. The moodboard
            will showcase a curated selection of images, color palettes,
            typography samples, textures, and layout inspirations.
          </p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="space-x-2">
          <button>Sort By:</button>
            <button className="border rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
              Due Date
            </button>
            <button className="border rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
              Priority
            </button>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setIsVisible((prev) => !prev)}
              className="border rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
            >
              Filter
            </button>
            <button className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700">
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
              <label htmlFor="tags" className="block font-medium">Tags</label>
              <select onChange={handleTagChange} name="tags" id="tags" className="p-2 border rounded-lg">
               <option value="">select tag</option>
                  {
                  tags.map((tag) => (
                    <option key={tag.name} value={tag.name}>{tag.name}</option>
                  ))
                  }
              </select>
            </div>
          </div>
        )}
        {status === "loading" && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-hidden border rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr className="text-gray-700">
                <th className="px-4 py-2">TASKS</th>
                <th className="px-4 py-2">OWNER</th>
                <th className="px-4 py-2">TAGS</th>
                <th className="px-4 py-2">TIME TO COMPLETE</th>
                <th className="px-4 py-2">STATUS</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-3">{task.name}</td>
                  <td className="px-4 py-3">
                    <div>
                      {task.owners.map((owner) => (
                        <p
                          key={owner.name}
                          className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 my-1 rounded-md"
                        >
                          👤 {owner.name}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-red-100  text-xs font-medium px-2 py-1 rounded">
                      {task.tags.join(" , ")}
                    </span>
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;

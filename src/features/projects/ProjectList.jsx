import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "./projectSlice";

const ProjectList = () => {
  const { projects, status, error } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Project List</h1>
  
    {status === "loading" && <p className="text-gray-500">Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}
  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project._id}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          <h2 className="text-lg font-semibold">{project.name}</h2>
          <p className="text-gray-600">{project.description}</p>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default ProjectList;

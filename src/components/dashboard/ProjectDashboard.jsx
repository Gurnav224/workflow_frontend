import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import { fetchProject } from "../../features/projects/projectSlice";
import _ from "lodash";
import { Link } from "react-router-dom";
import ProjectForm from "../../features/projects/ProjectForm";

const ProjectDashboard = () => {
  const [projectModal, setProjectModal] = useState(false);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const {
    projects,
    status: loading,
    error: projectError,
  } = useSelector((state) => state.project);

  const debouncedSearch = useMemo(
    () =>
      _.debounce((query) => {
        dispatch(fetchProject(`name=${query}`));
      }, 500),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-lg py-2 px-4 w-96 focus:ring-2 focus:ring-purple-300"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
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
        {projectError && <p>No Project Found</p>}
        {loading === "loading" && <p>loading........</p>}

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
              <Link
                className="bg-transparent border-2 border-blue-500 text-blue-500 px-4 py-2 my-2 rounded-lg inline-block"
                to={`/project/${project._id}`}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProjectDashboard;

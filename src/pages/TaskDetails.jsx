import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchTaskById, updateTaskById } from "../features/tasks/taskSlice";
import moment from "moment";

const TaskDetails = () => {
  const { task, error, status } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const { taskId } = useParams();




  const handleUpdateTask = () => {
    dispatch(updateTaskById(taskId));
  };

  useEffect(() => {
    dispatch(fetchTaskById(taskId));

  }, [dispatch, taskId ]);

  return (
    <div className="flex">
      <aside className="w-64 bg-purple-100 p-5 min-h-screen py-15">
        <Link
          to={"/dashboard"}
          className="border-2 border-blue-500 block py-3 font-semibold px-2 rounded-lg text-blue-600 text-center"
        >
          Back To Dashboard
        </Link>
      </aside>
      <section className="p-6 w-full mx-4">
        <h1 className="text-4xl  font-semibold py-3">Task {task.name}</h1>
        {status === "loading" && <p>loading.....</p>}
        {error && <p>error occured , fetch task by id</p>}
        <div className="w-full">
          <h3 className="text-xl font-semi-bold">Task Details</h3>
          <p className="py-1 font-medium">
            Project Name: { task?.project?.name}{" "}
          </p>
          <p className="py-1 font-medium">
            Team: {task?.team?.name}
          </p>
          <p className="py-1 font-medium">
            Owners: {task?.owners && task?.owners?.map((owner) => owner?.name)}{" "}
          </p>
          <p className="py-1 font-medium">
            Tags: {task?.tags?.join(", ")}
          </p>
          <p className="py-1 font-medium">
            Due Date: {moment(task?.dueDate).format("llll")}{" "}
          </p>
          <p className="py-1 font-medium">Priority: {task?.priority} </p>
          <hr />
          <p className="py-1 font-medium">Status: {task?.status}</p>
          <p className="py-1 font-medium">
            Remaining Days: {task?.timeToComplete} Days
          </p>
          <button
            onClick={handleUpdateTask}
            className="border-2 py-3 px-4 rounded-lg border-blue-500 text-blue-500 font-medium hover:text-white hover:bg-blue-500 "
          >
            Mark as Completed
          </button>
        </div>
      </section>
    </div>
  );
};

export default TaskDetails;

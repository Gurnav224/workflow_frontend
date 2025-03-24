import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchTask } from "./taskSlice";

const TaskList = () => {
  const { tasks , status, error} = useSelector((state) => state.task);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchTask())
  },[dispatch , tasks.length])

  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      {status === "loading" && <p className="text-gray-500">Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          <h2 className="text-lg font-semibold">{task.name}</h2>
          <p>Project:  {task.project.name}</p>
          <p>Team Members {task.owners.map((owner) => owner.name)}</p>
          <p>Team: {task.team.name}</p>
          <p>{task.status}</p>
          <p>Time To Complete: {task.timeToComplete} Days</p>
        </div>
      ))}
    </div>
        </div>
  )
}

export default TaskList

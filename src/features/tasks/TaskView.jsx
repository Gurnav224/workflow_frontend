import Sidebar from "../../components/Sidebar"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"

const TaskView = () => {
  return (
    <div className="flex">
      <Sidebar/>
      <TaskForm/>
      <TaskList/>
    </div>
  )
}

export default TaskView

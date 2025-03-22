import Header from "./components/Header";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./components/PrivateRoutes";
import Dashboard from "./pages/Dashboard";
import ProjectView from "./features/projects/ProjectView";
import TeamView from "./features/team/TeamView";
import TaskView from "./features/tasks/TaskView";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/project"
          element={
            <PrivateRoutes>
              <ProjectView />
            </PrivateRoutes>
          }
        />
        <Route
          path="/team"
          element={
            <PrivateRoutes>
              <TeamView />
            </PrivateRoutes>
          }
        />
        <Route
           path="/task"
           element={
            <PrivateRoutes>
              <TaskView/>
            </PrivateRoutes>
           }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

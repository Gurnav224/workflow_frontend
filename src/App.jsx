import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./components/PrivateRoutes";
import Dashboard from "./pages/Dashboard";
import ProjectView from "./features/projects/ProjectView";
import TeamView from "./features/team/TeamView";
import TaskView from "./features/tasks/TaskView";
import Projects from "./pages/Projects";
import TaskDetails from "./pages/TaskDetails";
import Report from "./pages/Report";
import TeamDeatils from "./features/team/TeamDetails";

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
              <Projects/>
            </PrivateRoutes>
          }
        />
        <Route
        path="/project/:projectId"
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
        <Route
        path="/task/:taskId"
        element={
          <PrivateRoutes>
            <TaskDetails/>
          </PrivateRoutes>
        }
        />
        <Route
        path="/reports"
        element={
          <PrivateRoutes>
            <Report/>
          </PrivateRoutes>
        }
        />
          <Route
        path="/teams/:teamId"
        element={
          <PrivateRoutes>
            <TeamDeatils/>
          </PrivateRoutes>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

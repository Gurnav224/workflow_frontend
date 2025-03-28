import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTask } from "../features/tasks/taskSlice";
import moment from "moment";
import { fetchProject } from "../features/projects/projectSlice";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

const Report = () => {
  const { tasks, error, status } = useSelector((state) => state.task);
  const { projects } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTask());
    dispatch(fetchProject());
  }, []);

  const todayDate = new Date();
  const onWeekAgo = new Date();

  onWeekAgo.setDate(todayDate.getDate() - 7);

  const taskCompletedInWeek = tasks?.filter(
    (task) =>
      task.status === "Completed" &&
      moment(task.updatedAt).isSameOrAfter(onWeekAgo)
  );

  const totalDaysOfPendingWork = tasks.reduce(
    (total, task) => total + task.timeToComplete,
    0
  );

  const totalNumberOfClosedTeam = tasks.filter(
    (task) => task.status === "Closed"
  );

  const totalNumberOfClosedByOwner = projects.filter(
    (project) => project.status === "Closed"
  );

  const barChartData = {
    labels: ["Tasks Completed", "Closed By Team", "Closed By Owner"],
    datasets: [
      {
        label: "Work Report",
        data: [
          taskCompletedInWeek.length,
          totalNumberOfClosedTeam.length,
          totalNumberOfClosedByOwner.length,
        ],
        backgroundColor: ["#10B981", "#F59E0B", "#3B82F6", "#8B5CF6"],
        borderColor: ["#059669", "#D97706", "#2563EB", "#6D28D9"],
        borderWidth: 2,
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Work Status",
        data: [taskCompletedInWeek.length, totalDaysOfPendingWork],
        backgroundColor: ["#10B981", "#F59E0B"],
        borderWidth: 1,
      },
    ],
  };

  const pendingWorkTrend = tasks.map((task) => task.timeToComplete);

  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"],
    datasets: [
      {
        label: "Pending Work Days",
        data: pendingWorkTrend,
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        borderWidth: 2,
        pointBackgroundColor: "#F59E0B",
        pointBorderColor: "#fff",
        fill: true,
        filter: true,
        tension: 0.4, // Adds smooth curves
      },
    ],
  };

  const totalPendingWorkData = {
    label: ["Total Pending Work (Days)"],
    datasets: [
      {
        label: "Total  Days",
        data: [totalDaysOfPendingWork],
        backgroundColor: "#3B82F6",
        borderColor: "#2563EB",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

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
      <section className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Report Overview
        </h1>

        {/* Loading State */}
        {status === "loading" && (
          <p className="text-blue-600 dark:text-blue-400 font-medium">
            Loading...
          </p>
        )}

        {/* Error State */}
        {error && (
          <p className="text-red-600 dark:text-red-400 font-medium">
            Error generating report.
          </p>
        )}

        {/* Chart Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
          {/* Bar Chart */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow h-fit">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
              Team and Owner Overview
            </h2>
            <Bar data={barChartData} />
          </div>

        
          {/* Pending Chart By Weekly */}

          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow h-fit">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
              Pending Work Overview
              <Line data={lineChartData} />
            </h2>
          </div>

            {/* Doughnut Chart */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow h-fit">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
              Work Completion Status
            </h2>
            <Doughnut data={doughnutChartData} />
          </div>

          {/* Pending Work Chart Total Days */}

          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
              Total Pending Work
            </h2>
            <Doughnut data={totalPendingWorkData} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Report;

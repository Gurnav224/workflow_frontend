import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "./teamSlice";

const TeamList = () => {
  const { error, status, teams } = useSelector((state) => state.team);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Team List</h1>

      {status === "loading" && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-lg font-semibold">{team.name}</h2>
            <p className="text-gray-600">{team.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;

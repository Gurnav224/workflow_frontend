import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "./teamSlice";
import TeamForm from "./TeamForm";
import { Link } from "react-router-dom";

const TeamList = () => {
  const { error, status, teams } = useSelector((state) => state.team);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);
  return (
    <div className="p-6 w-7xl mx-auto my-14">
      <div className="flex justify-between items-center my-2">
        <h1 className="text-2xl font-bold mb-4">Team List</h1>

        <button
          onClick={() => setIsVisible((prev) => !prev)}
          className="bg-blue-500 py-2 rounded-md px-3 text-white font-medium"
        >
          + New Team
        </button>
      </div>

      {isVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-300 opacity-90 ">
          <div className="bg-white rounded-lg w-xl  p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium">Create new Team</h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-3xl border-2 w-16 h-16 py-3 px-3 rounded-full  font-black"
              >
                X
              </button>
            </div>
            <TeamForm />
          </div>
        </div>
      )}

      {status === "loading" && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{team.name}</h2>
                <p className="text-gray-600">{team.description}</p>
              </div>
              <Link to={`/teams/${team._id}`} className="underline text-blue-500 text-xl">Details</Link>
            </div>

            <div>
              {team.members.map((member) => (
                <p className="my-1 text-blue-500" key={member._id}>
                  {member?.memberName}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;

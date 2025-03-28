import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeamAsync } from "./teamSlice";

const TeamForm = () => {
  const { status, error } = useSelector((state) => state.team);
  const dispatch = useDispatch();

  const [team, setTeam] = useState({
    name: "",
    description: "",
  });
  const [member1, setMember1] = useState({});
  const [member2, setMember2] = useState({});
  const [member3, setMember3] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeam((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTeam = (e) => {
    e.preventDefault();
    // dispatch(addTeamAsync(team));

    const newTeam = { ...team, members: [member1, member2, member3] };

    dispatch(addTeamAsync(newTeam));

    setTeam({
      name: "",
      description: "",
    });

    setMember1("");
    setMember2("");
    setMember3("");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-md my-6 rounded-lg ">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Team Form</h1>
      <form method="post" className="space-y-4" onSubmit={addTeam}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter team name"
            value={team.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="4"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter team description"
            value={team.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="member1"
          >
            Member 1
          </label>
          <input
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="memberName"
            id="member1"
            value={member1.memberName || ""}
            onChange={(e) => setMember1({ memberName: e.target.value })}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="member2"
          >
            Member 2
          </label>
          <input
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="memberName"
            id="member2"
            value={member2.memberName || ""}
            onChange={(e) => setMember2({ memberName: e.target.value })}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="member1"
          >
            Member 3
          </label>
          <input
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="memberName"
            id="member3"
            value={member3.memberName || ""}
            onChange={(e) => setMember3({ memberName: e.target.value })}
          />
        </div>
        {status === "loading" && <p>loading...</p>}
        {error && <p>{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Add Team
        </button>
      </form>
    </div>
  );
};

export default TeamForm;

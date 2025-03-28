import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewMemberAsync, fetchTeamById } from "./teamSlice";

const TeamDeatils = () => {
  const { teamId } = useParams();
  const { team , status, error } = useSelector((state) => state.team);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [newMember , setNewMember] = useState({});



  const handleAddMember = (e) => {
    e.preventDefault();
    dispatch(addNewMemberAsync({teamId, newMember}))
    setNewMember({})
    setTimeout(() => {
      dispatch(fetchTeamById(teamId));
    },1000)
  }

  useEffect(() => {
    dispatch(fetchTeamById(teamId));
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Title */}

        <div className="flex justify-between  items-center py-3">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Team Details
          </h1>

          <button
            onClick={() => setIsVisible(true)}
            className="bg-blue-500  py-3 px-2 rounded-lg text-gray-100 font-semibold"
          >
            + Add Member
          </button>
        </div>

        {status === 'loading' && <p>loading..........</p>}
        {error &&  <p>{error}</p>}

        {/* Divider */}
        <hr className="mb-4 border-gray-300" />

        {/* Team Information */}
        <div className="mb-4">
          <h2 className="text-xl font-medium text-gray-700">
            Team Name:{" "}
            <span className="font-semibold text-gray-900">{team.name}</span>
          </h2>
          <p className="text-gray-600 mt-1">
            <span className="font-medium text-gray-700">Description:</span>{" "}
            {team.description}
          </p>
        </div>

        {isVisible && (
          <div className="fixed inset-0 flex justify-center items-center  bg-gray-300 opacity-90">
            <div className="bg-white p-5 w-xl ">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-medium">Add New Member</h1>
              <button onClick={() => setIsVisible(false)}>close</button>
            </div>
            <form onSubmit={handleAddMember}>
              <div className="py-3">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="member"
                >
                  Member 
                </label>
                <input
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  name="memberName"
                  id="member"
                  onChange={(e) => setNewMember({memberName:e.target.value})}
                  value={newMember.memberName || ''}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Add Member
              </button>
            </form>
            </div>
          </div>
        )}

        {/* Members List */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Members</h3>
          <ul className="space-y-2">
            {team?.members?.map((member) => (
              <li
                key={member._id}
                className="p-2 bg-gray-100 rounded-lg text-gray-800 flex items-center"
              >
                <span className="font-medium">{member.memberName}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamDeatils;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addTeamAsync } from "./teamSlice";

const TeamForm = () => {
    const { status, error } = useSelector((state) => state.team);
    const dispatch = useDispatch();

    const [team , setTeam] = useState({
        name:"",
        description:""
    })

    const handleInputChange = (e) => {
        const { name, value} = e.target;
        setTeam((prev) => ({
            ...prev,
            [name]:value
        }))
    }

    const addTeam = (e) => {
        e.preventDefault();
        dispatch(addTeamAsync(team))

        setTeam({
            name:"",
            description:""
        })
    }


  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-md my-6 rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Team Form</h1>
      <form method="post"  className="space-y-4" onSubmit={addTeam}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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
      {status === 'loading' && <p>loading...</p>}
      {error && <p>{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
      >
        Add Project
      </button>
    </form>
    </div>
  )
}

export default TeamForm

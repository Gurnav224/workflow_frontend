import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetStatus, signupAsync } from "./authSlice";
import { Link,  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const { status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if(newUser.name !== '' && newUser.email !== '' && newUser.password !== ''){

      dispatch(signupAsync(newUser));
    }

    else{

      toast.error('Please fill all necessary input before submit')
    }
   
  };


  useEffect(() => {
    if (status === "failed") {
      toast.error(error);
    }
    if (status === "success") {
      toast.success("user register successfully");
      navigate('/login')
      dispatch(resetStatus())
    }
  }, [dispatch, error, navigate, status]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Sign up
        </h1>
        <form method="post" onSubmit={formSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="eg: john doe"
              value={newUser.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={newUser.email}
              onChange={handleInputChange}
              placeholder="eg: johndoe@gmail.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={newUser.password}
              onChange={handleInputChange}
              placeholder="pass@123"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Sign up
          </button>
          <p>
            If you have already an account <Link className="text-blue-600 underline" to="/login">Login Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

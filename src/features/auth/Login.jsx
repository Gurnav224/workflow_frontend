import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAsync, resetStatus } from "./authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const { status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const login = (e) => {
    e.preventDefault();
    if (user.email !== "" && user.password !== "") {
      dispatch(loginAsync(user));
    } else {
      toast.error("email and password are required");
    }
  };

  useEffect(() => {
    if (status === "failed") {
      toast.error(error);
    }

    if (status === "success") {
      toast.success("login successfully");
      navigate("/dashboard");
      dispatch(resetStatus());
    }
  }, [dispatch, error, navigate, status]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login{" "}
        </h1>
        <form method="post" className="space-y-4" onSubmit={login}>
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
              placeholder="eg: johndoe@gmail.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={user.email}
              onChange={handleInputChange}
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
              placeholder="pass@123"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login
          </button>
          <p>
            If you have not account <Link className="text-blue-600 underline" to={"/"}>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter The Email"
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter The Password"
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Not registered?{" "}
            <Link className="text-blue-400 hover:underline" to={"/Register"}>
              SignUp
            </Link>
          </p>
        </div>
      </div>
      
    </div>
  );
}

export default Login;

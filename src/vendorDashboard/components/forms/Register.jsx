import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { ThreeCircles } from 'react-loader-spinner';

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Vendor registered successfully");
        showLoginHandler();
      } else {
        setError(data.error);
        console.log(data.error)
        alert("Registration Failed, Contact Admin");
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-100">
      {loading && (
        <div className="absolute flex flex-col items-center">
          <ThreeCircles
            visible={loading}
            height={100}
            width={100}
            color="#4fa94d"
            ariaLabel="three-circles-loading"
          />
          <p className="mt-4 text-gray-700">Hi, Your Registration is under process</p>
        </div>
      )}

      {!loading && (
        <form
          className="bg-white p-6 rounded shadow-md w-96"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h3 className="text-2xl font-bold mb-4 text-center">
            Vendor Register
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <span
                className="absolute right-3 top-2 cursor-pointer text-sm text-blue-500"
                onClick={handleShowPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded py-2 font-medium hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;

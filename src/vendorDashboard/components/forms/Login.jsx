import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { ThreeCircles } from 'react-loader-spinner';

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Login success');
        setEmail('');
        setPassword('');
        localStorage.setItem('loginToken', data.token);
        
      }
      console.log(data.vendorId);
      localStorage.setItem('vendorId', data.vendorId);

      
      console.log(data.vendorId)
      const vendorId = data.vendorId;
        console.log('checking for VendorId:', vendorId);
        const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
        
        console.log(data.vendorId)
        const vendorData = await vendorResponse.json();
        console.log(vendorData)
        
        console.log(vendorResponse.ok)
        if (vendorResponse.ok) {
          const vendorFirmId = vendorData.vendorFirmId;
         const vendorFirmName = vendorData.Vendor.firm[0].firmName;
          localStorage.setItem('firmId', vendorFirmId);
          localStorage.setItem('firmname', vendorFirmName);
          }
          window.location.reload()
    } catch (error) {
      console.log(error)
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {loading && (
        <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg">
          <ThreeCircles
            visible={loading}
            height={100}
            width={100}
            color="#4fa94d"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p className="mt-4 text-lg">Login in process... Please wait</p>
        </div>
      )}

      {!loading && (
        <form
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
          onSubmit={loginHandler}
          autoComplete="off"
        >
          <h3 className="text-2xl font-semibold text-center mb-6">Vendor Login</h3>

          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <br />
          <label className="block text-sm font-medium text-gray-700 mt-4">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            className="text-sm text-blue-500 cursor-pointer mt-2 inline-block"
            onClick={handleShowPassword}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const { data } = await axios.post(
        "http://localhost:6001/api/auth/login",
        formData
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      alert("Login Successful");

      navigate("/");

    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">

      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <form
        onSubmit={handleLogin}
        className="space-y-4"
      >

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded w-full"
        >
          Login
        </button>

      </form>
    </div>
  );
};

export default Login;
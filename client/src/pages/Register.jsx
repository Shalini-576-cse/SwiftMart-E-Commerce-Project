import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      const { data } = await axios.post(
        "http://localhost:6001/api/auth/register",
        formData
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      alert("Registration Successful");

      navigate("/");

    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">

      <h1 className="text-3xl font-bold mb-6">
        Register
      </h1>

      <form
        onSubmit={handleRegister}
        className="space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

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
          Register
        </button>

      </form>
    </div>
  );
};

export default Register;
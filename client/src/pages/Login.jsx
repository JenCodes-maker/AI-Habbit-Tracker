import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

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

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        formData
      );

      console.log(res.data);

      localStorage.setItem(
  "token",
  res.data.token
);

      localStorage.setItem(
  "userId",
  res.data._id
);

localStorage.setItem(
  "userName",
  res.data.name
);

      // alert("Login Successful 🔥");

      navigate("/dashboard");

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        "Something went wrong"
      );

    }
  };

  return (
    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-8 rounded-2xl w-96"
      >

        <h1 className="text-3xl mb-5">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-3 rounded bg-black/20"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-3 rounded bg-black/20"
        />

        <button
          type="submit"
          className="bg-cyan-500 px-5 py-2 rounded w-full"
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;
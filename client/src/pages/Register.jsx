import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Button clicked");

    try {

      const res = await API.post(
        "/auth/register",
        formData
      );

      console.log(res.data);

      // alert("Registration Successful 🔥");
      navigate("/login");

    } catch (error) {

  console.log(error);

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
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 mb-3 rounded bg-black/20"
        />

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
          className="bg-cyan-500 px-5 py-2 rounded w-full"
        >
          Register
        </button>

      </form>

    </div>
  );
};

export default Register;
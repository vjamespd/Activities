import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      console.log("Registration successful:", res.data); // Log successful registration
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err); // Log error details
    }
  };

  return (
    <div className="mt-4">
      {" "}
      <h2 className="text-center">Register</h2>{" "}
      <form onSubmit={handleSubmit} className="my-4">
        {" "}
        <div className="form-group">
          {" "}
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />{" "}
        </div>{" "}
        <div className="form-group">
          {" "}
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />{" "}
        </div>{" "}
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>{" "}
      </form>{" "}
    </div>
  );
};

export default Register;

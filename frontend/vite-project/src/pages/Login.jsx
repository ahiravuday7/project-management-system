import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    console.log("this is handle submit call");
    e.preventDeafault();
    setError("");

    try {
      console.log("this is try block");
      const res = await api.post("/auth/login", { email, password });
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));

      // navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

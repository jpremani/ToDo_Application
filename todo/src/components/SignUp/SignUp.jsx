import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || {};
    if (existingUsers[username]) {
      setError("Username already exists");
      return;
    }

    const newUser = { username, password };
    const updatedUsers = { ...existingUsers, [username]: newUser };
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setError("");
    setUsername("");
    setPassword("");
    alert("User signed up successfully!");
    navigate("/login");
  };

  return (
    <div className="SignUp">
      <form>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignup}>Sign Up</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;

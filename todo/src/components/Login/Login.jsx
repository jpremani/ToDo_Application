import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || {};
    const user = users[username];

    if (!user || user.password !== password) {
      setError("Invalid username or password");
      return;
    }

    dispatch(add(username));
    navigate("/todo");
  };

  return (
    <div className="Login">
      <form>
        <h2>Login</h2>
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
        <Link to="/signup">Sign up here</Link>
        <button onClick={handleLogin}>Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../redux/reducers/todoSlice";
import "./TaskInput.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const TaskInput = () => {
  const navigate = useNavigate();
  const [todo, setToDo] = useState({
    task: "",
    priority: "",
    activity: "",
    location: "",
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userName = user.length > 0 ? user[0] : null;
  console.log(userName);

  function handleChange(e) {
    setToDo({
      ...todo,
      task: e.target.value,
    });
  }

  function handlePriority(e) {
    setToDo({
      ...todo,
      priority: e.target.value,
    });
  }

  const handleActivity = (e) => {
    setToDo({
      ...todo,
      activity: e.target.value,
    });
  };
  const handleLocation = (e) => {
    setToDo({
      ...todo,
      location: e.target.value,
    });
  };

  const addData = async (e) => {
    e.preventDefault();
    if (!userName) {
      navigate("/login");
    }
    const apiKey = "76377a30bc596bf0c9eb8ab4afc30550";
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${todo.location}&appid=${apiKey}`
    );
    const weatherData = weatherResponse.data;
    const currentWeather = {
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
    };
    console.log(currentWeather);
    const newTodo = {
      task: todo.task,
      priority: todo.priority,
      activity: todo.activity,
      location: todo.location,
      weather: currentWeather,
    };

    const storedTodos = JSON.parse(localStorage.getItem(userName)) || [];

    storedTodos.push(newTodo);

    if (userName !== null) {
      localStorage.setItem(userName, JSON.stringify(storedTodos));
    } else {
      console.error("User name is null, cannot store todos in localStorage.");
    }
    setToDo({
      task: "",
      priority: "",
      activity: "",
      location: "",
    });
    console.log("Todo added:", newTodo);
    dispatch(add({ ...newTodo, weather: currentWeather }));
    // dispatch(add({ ...newTodo }));
    setToDo({ task: "", priority: "", activity: "", location: "" });
    console.log(todo);
  };

  return (
    <div className="TaskInput">
      <form>
        <div className="Taskinput">
          <label htmlFor="task">Enter Task</label>
          <input type="text" name="task" onChange={handleChange} />
        </div>
        <div className="Taskinput">
          <label htmlFor="priority">Set Priority</label>
          <select
            name="priority"
            onChange={handlePriority}
            value={todo.priority}
          >
            <option>Low</option>
            <option>High</option>
          </select>
        </div>
        <div className="Taskinput">
          <label htmlFor="activity">Set Activity</label>
          <select
            name="activity"
            onChange={handleActivity}
            value={todo.activity}
          >
            <option>In-Door</option>
            <option>Out-Door</option>
          </select>
        </div>
        <div className="Taskinput">
          <label htmlFor="location">Location</label>
          <input type="text" name="location" onChange={handleLocation} />
        </div>

        <button type="submit" onClick={addData}>
          Add
        </button>
      </form>
    </div>
  );
};

export default TaskInput;

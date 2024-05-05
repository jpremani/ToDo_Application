import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { delete1, update1 } from "../redux/reducers/todoSlice";
import "./TaskList.css";

const TaskList = () => {
  const User_Data = useSelector((state) => state.tododata);
  const dispatch = useDispatch();
  const [todoindex, setTodoIndex] = useState("");
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState("");
  const handleClose = () => setShow(false);
  const [showeyevalue, setShoweyeValue] = useState("");
  const [showeye, setShoweye] = useState(false);
  const [priority, setPriority] = useState("");
  console.log(User_Data);

  // const userName = user.length > 0 ? user[0] : null;
  // const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   // Check if user is logged in
  //   if (userName) {
  //     // Retrieve todos from localStorage using userName as key
  //     const storedTodos = JSON.parse(localStorage.getItem(userName)) || [];
  //     // Update state with retrieved todos
  //     setTodos(storedTodos);
  //   } else {
  //     // Handle case when user is not logged in
  //     // For example, redirect to login page
  //   }
  // }, [userName]);

  const handleshow = (e) => {
    setShow(true);
    setUpdate(e);
  };
  const remove = (index) => {
    dispatch(delete1(index));
  };
  const usertask_update = () => {
    dispatch(
      update1({ value: update, index: todoindex, priorityvalue: priority })
    );
    handleClose();
  };

  return (
    <div className="TaskList_container" style={{ color: "white" }}>
      {User_Data.map((value, index) => (
        <div
          key={index}
          className="todo_container mb-2 d-flex justify-content-between align-items-center px-2 col-lg-6 mx-auto mt-3"
          style={
            value.priority === "High"
              ? { backgroundColor: "rgb(201, 95, 95)" }
              : {}
          }
        >
          <li style={{ listStyle: "none" }}>
            {value.task}
            <span style={{ color: "orange" }}>
              {value.activity === "Out-Door" &&
                ` Weather: ${value.weather.description}`}
            </span>
          </li>
          <div className="todo_icon d-flex align-items-center justify-content-between col-lg-2">
            <i
              className="bi bi-pen"
              onClick={() => {
                setTodoIndex(index);
                handleshow(value.task);
                setPriority(value.priority);
              }}
              style={{ color: "blue", cursor: "pointer" }}
            ></i>
            <i
              className="bi bi-eye-fill"
              style={{ color: "green", cursor: "pointer" }}
              onClick={() => {
                setShoweye(true);
                setShoweyeValue(value.task);
              }}
            ></i>
            <i
              className="bi bi-trash"
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => remove(index)}
            ></i>
          </div>
        </div>
      ))}
      <Modal show={showeye}>
        <h1 className="text-center">{showeyevalue}</h1>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShoweye(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <h3 className="text-center mt-2">Update Your Task</h3>
        <Modal.Header>
          <div className="todo col-lg-5 mx-auto d-flex justify-content-between align-items-center">
            <input
              name="task"
              value={update}
              onChange={(e) => setUpdate(e.target.value)}
              className="form-control col-lg-5 mt-2"
            />
          </div>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => usertask_update()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;

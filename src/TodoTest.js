import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo.png";
import axios from "axios"

function TodoTest() {


  const [todoList, setTodoList] = useState([]);
  const [inputData, setInputData] = useState("");
  const [selectedTask, setselectedTask] = useState(null);
  const [quotes, setQuotes] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (event) => {
    setInputData(event.target.value);
  };

  const addTask = () => {
    if (selectedTask !== null) {
      const updatedTodo = todoList.map((todo) => {
        if (todo.id == selectedTask) {
          todo.taskName = inputData;
          setInputData("");
        }
        return todo;
      });
      setTodoList(updatedTodo);
      setselectedTask(null);
      return//clean code(goes to initial point) 
    }
    
    
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: inputData,
      completed: false,
    };
    var stringifyTask=JSON.parse(JSON.stringify(task));
    console.log(stringifyTask)

    if (!inputData) {
    } else {
      console.log(stringifyTask)

      axios.post('http://localhost:8000/addTask',stringifyTask)
      .then(()=>{console.log("api called succesfully")})
      .catch(()=>{console.log("error was found")})
      setTodoList([...todoList, task]);
      setInputData("");
    }
    
  };


  const deleteTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id == id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  };

  const editTask = (id) => {
    setInputData(todoList[id - 1].taskName);
    setselectedTask(id);
  };

  const getQuote = async() => {
    const res=await fetch("https://type.fit/api/quotes")
    const data=await res.json()
    let randomNum = Math.floor(Math.random() * data.length);
    setQuotes(data[randomNum]);
    
  };

  useEffect(() => {
    getQuote();
  }, []);

 

  const deleteall = () => {
    setTodoList([]);
    localStorage.clear()
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <img
          src={logo}
          height="150"
          width="300"
          alt="Todo-logo"
          className="logo"
        />

        <div className="quotes">
          <p>{quotes.text || "loading"} - </p>
          <p>{`  ${quotes.author}`|| "loading"}</p>
        </div>

        <div className="container">
          <div className="todo-head">
            <input
              type="text"
              value={inputData}
              className="input-text"
              placeholder="Add new Todo"
              onChange={handleChange}
            />
            <button className="add-btn" onClick={addTask} type="submit">
              {selectedTask ? "Save" : "Add Todo"}
            </button>
            <button
              className="add-btn"
              onClick={() => {
                deleteall();
              }}
            >
              Delete all
            </button>
          </div>
          <div className="list">
            {todoList.map((task) => {
              return (
                <ul>
                  <li key={task.id}>
                    <input
                      type="checkbox"
                      value={task.completed}
                      onClick={() => completeTask(task.id)}
                    />
                    <span
                      style={{
                        textDecoration: task.completed ? "line-through" : null,
                      }}
                    >
                      {task.taskName}
                    </span>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => editTask(task.id)}
                    >
                      Edit
                    </button>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
}

export default TodoTest;

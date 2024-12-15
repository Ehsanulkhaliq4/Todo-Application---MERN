import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { Button } from "flowbite-react";
import { Badge } from "flowbite-react";
import toast from "react-hot-toast";

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchtodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/todo/getAllTodos", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setTodos(response.data.todos);
        setError(null);
      } catch (error) {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchtodos();
  }, []);

  const todoCreate = async () => {
    if (!newTodo) return;
    try {
      const response = await axios.post(
        "http://localhost:8080/todo/create",
        {
          name: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.newTodo);
      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");
    } catch (error) {
      setError("Failed to create todo");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);    
    try {
      const response = await axios.put(
        `http://localhost:8080/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (error) {
      setError("Failed to find todo status");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/todo/delete/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("Failed to Delete Todo");
    }
  };

  const navigateTo = useNavigate();
  const logout = async () => {
    try {
      await axios.get("http://localhost:8080/user/logout", {
        withCredentials: true,
      });
      toast.success("User logged out successfully");
      navigateTo("/login");
      localStorage.removeItem("jwt");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;
  return (
    <Card href="#" className="max-w-sm mx-auto my-10">
       <h1 className="text-2xl font-semibold text-center">Todo Application</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && todoCreate()}
          className="flex-grow p-2 border mr-2 rounded-md focus:outline-none"
        />
        <Button onClick={todoCreate}
         gradientMonochrome="info">Add</Button>
      </div>

      
      {loading ? (
        <div className="text-center justify-center">
          <span className="textgray-500">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={todo._id || index}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => todoStatus(todo._id)}
                  className="mr-2 rounded"
                />
                <span
                  className={`${
                    todo.completed
                      ? "line-through text-gray-800 font-semibold"
                      : ""
                  } `}
                >
                  {todo.name}
                </span>
              </div>
              <button
                onClick={() => todoDelete(todo._id)}
                className="text-red-500 hover:text-red-800 duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      

    <div className="flex flex-wrap gap-2 mx-auto p-4">
      <Badge color="gray">
        <span className={`${
                    todos.completed
                      ? "line-through text-gray-800 font-semibold"
                      : ""
                  } `}>{remainingTodos} Todo Remaining</span>
      </Badge>
    </div>

    <Button  onClick={() => logout()}
    gradientMonochrome="info">
          Logout
        </Button>
    </Card>
  )
}

export default Home
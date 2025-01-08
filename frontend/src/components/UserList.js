import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.status === "Completed";
    if (filter === "Not Completed") return task.status === "Not Completed";
    return true;
  });

  return (
    <div className="container mt-5">
      <div className="box">
        {/* Header: Add Button and Filter Dropdown */}
        <div className="is-flex is-flex-wrap-wrap is-justify-content-space-between is-align-items-center mb-4">
          <Link to={`add`} className="button is-success">
            Add New Task
          </Link>
          <div className="select is-small mt-3-mobile">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </select>
          </div>
        </div>

        {/* Task Table */}
        <div className="table-container">
          <table className="table is-striped is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>
                    <span
                      className={`tag ${
                        task.status === "Completed"
                          ? "is-success"
                          : "is-warning"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`edit/${task.id}`}
                      className="button is-small is-info mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUser(task.id)}
                      className="button is-small is-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fallback Message */}
        {filteredTasks.length === 0 && (
          <div className="has-text-centered mt-5">
            <p className="has-text-grey">No tasks available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;

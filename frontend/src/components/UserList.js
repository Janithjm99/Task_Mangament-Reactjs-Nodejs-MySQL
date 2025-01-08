import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All"); // State to track filter selection

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const response = await axios.get("http://localhost:5000/tasks");
    setTasks(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Filter tasks based on selected status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.status === "Completed";
    if (filter === "Not Completed") return task.status === "Not Completed";
    return true;
  });

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div className="mb-3">
          <Link to={`add`} className="button is-success mr-3">
            Add New
          </Link>
          <div className="select is-small">
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
        <table className="table is-striped is-fullwidth">
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
                <td>{task.status}</td>
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
    </div>
  );
};

export default UserList;

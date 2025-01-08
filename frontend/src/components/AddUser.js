import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Not Completed");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      setError("Please fill out all fields.");
      return;
    }
    setError(""); // Clear error before trying to save
    try {
      await axios.post("http://localhost:5000/tasks", {
        name,
        description,
        status,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Failed to save task. Please try again.");
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveUser}>
          {error && <p className="has-text-danger">{error}</p>}
          <div className="field">
            <label className="label">Task Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Task Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Status</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Not Completed">Not Completed</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;

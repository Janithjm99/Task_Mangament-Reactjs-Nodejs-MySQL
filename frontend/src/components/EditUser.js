import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Not Completed");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getTaskById();
  }, []);

  const getTaskById = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5000/tasks/${id}`);
      setName(response.data.name);
      setDescription(response.data.description);
      setStatus(response.data.status);
      setIsLoading(false);
    } catch (err) {
      setError("Error fetching task details.");
      setIsLoading(false);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      setError("All fields are required.");
      return;
    }

    try {
      setIsLoading(true);
      await axios.patch(`http://localhost:5000/tasks/${id}`, {
        name,
        description,
        status,
      });
      navigate("/");
    } catch (err) {
      setError("Error updating task.");
      setIsLoading(false);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        {error && <div className="notification is-danger">{error}</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={updateTask}>
            <div className="field">
              <label className="label">Task Name</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
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
                  required
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
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditTask;
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  showNotificationForError,
  showNotificationForSuccess,
} from "../components/Notifactions/Notify";
import axios from "axios";
import Loading from "../components/Loader/Loading";
const TaskUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { taskId } = useParams();
  const navigate = useNavigate();

  // State to store the task details
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  // Handle task update function
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(
        `/tasks/update_task/${taskId}`,
        taskData
      );
      if (response.data.success === true) {
        showNotificationForSuccess(response.data.message);
        setIsLoading(false);
        navigate("/task-lists");
        window.location.reload();
        return;
      } else {
        setIsLoading(false);
        showNotificationForError(response.data.message);
        return;
      }
    } catch (error) {
      setIsLoading(false);
      showNotificationForError(error.message);
      return;
    }
  };

  return (
    <div className="task-update-container">
      <h2>Edit Task</h2>
      <form onSubmit={handleUpdateTask}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={taskData.title}
            onChange={handleChange}
            required
            placeholder="Enter Updated title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={taskData.description}
            onChange={handleChange}
            required
            placeholder="Enter Updated description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <button type="submit" className="update-btn">
            Update Task
          </button>
        )}
      </form>
    </div>
  );
};

export default TaskUpdate;

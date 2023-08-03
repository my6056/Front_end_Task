// importing important files
import React, { useState, useEffect } from "react";
import { getTokenCookie } from "../Context/Cookies";
import axios from "axios";
import {
  showNotificationForError,
  showNotificationForSuccess,
} from "../components/Notifactions/Notify";
import Loading from "../components/Loader/Loading";
import { Link } from "react-router-dom";
// task list component
const TaskListComponent = () => {
  // use state
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [isReloaded, setIsReloaded] = useState(false);

  // use auth use
  const user = getTokenCookie();
  let userId = "";
  if (user) {
    const tokenPayload = JSON.parse(atob(user.split(".")[1]));
    userId = tokenPayload.userId; // Assign the value to userid
  }

  // for show all task in page when render
  useEffect(() => {
    // Function to fetch tasks from the backend
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/tasks/${userId}/get_tasks`);
        if (response.data.success === true) {
          setIsLoading(false);
          const tasksData = await response.data.tasks;
          setTasks(tasksData);
          setIsReloaded(false);
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

    if (!isReloaded) {
      // Only fetch tasks if the component is not reloaded
      fetchTasks();
      return;
    }
  }, [userId, isReloaded]);

  const handleToggleDescription = (taskId) => {
    setExpandedTaskId((prevState) => (prevState === taskId ? null : taskId));
  };

  // Delete task handle
  const handleDeleteTask = async (taskId) => {
    try {
      if (window.confirm("Are you sure to delete this task?")) {
        const response = await axios.delete(`/tasks/delete_task/${taskId}`);
        if (response.data.success === true) {
          showNotificationForSuccess(response.data.message);
          window.location.reload();
          return;
        } else {
          showNotificationForError(response.data.message);
          return;
        }
      }
    } catch (error) {
      showNotificationForError(error.message);
      return;
    }
  };

  const handleComplete = async (taskId, e) => {
    e.preventDefault();
    try {
      const result = await axios.put(`/tasks/complete-task/${taskId}`);
      if (result.data.success === true) {
        showNotificationForSuccess(result.data.message);
        window.location.reload();
        return;
      } else {
        showNotificationForError(result.data.message);
        return;
      }
    } catch (error) {
      showNotificationForError(error.message);
      return;
    }
  };

  // Date format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // JSX return for viewtask
  return (
    <div className="task-list-container">
      <h2 className="task-list-title">All Tasks</h2>
      {isLoading ? (
        <Loading />
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`task-item ${
                expandedTaskId === task._id ? "expanded" : ""
              }`}
            >
              <div className="task-header">
                <span className="task-title">{task.title}</span>
              </div>
              {expandedTaskId === task._id && (
                <div className="task-details">
                  <p className="task-description">{task.description}</p>
                </div>
              )}
              <div className="due_date">
                Due-Date : {formatDate(task.dueDate)}
              </div>
              <div className="complete-status">
                <div className="task_complete">
                  <button
                    className="collapse-btn"
                    onClick={() => handleToggleDescription(task._id)}
                  >
                    {expandedTaskId === task._id ? "Show Less" : "Show More"}
                  </button>
                </div>
                <div className="task_cmplt_view_comp">
                  <p>{task.completed}</p>
                </div>
              </div>
              <hr
                style={{
                  backgroundColor: "black",
                  width: "100%",
                  marginBottom: "10px",
                }}
              />
              <div className="task-actions">
                <Link to={`${task._id}/update-task`} className="edit-btn">
                  Edit
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
                <button
                  onClick={(e) => handleComplete(task._id, e)}
                  className="task_comp_btn"
                >
                  Complete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskListComponent;

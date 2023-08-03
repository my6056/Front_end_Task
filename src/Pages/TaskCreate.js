import React from "react";
import TaskForm from "./TaskReusableForm/TaskForm";
import axios from "axios";
import { getTokenCookie } from "../Context/Cookies";
import { showNotificationForSuccess } from "../components/Notifactions/Notify";
import { useNavigate } from "react-router-dom";
const CreateTask = () => {
  const navigate = useNavigate();
  const user = getTokenCookie();
  let userId = "";
  if (user) {
    const tokenPayload = JSON.parse(atob(user.split(".")[1]));
    userId = tokenPayload.userId;
  }
  const handleCreateTask = async (formData) => {
    try {
      const result = await axios.post(`/tasks/${userId}/create_task`, formData);
      if (result.data.success === true) {
        showNotificationForSuccess(result.data.message);
        navigate("/task-lists");
        window.location.reload();
        return;
      } else {
        showNotificationForSuccess(result.data.message);
        window.location.reload();
        return;
      }
    } catch (error) {
      showNotificationForSuccess(error.message);
      window.location.reload();
      console.log("Error", error);
      return;
    }
  };

  return (
    <div>
      <TaskForm onSubmit={handleCreateTask} />
    </div>
  );
};

export default CreateTask;

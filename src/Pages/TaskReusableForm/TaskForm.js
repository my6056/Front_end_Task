import React, { useState, useEffect } from "react";
import Loading from "../../components/Loader/Loading";
import { showNotificationForError } from "../../components/Notifactions/Notify";
const TaskForm = ({ onSubmit, isUpdate, taskToUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const initialFormData = isUpdate
    ? { ...taskToUpdate }
    : {
        title: "",
        description: "",
        dueDate: "",
      };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setFormData(isUpdate ? { ...taskToUpdate } : initialFormData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onSubmit(formData);
      setFormData(initialFormData);
    } catch (error) {
      showNotificationForError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="task-form-container">
      <h1>{isUpdate ? "Update Task" : "Create Task"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter Task Title ."
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter Task description ."
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <button className="task-btn" type="submit">
            {isUpdate ? "Update Task" : "Create Task"}
          </button>
        )}
      </form>
    </div>
  );
};

export default TaskForm;

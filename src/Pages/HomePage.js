import React from "react";
import { Link } from "react-router-dom";
import { getTokenCookie } from "../Context/Cookies";

const Home = () => {
  const user = getTokenCookie();
  return (
    <div className="home-container">
      <header className="header">
        <h1>Task Manager</h1>
      </header>
      <main className="main-content">
        <p>Welcome to our modern Task Manager</p>
        <p>Here you can Update your daily tasks..</p>
        <div className="cta-buttons">
          {!user && (
            <>
              <Link title="Login" to="/login" className="cta-button">
                Login
              </Link>
              <Link title="Signup" to="/signup" className="cta-button">
                Signup
              </Link>
            </>
          )}
          {user && (
            <>
              <Link
                title="create-task"
                to="/create-task"
                className="cta-button"
              >
                Create Task
              </Link>
              <Link title="task list" to="/task-lists" className="cta-button">
                Task List
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;

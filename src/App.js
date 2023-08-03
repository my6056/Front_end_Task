import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTokenCookie } from "./Context/Cookies";
import Login from "./Pages/LoginPage";
import SignUp from "./Pages/SignupPage";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/HomePage";
import axios from "axios";
import {
  showNotificationForOffline,
  showNotificationForOnline,
} from "./components/Notifactions/Notify";
import { useEffect } from "react";

import Footer from "./components/Navbar/Footer";
import CreateTask from "./Pages/TaskCreate";
import TaskListComponent from "./Pages/TaskList";
import TaskUpdate from "./Pages/TaskUpdate";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
function App() {
  const user = getTokenCookie();
  // Internet checking
  useEffect(() => {
    const notifyNoInternet = () => {
      showNotificationForOffline();
    };
    const notifyConnectInternet = () => {
      showNotificationForOnline();
    };
    window.addEventListener("offline", notifyNoInternet);
    window.addEventListener("online", notifyConnectInternet);
    return () => {
      window.removeEventListener("offline", notifyNoInternet);
      window.removeEventListener("online", notifyConnectInternet);
    };
  }, []);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="App">
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/signup" element={user ? <Home /> : <SignUp />} />
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route
              path="/create-task"
              element={user ? <CreateTask /> : <Login />}
            />
            <Route
              path="/task-lists"
              element={user ? <TaskListComponent /> : <Login />}
            />
            <Route
              path="task-lists/:taskId/update-task"
              element={user ? <TaskUpdate /> : <Login />}
            />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  );
}

export default App;

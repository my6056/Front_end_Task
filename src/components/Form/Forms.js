// import react and all
import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loading";
import { showNotificationForError } from "../Notifactions/Notify";
// reusable Authform
const AuthForm = ({ onSubmit, formTitle, buttonText }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  //   for input empty check
  useEffect(() => {
    // Check if all the required fields are filled and update isFormValid state
    setIsFormValid(
      !!email &&
        !!password &&
        (formTitle !== "Sign Up" ||
          (!!firstName && !!lastName && !!confirmPassword))
    );
  }, [firstName, lastName, email, password, confirmPassword, formTitle]);

  //   handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isFormValid) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    setErrorMessage("");
    const formData = {
      firstName,
      lastName,
      email: email,
      confirmPassword,
      password,
    };
    // onSubmit(formData);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onSubmit(formData);
    } catch (error) {
      showNotificationForError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Signup-Page">
      <div className="auth-container">
        <div className="form-title">
          <h2>{formTitle}</h2>
        </div>
        <div className="error-message">
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {formTitle === "Sign Up" && (
            <>
              <div className="form-group">
                <label>First Name:</label>
                <input
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter Your First Name."
                  className="name-input"
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter Your Last Name."
                  className="name-input"
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label>Email:</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email."
              className="email-input"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password."
              className="password-input"
              minLength={6}
            />
          </div>
          {formTitle !== "Login" && (
            <div className="form-group">
              <label>Confirm Password :</label>
              <input
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter Your confirm Password."
                className="password-input"
                minLength={6}
              />
            </div>
          )}
          {isLoading ? (
            <Loading />
          ) : (
            <button
              className={
                isFormValid ? "Submit-btn" : "disabledButton  Submit-btn"
              }
              disabled={!isFormValid}
              type="submit"
            >
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

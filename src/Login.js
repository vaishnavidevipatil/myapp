import React, { useState } from "react";

const Login = () => {
  const [status, setStatus] = useState(null);
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!data.username || !data.password) {
      setStatus(false);
    } else {
      // Simulate an API call that returns a token
      const token = "dummy-jwt-token"; // Replace with actual API response

      // Store the token in localStorage
      localStorage.setItem("authToken", token);

      setStatus(true);
    }
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              style={{ width: "40%" }}
              type="text"
              id="username"
              name="username"
              value={data.username}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              style={{ width: "40%" }}
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {status === false && <div className="text-error">Enter Username and Password</div>}
          {status === true && <div className="text-success">Login Successful</div>}
        </form>
      </div>
    </>
  );
};

export default Login;

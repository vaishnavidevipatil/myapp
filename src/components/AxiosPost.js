import React, { useState } from "react";
import axios from "axios";
const AxiosPost = () => {
  const [state, setState] = useState({
    personNm: "",
    place: "",
    department: "",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/data", state)
      .then((response) => {
        setState("");
        console.log(response.data);
      })
      .catch((err) => {
        console.log("Cant post");
      });
  };
  return (
    <>
      <h1
        style={{
          backgroundColor: "green",
          color: "White",
          padding: "15px",
        }}
      >
        Data Form
      </h1>
      <form onSubmit={handleSubmit} style={{ margin: "100px" }}>
        <input
          type="text"
          name="personNm"
          value={state.personNm}
          onChange={handleChange}
          placeholder="Enter your Name"
          style={{borderRadius:"15px"}}
        ></input>
        <br />
        <br />
        <input
          type="text"
          name="place"
          value={state.place}
          onChange={handleChange}
          placeholder="Enter your Place"
          style={{borderRadius:"15px"}}
        ></input>
        <br />
        <br />
        <input
          type="text"
          name="department"
          value={state.department}
          onChange={handleChange}
          placeholder="Department Name"
          style={{borderRadius:"15px"}}
        ></input>
        <br />
        <button
          type="submit"
          style={{
            padding: "15px",
            margin: "20px",
            width: "250px",
            marginLeft: "350px",
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
};
export default AxiosPost;

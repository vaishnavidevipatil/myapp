import React, { useState } from "react";
import validateField from "./components/ValidateField";
import "./App.css";  // Ensure this file exists and contains your styles


// Initializing the form fields with empty values.
const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  country: "",
  hobbies: []  // Assuming you might want to include hobbies as an array
};

const Form = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value, type} = event.target;
    let fieldValue;

    // Handle checkbox input
    if (type === "checkbox") {
      if (formData.hobbies.includes(value)) {
        fieldValue = formData.hobbies.filter((hobby) => hobby !== value);
      } else {
        fieldValue = [...formData.hobbies, value];
      }
    } 
    // Handle radio input
    else if (type === "radio") {
      fieldValue = value;
    } 
    // Handle other input types
    else {
      fieldValue = value.trim();
    }

    setFormData({ ...formData, [name]: fieldValue });
    
    // Validate the field
    const error = validateField(name, fieldValue, formData);
    setFormErrors({ ...formErrors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormErrors = {};

    // Validate all form fields
    Object.keys(formData).forEach((fieldName) => {
      newFormErrors[fieldName] = validateField(
        fieldName,
        formData[fieldName],
        formData
      );
    });
    setFormErrors(newFormErrors);

    // If there are errors, abort form submission
    if (Object.values(newFormErrors).some((error) => error)) {
      return;
    }

    const dataString = Object.keys(formData)
      .map((fieldName) => `${fieldName}: ${formData[fieldName]}`)
      .join("\n");

    alert(`Form data:\n${dataString}`);
    setFormData(initialFormData);
    setFormErrors({});
  };

  return (
    <form id="registration-form" onSubmit={handleSubmit}>
      <h2 className="title">Registration Form</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {formErrors.name && <span className="error">{formErrors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {formErrors.email && <span className="error">{formErrors.email}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {formErrors.password && <span className="error">{formErrors.password}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show Password
        </label>
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <div className="form-row">
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={handleChange}
          />
          <label htmlFor="female">Female</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
          />
          <label htmlFor="other">Other</label>
          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            checked={formData.gender === "other"}
            onChange={handleChange}
          />
        </div>
        {formErrors.gender && <span className="error">{formErrors.gender}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="">Select a country</option>
          <option value="usa">USA</option>
          <option value="canada">Canada</option>
          <option value="uk">UK</option>
          <option value="india">India</option>
        </select>
        {formErrors.country && <span className="error">{formErrors.country}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;

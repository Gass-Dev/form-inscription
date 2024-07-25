import React, { useState } from "react";
import "./Register.module.scss";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    city: "",
    postalCode: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("User registered successfully");
      } else {
        setMessage("Error registering user");
      }
    } catch (error) {
      setMessage("Error registering user");
      console.error("Error:", error);
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      city: "",
      postalCode: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="birthDate">Birth Date</label>
      <input
        name="birthDate"
        id="birthDate"
        type="date"
        value={formData.birthDate}
        onChange={handleChange}
        required
      />
      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <input
        name="postalCode"
        placeholder="Postal Code"
        value={formData.postalCode}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegistrationForm;

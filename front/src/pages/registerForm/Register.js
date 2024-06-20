import React, { useState } from 'react';

const RegistrationForm = ({ addUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    city: '',
    postalCode: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      city: '',
      postalCode: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="Prénom" value={formData.firstName} onChange={handleChange} required />
      <input name="lastName" placeholder="Nom" value={formData.lastName} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} required />
      <input name="city" placeholder="Ville" value={formData.city} onChange={handleChange} required />
      <input name="postalCode" placeholder="Code Postal" value={formData.postalCode} onChange={handleChange} required />
      <button type="submit">Sauvegarder</button>
    </form>
  );
};

export default RegistrationForm;

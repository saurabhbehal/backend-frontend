// AddProjectForm.jsx
"use client";
import React, { useState } from 'react';

const AddProjectForm = ({ onProjectAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://api.designindianwardrobe.com/api/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Project created successfully!');
        // Reset the form data
        setFormData({
          name: '',
          description: '',
        });

        // Notify the parent component (if provided) that a project was added
        if (onProjectAdded) {
          onProjectAdded();
        }

        // Show success alert
        alert('Project created successfully!');
      } else {
        console.error('Project creation failed.');
        // Show error alert
        alert('Error creating project. Please try again.');
      }
    } catch (error) {
      console.error('Error during project creation:', error);
      // Show error alert
      alert('Error creating project. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <h2 className="text-lg font-bold mb-4">Create a New Project</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Project Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Project Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="mt-1 p-2 border rounded-md w-full "
          style={{color: "black"}}
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md">
        Create Project
      </button>
    </form>
  );
};

export default AddProjectForm;

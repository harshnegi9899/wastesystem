import React, { useState } from "react";
import axios from "axios";

const SchedulePickup = () => {
  const [formData, setFormData] = useState({
    wasteType: "recyclables",
    scheduledDate: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      // Assuming the JWT token is stored in localStorage after login
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User is not authenticated");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/api/pickups",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Pickup scheduled successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to schedule pickup");
    }
  };

  return (
    <div>
      <h2>Schedule a Pickup</h2>
      <form onSubmit={handleSubmit}>
        <label>Waste Type:</label>
        <select
          name="wasteType"
          value={formData.wasteType}
          onChange={handleChange}
        >
          <option value="recyclables">Recyclables</option>
          <option value="organic">Organic</option>
          <option value="general">General</option>
        </select>

        <label>Scheduled Date:</label>
        <input
          type="date"
          name="scheduledDate"
          value={formData.scheduledDate}
          onChange={handleChange}
          required
        />

        <button type="submit">Schedule Pickup</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SchedulePickup;

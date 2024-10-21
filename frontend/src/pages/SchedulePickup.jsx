import React, { useState } from 'react';
import axios from 'axios';

const SchedulePickup = () => {
  const [wasteType, setWasteType] = useState('recyclables');
  const [scheduledDate, setScheduledDate] = useState('');

  const handleSchedule = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/api/pickups',
        { wasteType, scheduledDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Notify user of successful scheduling
    } catch (error) {
      console.error('Scheduling failed:', error);
    }
  };

  return (
    <form onSubmit={handleSchedule}>
      <select value={wasteType} onChange={(e) => setWasteType(e.target.value)}>
        <option value="recyclables">Recyclables</option>
        <option value="organic">Organic</option>
        <option value="general">General</option>
      </select>
      <input
        type="date"
        value={scheduledDate}
        onChange={(e) => setScheduledDate(e.target.value)}
      />
      <button type="submit">Schedule Pickup</button>
    </form>
  );
};

export default SchedulePickup;

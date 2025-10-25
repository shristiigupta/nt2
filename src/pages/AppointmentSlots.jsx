import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./AppointmentSlots.css";

const AppointmentSlots = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);

  // Fetch slots from backend
  const fetchSlots = async (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    try {
      const res = await fetch(`http://localhost:5000/api/slots?date=${formattedDate}`);
      const data = await res.json();
      setSlots(data);

    } catch (err) {
      console.error("Error fetching slots:", err);
      setSlots([]);
    }
  };

  useEffect(() => {
    fetchSlots(selectedDate);
  }, [selectedDate]);

  // Limit calendar to today + 2 months
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  return (
    <div className="appointment-container">
      <h1 className="appointment-title">Check Available Appointment Slots</h1>

      <div className="appointment-content">
        {/* Calendar */}
        <div className="calendar-section">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>

        {/* Slots */}
        <div className="slots-section">
          <h3>
            Slots for{" "}
            <span className="selected-date">
              {selectedDate.toDateString()}
            </span>
          </h3>

          {slots.length > 0 ? (
            <div className="slots-grid">
              {slots.map((slot, index) => (
                <div key={index} className={`slot-card ${slot.status}`}>
                  {slot.time}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-slots">No slots available for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentSlots;

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./AppointmentSlots.css";

const AppointmentSlots = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);

  const fetchSlots = async (date) => {
    const formattedDate = date.toLocaleDateString("en-CA");
    console.log("Requesting date:", formattedDate);

    try {
      const res = await fetch(
        "https://gist.githubusercontent.com/shristi-gup/44923d3d2eba283d99822c1b351b019d/raw/gistfile1.txt?nocache=" +
          Date.now()
      );
      const text = await res.text();
      const jsonData = JSON.parse(text);
      const daySlots = jsonData[formattedDate] || [];
      setSlots(daySlots);
    } catch (err) {
      console.error("Error fetching/parsing slots:", err);
      setSlots([]);
    }
  };

  useEffect(() => {
    fetchSlots(selectedDate);
    const interval = setInterval(() => fetchSlots(selectedDate), 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedDate]);

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

          {/* Legend Section */}
          <div className="legend">
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#4caf50" }}></div>
              <span>Green – Available (Unreserved)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#f44336" }}></div>
              <span>Red – Booked (Reserved)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#ffcc00" }}></div>
              <span>Yellow – Blocked (Subject to payment realization)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSlots;

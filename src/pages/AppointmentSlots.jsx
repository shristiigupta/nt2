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
        "https://gist.githubusercontent.com/santulanneurotherapy/6681176a55e02ed339a9793d46378747/raw/gistfile1.txt?nocache=" +
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
      <h1 className="appointment-title">Appointments</h1>

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
            Slots availability as on<br />
            <span className="selected-date">
              {selectedDate.toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              ({selectedDate.toLocaleDateString("en-IN", { weekday: "long" })})
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
              <span>Green – Available slot</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#f44336" }}></div>
              <span>Red – Booked slot</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#ffcc00" }}></div>
              <span>Yellow – Blocked slot</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSlots;



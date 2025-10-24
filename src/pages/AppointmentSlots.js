import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./AppointmentSlots.css";

const AppointmentSlots = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);

  const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTaY5X1aeOz7WXI2SCzw1B8xIn_FMD_cXtlWE4_2-V2BMRIdxvVQ3x-TS7Rieocf21IdMwlVxSi3Fo9/pub?gid=0&single=true&output=csv";

  const fetchSlots = async (date) => {
    try {
      const res = await fetch(SHEET_CSV_URL);
      const text = await res.text();
      const rows = text.split("\n").map((r) => r.split(","));
      // rows[0] = header: ['Date','08:00','10:00','12:00']

      const formattedDate = date.toISOString().split("T")[0];

      const dayRow = rows.find((row) => row[0] === formattedDate);
      if (!dayRow) {
        setSlots([]);
        return;
      }

      const slotData = rows[0].slice(1).map((time, i) => ({
        time,
        status: dayRow[i + 1].trim() === "green" ? "available" : "booked",
      }));

      setSlots(slotData);
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
            <span className="selected-date">{selectedDate.toDateString()}</span>
          </h3>

          {slots.length > 0 ? (
            <div className="slots-grid">
              {slots.map((slot, index) => (
                <div
                  key={index}
                  className={`slot-card ${slot.status}`}
                  style={{
                    backgroundColor:
                      slot.status === "available" ? "green" : "red",
                    color: "#fff",
                  }}
                >
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

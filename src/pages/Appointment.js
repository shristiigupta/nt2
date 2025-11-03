import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Appointment.css";

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);

  const fetchSlots = async (date) => {
    const formattedDate = date.toLocaleDateString("en-CA");
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
  <div className="appointment-wrapper">
    {/* RIGHT SECTION - Calendar and Slots (now appears first on desktop) */}
    <div className="slots-section">
      <h1>Appointments</h1>
      <div className="calendar-container">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>

      <h3 className="slots-heading">
        Slots availability as on{" "}
        <br />
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

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color available"></div>
          <span>Green – Available slot</span>
        </div>
        <div className="legend-item">
          <div className="legend-color booked"></div>
          <span>Red – Booked slot</span>
        </div>
        <div className="legend-item">
          <div className="legend-color blocked"></div>
          <span>Yellow – Blocked slot</span>
        </div>
      </div>
    </div>

    {/* LEFT SECTION - Procedure (now appears right on desktop) */}
    <div className="procedure-section">
      <h1>Appointment Procedure</h1>
      <ol className="procedure-list">
        <li>See the associated calendar for free available slots</li>
        <li>
          The available time slots are marked in{" "}
          <span className="highlight-green">GREEN COLOR</span>
        </li>
        <li>
          Patients are requested to plan the therapy sessions according to
          availability
        </li>
        <li>
          Communicate the same to Santulan Holistic Solutions via WhatsApp on
          8130608275
        </li>
        <li>
          Santulan Wellness Team will block your date and time for two hours and
          share a QR code for payment.
        </li>
        <li>
          Please make the payment as specified within the blocking period and
          share the payment screenshot to confirm your appointment.
        </li>
        <li>
          Your appointment will be confirmed only after the payment is received.
          If the payment is not made within the blocking period, the appointment
          will not be considered confirmed and the time slot may be given to
          someone else.
        </li>
        <li>
          On the date and time of Appointment, Patients are requested to reach
          15–20 minutes prior to their appointment time and take rest, to get
          best results from the therapy.
        </li>
        <li>
          If you arrive late, your therapy duration will be reduced accordingly,
          which may reduce its benefits.
        </li>
        <li>
          Any advance payment will not be refunded. Only onetime Preponement /
          Postponement can be done with prior intimation subject to availability
          of time slot.
        </li>
      </ol>
    </div>
  </div>
);

};

export default Appointment;

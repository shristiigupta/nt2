import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Appointment.css";
import { incrementVisit } from "./visitTracker";
import { logVisitor } from "./visitorLogger";

const Appointment = () => {
  useEffect(() => {
  document.title = "Appointment Page | Santulan Holistic Solutions";
}, []);

  useEffect(() => {
    logVisitor("Appointment Page");
    incrementVisit("Appointment Page");
  }, []);
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
  maxDate.setDate(maxDate.getDate() + 6);

  // helpers for date-only comparisons
  const dateOnly = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
  const isBeforeDay = (a, b) => dateOnly(a).getTime() < dateOnly(b).getTime();

  // convert "HH:MM AM/PM" (or "H:MM AM/PM") to minutes since midnight
  const timeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const parts = timeStr.trim().split(" ");
    let timePart = parts[0];
    let modifier = parts[1] ? parts[1].toUpperCase() : null;

    // handle times without AM/PM by assuming 24-hour format
    let [hours, minutes] = timePart.split(":").map(Number);
    if (!modifier) {
      // e.g., "13:30" -> 13:30
    } else {
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
    }
    return hours * 60 + (minutes || 0);
  };

  const getCurrentMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  // Determine visible slots:
  const getFilteredSlots = () => {
    const today = new Date();
    const nowMinutes = getCurrentMinutes();

    // If selected date is before today => none
    if (isBeforeDay(selectedDate, today)) return [];

    // If selected date is today => only upcoming slots (strictly greater than current time)
    if (isSameDay(selectedDate, today)) {
      return slots.filter(
        (slot) =>
          slot.status === "available" && timeToMinutes(slot.time)  > nowMinutes + 59
      );
    }

    // Future date => show all available slots
    return slots.filter((slot) => slot.status === "available");
  };

  const visibleSlots = getFilteredSlots();

  return (
    <div className="appointment-wrapper">
      {/* RIGHT SECTION - Calendar and Slots */}
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
          Available slots as on{" "}
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

        {/* SLOT DISPLAY */}
        {visibleSlots.length > 0 ? (
          <div className="slots-grid">
            {visibleSlots.map((slot, index) => (
              <div key={index} className={`slot-card ${slot.status}`}>
                {slot.time}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-slots">
            No available slots for this date. Please try selecting another
            date.
          </p>
        )}

        {/* LEGEND */}
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color available"></div>
            <span>Green – Available slot</span>
          </div>

          <div className="legend-item">
            <div className="legend-color blocked"></div>
            <span>Yellow – Blocked slot</span>
          </div>
        </div>
      </div>

      {/* LEFT SECTION - Procedure */}
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
            Santulan Wellness Team will block your date and time for two hours
            and share a QR code for payment.
          </li>
          <li>
            Please make the payment as specified within the blocking period and
            share the payment screenshot to confirm your appointment.
          </li>
          <li>
            Your appointment will be confirmed only after the payment is
            received. If the payment is not made within the blocking period, the
            appointment will not be considered confirmed and the time slot may
            be given to someone else.
          </li>
          <li>
            On the date and time of Appointment, Patients are requested to reach
            15–20 minutes prior to their appointment time and take rest, to get
            best results from the therapy.
          </li>
          <li>
            If you arrive late, your therapy duration will be reduced
            accordingly, which may reduce its benefits.
          </li>
          <li>
            Any advance payment will not be refunded. Only onetime Preponement /
            Postponement can be done with prior intimation subject to
            availability of time slot.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Appointment;

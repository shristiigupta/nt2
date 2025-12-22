import React, { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Appointment.css";
import { incrementVisit } from "./visitTracker";
import { logVisitor } from "./visitorLogger";


const DEFAULT_SLOTS = [
  "8:00 AM",
  "10:00 AM",
  "2:00 PM",
  "4:00 PM",
  "6:00 PM",
];

const Appointment = () => {
  useEffect(() => {
    document.title = "Appointment Page | Santulan Holistic Solutions";
    logVisitor("Appointment Page");
    incrementVisit("Appointment Page");
  }, []);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);

const fetchSlots = useCallback(async (date) => {
  const formattedDate = date.toLocaleDateString("en-CA");

  try {
    const res = await fetch(
      `https://gist.githubusercontent.com/santulanneurotherapy/6681176a55e02ed339a9793d46378747/raw/gistfile1.txt?nocache=${Date.now()}`
    );

    const text = await res.text();
    const jsonData = JSON.parse(text);
    const gistSlots = jsonData[formattedDate] || [];

    const slotMap = {};

    DEFAULT_SLOTS.forEach((time) => {
      slotMap[time] = { time, status: "available" };
    });

    gistSlots.forEach((slot) => {
      slotMap[slot.time] = {
        time: slot.time,
        status: slot.status,
      };
    });

    const finalSlots = Object.values(slotMap).sort(
      (a, b) => timeToMinutes(a.time) - timeToMinutes(b.time)
    );

    setSlots(finalSlots);
  } catch (err) {
    console.error("Error fetching slots:", err);
    setSlots(
      DEFAULT_SLOTS.map((time) => ({
        time,
        status: "available",
      }))
    );
  }
}, []);


  useEffect(() => {
    fetchSlots(selectedDate);
    const interval = setInterval(() => fetchSlots(selectedDate), 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedDate]);

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 6);

  // ---------- TIME HELPERS ----------
  const dateOnly = (d) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isBeforeDay = (a, b) =>
    dateOnly(a).getTime() < dateOnly(b).getTime();

  function timeToMinutes(timeStr) {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  }

  const getCurrentMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  // ---------- FILTERING ----------
  const getFilteredSlots = () => {
    const today = new Date();
    const nowMinutes = getCurrentMinutes();

    if (isBeforeDay(selectedDate, today)) return [];

    if (isSameDay(selectedDate, today)) {
      return slots.filter(
        (slot) =>
          slot.status === "available" &&
          timeToMinutes(slot.time) > nowMinutes + 59
      );
    }

    return slots.filter((slot) => slot.status === "available");
  };

  const visibleSlots = getFilteredSlots();

  return (
    <div className="appointment-wrapper">
      {/* RIGHT SECTION */}
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
          Available slots as on <br />
          <span className="selected-date">
            {selectedDate.toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            ({selectedDate.toLocaleDateString("en-IN", { weekday: "long" })})
          </span>
        </h3>

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
            No available slots for this date. Please try selecting another date.
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

      {/* LEFT SECTION — RESTORED EXACTLY */}
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
            Postponement can be done with prior intimation subject to availability
            of time slot.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Appointment;

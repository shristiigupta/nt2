import React from "react";
import "./Appointment.css";

const Appointment = () => {
  return (
    <>
      <div className="appointment-procedure-container">
        <h1>Procedure for Booking an Appointment</h1>

        <ol className="appointment-procedure-list">
          <li>
            The appointment schedule is given at the following link: <br />
            <a
              href="https://docs.google.com/spreadsheets/d/1v9GSEujiFKpM5_sITvnsX3ALMw3Y1H1l_-Mes9XBxdI/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Appointment Schedule
            </a>
            <br />
            In this schedule, the <span className="highlight-green">green-colored</span> time slots are available.
            Therefore, please share your preferred therapy booking date and time according to this schedule.
          </li>

          <li>
            The Santulan Holistic team will confirm your date and time and share a QR code for payment.
          </li>

          <li>
            If this time suits you, please make the payment as specified and share the payment screenshot to confirm your appointment. 
            <br />
            If you have already made an advance payment, you may skip this step.
          </li>

          <li>
            Your appointment will be confirmed only after the payment is received. 
            If the payment is not made, the appointment will not be considered confirmed and the time slot may be given to someone else.
          </li>

          <li>
            Please arrive 15–20 minutes before your appointment time and rest, so that you get the best results from your therapy.
          </li>

          <li>
            If you do not arrive on time or are late, your therapy duration will be reduced accordingly, which may reduce its benefits.
          </li>
        </ol>
      </div>
    </>
  );
};

export default Appointment;

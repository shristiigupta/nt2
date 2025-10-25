import React from "react";
import "./Appointment.css";

const Appointment = () => {
  return (
    <>
      <div className="appointment-procedure-container">
        <h1>Appointment Procedure</h1>

        <ol className="appointment-procedure-list">
          <li>
            
            <a
              href="https://docs.google.com/spreadsheets/d/1v9GSEujiFKpM5_sITvnsX3ALMw3Y1H1l_-Mes9XBxdI/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
               Click to View Appointment Schedule
            </a>
            
            </li>
            <li>
            The available time slots are marked in <span className="highlight-green">GREEN COLOR</span> <br />
            </li>
            <li>
            Patients are requested to plan the therapy sessions according to availability<br/> 
            </li>
            <li>
            Communicate the same to Santulan Holistic Solutions via WhatsApp on 8130608275
            </li>
          

          <li>
            Santulan Wellness Team will block your date and time for two hours and share a QR code for payment.
          </li>

          <li>
            Please make the payment as specified within the blocking period and share the payment screenshot to confirm your appointment. 
            
          </li>

          <li>
            Your appointment will be confirmed only after the payment is received. 
            If the payment is not made within the blocking period, the appointment will not be considered confirmed and the time slot may be given to someone else.
          </li>

          <li>
            On the date and time of Appointment, Patients are requested to reach 15–20 minutes prior to their appointment time and take rest, to get best results from the therapy.
          </li>

          <li>
            If you arrive late, your therapy duration will be reduced accordingly, which may reduce its benefits.
          </li>

          <li>
            Any advance payment will not be refunded. Only onetime Preponement / Postponement can be done with prior intimation subject to availability of time slot.
          </li>

        </ol>
      </div>
    </>
  );
};

export default Appointment;

import React, { useEffect, useState } from "react";
import "./VisitorLogPage.css";

const VisitorLogPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem("visitorLogs")) || [];
    setLogs(storedLogs.reverse()); // latest first
  }, []);

  return (
    <div className="visitor-log-container">
      <h1>Visitor Logs</h1>
      {logs.length === 0 ? (
        <p>No visitors logged yet.</p>
      ) : (
        <table className="visitor-log-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date & Time</th>
              <th>Page Visited</th>
              <th>IP Address</th>
              <th>Location</th>
              <th>Organization</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{logs.length - index}</td>
                <td>{log.date}</td>
                <td>{log.pageVisited}</td>
                <td>{log.ip}</td>
                <td>
                  {log.city}, {log.region}, {log.country}
                </td>
                <td>{log.org}</td>
                <td>{log.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VisitorLogPage;

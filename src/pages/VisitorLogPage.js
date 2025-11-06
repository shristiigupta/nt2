import React, { useEffect, useState } from "react";
import "./VisitorLogPage.css";

const VisitorLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const BIN_ID = "YOUR_BIN_ID";
        const API_KEY = "YOUR_API_KEY";

        const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
          headers: { "X-Master-Key": API_KEY },
        });
        const data = await res.json();
        // Ensure record is an array
        setLogs(data.record?.logs || []);
      } catch (err) {
        console.error("Error fetching visitor logs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) return <p>Loading visitor logs...</p>;

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

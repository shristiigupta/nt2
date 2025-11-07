import React, { useEffect, useState } from "react";
import "./VisitorLogPage.css";

const VisitorLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const BIN_ID = "690c728bae596e708f4814ba";
        const API_KEY = "$2a$10$/ERM20klZc811EtIrQqFGeRAbEjXhKfZd5K92avgff9rfIGoe7cja";
        const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
          headers: { "X-Master-Key": API_KEY },
        });
        const data = await res.json();

        // ✅ Show newest first
        setLogs((data.record?.logs || []));
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
        <div className="visitor-log-table-wrapper">
          <table className="visitor-log-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Page Visited</th>
                <th>IP Address</th>
                <th>Location</th>
                <th>Service Provider</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td data-label="Date & Time">{log.date}</td>
                  <td data-label="Page Visited">{log.pageVisited}</td>
                  <td data-label="IP Address">{log.ip}</td>
                  <td data-label="Location">{`${log.city}, ${log.region}, ${log.country}`}</td>
                  <td data-label="Service Provider">{log.org}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VisitorLogPage;

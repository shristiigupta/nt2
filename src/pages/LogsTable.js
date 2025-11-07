import React, { useState, useEffect, useRef } from "react";
import "./LogsTable.css";

const LogsTable = ({ logs }) => {
  const [filters, setFilters] = useState({
    date: "",
    user: "",
    action: "",
    status: "",
  });
  const [filteredLogs, setFilteredLogs] = useState(logs);
  const [openFilter, setOpenFilter] = useState(null);

  // Convert time to 24-hour format without seconds
  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    return date
      .toLocaleTimeString("en-GB", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(/^0/, ""); // remove leading 0 if you want
  };

  // Apply filters
  useEffect(() => {
    let filtered = logs.filter((log) => {
      return (
        (!filters.date || log.date.includes(filters.date)) &&
        (!filters.user || log.user.toLowerCase().includes(filters.user.toLowerCase())) &&
        (!filters.action || log.action.toLowerCase().includes(filters.action.toLowerCase())) &&
        (!filters.status || log.status.toLowerCase().includes(filters.status.toLowerCase()))
      );
    });
    setFilteredLogs(filtered);
  }, [filters, logs]);

  // Handle dropdown toggle
  const toggleFilter = (col) => {
    setOpenFilter((prev) => (prev === col ? null : col));
  };

  // Handle filter change
  const handleFilterChange = (col, value) => {
    setFilters((prev) => ({ ...prev, [col]: value }));
  };

  // Unique values for dropdowns (for user, action, status)
  const uniqueValues = (key) => [...new Set(logs.map((log) => log[key]))];

  return (
    <div className="logs-table-container">
      <table className="logs-table">
        <thead>
          <tr>
            {["date", "user", "action", "status"].map((col) => (
              <th key={col}>
                <div className="th-header">
                  {col.toUpperCase()}
                  <span className="filter-icon" onClick={() => toggleFilter(col)}>
                    &#9662;
                  </span>
                  {openFilter === col && (
                    <div className="filter-dropdown">
                      {col === "date" ? (
                        <input
                          type="text"
                          placeholder="YYYY-MM-DD"
                          value={filters[col]}
                          onChange={(e) => handleFilterChange(col, e.target.value)}
                        />
                      ) : (
                        <select
                          value={filters[col]}
                          onChange={(e) => handleFilterChange(col, e.target.value)}
                        >
                          <option value="">All</option>
                          {uniqueValues(col).map((val, idx) => (
                            <option key={idx} value={val}>
                              {val}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredLogs.map((log, idx) => (
            <tr key={idx}>
              <td>{log.date}</td>
              <td>{log.user}</td>
              <td>{log.action}</td>
              <td>{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogsTable;

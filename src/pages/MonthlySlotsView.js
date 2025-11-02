import React, { useEffect, useState } from "react";
import "./MonthlySlotsView.css";

const MonthlySlotsView = () => {
  const [slotsData, setSlotsData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  });
  const [uniqueTimes, setUniqueTimes] = useState([]);

  const fetchSlots = async () => {
    try {
      const res = await fetch(
        "https://gist.githubusercontent.com/santulanneurotherapy/6681176a55e02ed339a9793d46378747/raw/gistfile1.txt?nocache=" +
          Date.now()
      );
      const text = await res.text();
      const jsonData = JSON.parse(text);
      setSlotsData(jsonData);

      // Extract unique time slots
      const allTimes = new Set();
      Object.values(jsonData).forEach((daySlots) => {
        daySlots.forEach((slot) => allTimes.add(slot.time));
      });

      // Sort times chronologically
      const sortedTimes = [...allTimes].sort((a, b) => {
        const parseTime = (t) => {
          if (!t) return 0;
          const [time, modifier] = t.trim().split(" ");
          let [hours, minutes] = time.split(":").map(Number);
          if (modifier?.toUpperCase() === "PM" && hours !== 12) hours += 12;
          if (modifier?.toUpperCase() === "AM" && hours === 12) hours = 0;
          return hours * 60 + (minutes || 0);
        };
        return parseTime(a) - parseTime(b);
      });

      setUniqueTimes(sortedTimes);
    } catch (err) {
      console.error("Error fetching slots:", err);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const getDatesForMonth = (monthYear) => {
    const [year, month] = monthYear.split("-").map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const dates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      dates.push(dateStr);
    }
    return dates;
  };

  const getSlotStatus = (date, time) => {
    if (!slotsData[date]) return null;
    const slot = slotsData[date].find((s) => s.time === time);
    return slot ? slot.status : null;
  };

  const dates = getDatesForMonth(selectedMonth);

  return (
    <div className="monthly-container">
      <h1 className="monthly-title">Monthly Appointment Overview</h1>

      {/* Month selector */}
      <div className="month-selector">
        <label>Select Month: </label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="slots-table">
          <thead>
            <tr>
              <th>Date</th>
              {uniqueTimes.map((time, index) => (
                <th key={index}>{time}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dates.map((date) => (
              <tr key={date}>
                <td className="date-cell">
                  {new Date(date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    weekday: "short",
                  })}
                </td>
                {uniqueTimes.map((time, index) => {
                  const status = getSlotStatus(date, time);
                  return (
                    <td
                      key={index}
                      className={`slot-cell ${status ? status : "empty"}`}
                    ></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color available"></div> Green – Available
        </div>
        <div className="legend-item">
          <div className="legend-color booked"></div> Red – Booked
        </div>
        <div className="legend-item">
          <div className="legend-color blocked"></div> Yellow – Blocked
        </div>
      </div>
    </div>
  );
};

export default MonthlySlotsView;

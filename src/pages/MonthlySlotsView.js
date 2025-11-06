import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import "./MonthlySlotsView.css";


const MonthlySlotsView = () => {
  const [slotsData, setSlotsData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  });
  const [uniqueTimes, setUniqueTimes] = useState([]);


  // Fetch slot data
  const fetchSlots = async () => {
    try {
      const res = await fetch(
        "https://gist.githubusercontent.com/santulanneurotherapy/6681176a55e02ed339a9793d46378747/raw/gistfile1.txt?nocache=" +
          Date.now()
      );
      const text = await res.text();
      const jsonData = JSON.parse(text);
      setSlotsData(jsonData);

      const allTimes = new Set();
      Object.values(jsonData).forEach((daySlots) => {
        daySlots.forEach((slot) => allTimes.add(slot.time));
      });

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

  const getSlot = (date, time) => {
    if (!slotsData[date]) return null;
    return slotsData[date].find((s) => s.time === time) || null;
  };

  const downloadPDF = () => {
    const doc = new jsPDF("landscape");
    const [year] = selectedMonth.split("-").map(Number);
    const monthName = new Date(selectedMonth + "-01").toLocaleString("default", {
      month: "long",
    });

    doc.setFontSize(20);
    doc.setTextColor(40, 60, 120);
    doc.text(`Monthly Appointment Report — ${monthName} ${year}`, 14, 20);

    const dates = getDatesForMonth(selectedMonth);
    const tableHead = ["Date", ...uniqueTimes];
    const tableBody = [];
    let summary = { available: 0, booked: 0, blocked: 0 };

    dates.forEach((date) => {
      const row = [
        new Date(date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          weekday: "short",
        }),
      ];

      uniqueTimes.forEach((time) => {
        const slot = getSlot(date, time);
        if (!slot) {
          row.push("");
          return;
        }

        if (slot.status === "available") summary.available++;
        if (slot.status === "booked") summary.booked++;
        if (slot.status === "blocked") summary.blocked++;

        let displayText = slot.reason
          ? slot.reason
          : slot.status
          ? slot.status.charAt(0).toUpperCase() + slot.status.slice(1)
          : "";

        row.push(displayText);
      });

      tableBody.push(row);
    });

    autoTable(doc, {
      startY: 30,
      head: [tableHead],
      body: tableBody,
      styles: { fontSize: 8, cellPadding: 2, halign: "center" },
      headStyles: { fillColor: [40, 60, 120], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      didParseCell: (data) => {
        if (data.section === "body" && data.column.index > 0) {
          const rowDate = dates[data.row.index];
          const time = uniqueTimes[data.column.index - 1];
          const slot = getSlot(rowDate, time);

          if (slot?.status === "available") {
            data.cell.styles.fillColor = [76, 175, 80];
            data.cell.styles.textColor = [255, 255, 255];
          } else if (slot?.status === "booked") {
            data.cell.styles.fillColor = [244, 67, 54];
            data.cell.styles.textColor = [255, 255, 255];
          } else if (slot?.status === "blocked") {
            data.cell.styles.fillColor = [255, 204, 0];
            data.cell.styles.textColor = [0, 0, 0];
          } else {
            data.cell.styles.fillColor = [240, 240, 240];
            data.cell.styles.textColor = [0, 0, 0];
          }
        }
      },
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text("Summary:", 14, finalY);
    doc.setFontSize(12);
    doc.text(` Available Slots: ${summary.available}`, 14, finalY + 8);
    doc.text(` Booked Slots: ${summary.booked}`, 14, finalY + 16);
    doc.text(` Blocked Slots: ${summary.blocked}`, 14, finalY + 24);

    doc.save(`Appointment_Report_${monthName}_${year}.pdf`);
  };

  const dates = getDatesForMonth(selectedMonth);
  
const navigate = useNavigate();


  return (
    <div className="monthly-container">
      <h1 className="monthly-title">Monthly Appointment Overview</h1>

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
                  const slot = getSlot(date, time);
                  const status = slot?.status || "empty";
                  const text =
                    slot?.reason ||
                    (status === "available"
                      ? "Available"
                      : status === "booked"
                      ? "Booked"
                      : status === "blocked"
                      ? "Blocked"
                      : "");
                  return (
                    <td key={index} className={`slot-cell ${status}`}>
                      {text}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      <div className="button-group">
        <button className="download-btn" onClick={downloadPDF}>
          Download PDF
        </button>

        <button
          className="stats-btn"
          onClick={() => navigate("/statistics")}
        >
          View Website Visit Statistics
        </button>
        <button
      className="stats-btn"
      onClick={() => navigate("/visitor-log")}
    >
      View Visitor Logs
    </button>
      </div>
    </div>
  );
};

export default MonthlySlotsView;

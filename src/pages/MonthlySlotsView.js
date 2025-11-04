import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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

  // ✅ Updated to return the full slot (so we can access reason)
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

    // Title
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

        // ✅ Show reason instead of "Booked" if available
        let displayText = slot.status
          ? slot.status.charAt(0).toUpperCase() + slot.status.slice(1)
          : "";

        if (slot.status === "booked" && slot.reason) {
          displayText = slot.reason; // use reason instead of "Booked"
        }

        row.push(displayText);
      });

      tableBody.push(row);
    });

    // Add table to PDF
    autoTable(doc, {
      startY: 30,
      head: [tableHead],
      body: tableBody,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        halign: "center",
      },
      headStyles: {
        fillColor: [40, 60, 120],
        textColor: 255,
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    // Summary
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text("Summary:", 14, finalY);
    doc.setFontSize(12);
    doc.text(` Available Slots: ${summary.available}`, 14, finalY + 8);
    doc.text(` Booked Slots: ${summary.booked}`, 14, finalY + 16);
    doc.text(` Blocked Slots: ${summary.blocked}`, 14, finalY + 24);

    // Save file
    const fileName = `Appointment_Report_${monthName}_${year}.pdf`;
    doc.save(fileName);
  };

  const dates = getDatesForMonth(selectedMonth);

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
                  return (
                    <td
                      key={index}
                      className={`slot-cell ${status}`}
                    ></td>
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

      <button className="download-btn" onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default MonthlySlotsView;

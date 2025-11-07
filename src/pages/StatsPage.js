import React, { useEffect, useState } from "react";
import { logVisitor } from "./visitorLogger";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { getVisitData, getTotalVisits } from "./visitTracker";
import "./StatsPage.css";


const StatsPage = () => {
  const [visitData, setVisitData] = useState([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const COLORS = ["#072d4eff", "#df3f79ff", "#FFBB28", "#2bc43dff" , "#cd2727ff", "#34c9d4ff", "#09ffadff", "#c2dc19ff"];


  useEffect(() => {
    logVisitor("Stats Page");
    const loadStats = async () => {
      const data = await getVisitData();
      const total = await getTotalVisits();
      setVisitData(data);
      setTotalVisits(total);
    };

    loadStats();
    window.addEventListener("storage", loadStats);
    return () => window.removeEventListener("storage", loadStats);
  }, []);

  return (
    <div className="monthly-container">
      <h1 className="visit-title">Website Visit Statistics</h1>
      <h3>Total Visits Across All Pages: {totalVisits}</h3>

      {visitData.length > 0 ? (
        <>
          <div className="pie-chart-section">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <text
                  x="50%"
                  y="5%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="18"
                  fontWeight="bold"
                >
                  Percentage of Visits per Page
                </text>
                <Pie
                  data={visitData}
                  cx="50%"
                  cy="55%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {visitData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bar-chart-section">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={visitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#b8bb17ff" name="Visits per Page" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <p>Loading visit data...</p>
      )}
    </div>
  );
};

export default StatsPage;

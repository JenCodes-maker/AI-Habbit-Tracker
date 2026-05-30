import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HabitChart = ({ habits }) => {
  console.log(
  habits.map((h) => Number(h.streak) || 0)
);
  const data = {
    labels: habits.map((h) => h.title),

    datasets: [
  {
    label: "Habit Streaks",
    data: habits.map((h) => Number(h.streak) || 0),

    backgroundColor: [
      "#22c55e",
      "#06b6d4",
      "#a855f7",
    ],

    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
  },
],
  };
 

  return (
    <div className="bg-white/10 p-5 rounded-3xl mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Weekly Progress 📊
      </h2>

      <div className="h-[220px]">
  <Bar
  data={data}
  options={{
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#94a3b8",
        },
        grid: {
          display: false,
        },
      },

      y: {
  beginAtZero: true,
  max: 5,

  ticks: {
    color: "#94a3b8",
    stepSize: 1,
  },

  grid: {
    color: "rgba(255,255,255,0.08)",
  },
},
    },
  }}
/>
</div>
    </div>
  );
};

export default HabitChart;
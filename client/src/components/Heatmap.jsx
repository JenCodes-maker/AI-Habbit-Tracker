import CalendarHeatmap from "react-calendar-heatmap";
import "./Heatmap.css";

const Heatmap = ({ habits }) => {
  const dateMap = {};

habits.forEach((habit) => {
  habit.completionDates?.forEach(
    (date) => {
      const day = new Date(date)
        .toISOString()
        .split("T")[0];

      dateMap[day] =
        (dateMap[day] || 0) + 1;
    }
  );
});

const values = Object.keys(dateMap).map(
  (date) => ({
    date,
    count: Math.min(
      dateMap[date],
      4
    ),
  })
);

  return (
    <div className="bg-white/10 p-8 rounded-3xl mb-8 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">
        Consistency Heatmap 🔥
      </h2>

      <div className="overflow-x-auto">
        <CalendarHeatmap
          horizontal={true}
          startDate={
            new Date(
              Date.now() - 365 * 86400000
            )
          }
          endDate={new Date()}
          values={values}
          gutterSize={2}
          showWeekdayLabels={true}
          classForValue={(value) => {
            if (!value || value.count === 0)
              return "color-empty";

            return `color-scale-${value.count}`;
          }}
        />
      </div>

      <div className="flex justify-end items-center gap-2 mt-4 text-sm text-gray-400">
        <span>Less</span>

        <div className="w-3 h-3 rounded bg-gray-700"></div>
        <div className="w-3 h-3 rounded bg-green-900"></div>
        <div className="w-3 h-3 rounded bg-green-700"></div>
        <div className="w-3 h-3 rounded bg-green-500"></div>

        <span>More</span>
      </div>
    </div>
  );
};

export default Heatmap;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import HabitChart from "../components/HabitChart";
import Heatmap from "../components/Heatmap";
import { Link } from "react-router-dom";


const userName =
  localStorage.getItem("userName");
<h1 className="text-4xl font-bold text-white whitespace-nowrap">
  Good Morning, {userName} ☀️
</h1>

const Dashboard = () => {
  useEffect(() => {
  document.title = "HabitAI Dashboard";
}, []);
  const navigate = useNavigate();

  const [habits, setHabits] = useState([]);
  const [search, setSearch] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      fetchHabits();
    }
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await API.get(
  `/habits?userId=${localStorage.getItem(
    "userId"
  )}`
);
      setHabits(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/habits", {
  ...formData,
  userId:
    localStorage.getItem("userId"),
});

      // alert("Habit Added 🔥");

      setFormData({
        title: "",
        category: "",
      });

      fetchHabits();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/habits/${id}`);
      fetchHabits();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = async (id) => {
    try {
      await API.put(`/habits/${id}`);
      fetchHabits();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (habit) => {
    const newTitle = prompt(
      "Enter new title",
      habit.title
    );

    const newCategory = prompt(
      "Enter new category",
      habit.category
    );

    if (!newTitle || !newCategory) return;

    try {
      await API.put(
        `/habits/edit/${habit._id}`,
        {
          title: newTitle,
          category: newCategory,
        }
      );

      fetchHabits();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
  <div className="flex min-h-screen bg-[#070B17] text-white">
    <div className="fixed left-0 top-0 h-screen w-48 bg-[#0B1020] border-r border-gray-800 p-4">

  <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-8">
    habitai
  </h1>

  <div className="space-y-3">

  <div
    onClick={() =>
      document.getElementById("dashboard")?.scrollIntoView({
        behavior: "smooth",
      })
    }
   className="flex items-center gap-2 p-3 text-lg rounded-xl bg-cyan-500/20 text-cyan-400 cursor-pointer"
  >
    📊 Dashboard
  </div>

  <div
    onClick={() =>
      document.getElementById("habits")?.scrollIntoView({
        behavior: "smooth",
      })
    }
    className="flex items-center gap-2 p-3 text-lg rounded-xl hover:bg-cyan-500/20 hover:text-cyan-400 cursor-pointer transition-all duration-300 hover:translate-x-2"
  >
    ✅ My Habits
  </div>

  <div
    onClick={() =>
      document.getElementById("analytics")?.scrollIntoView({
        behavior: "smooth",
      })
    }
    className="flex items-center gap-2 p-3 text-lg rounded-xl hover:bg-cyan-500/20 hover:text-cyan-400 cursor-pointer transition-all duration-300 hover:translate-x-2"
  >
    📈 Analytics
  </div>

</div>

  <button
  onClick={() => {
    localStorage.removeItem("token");
    navigate("/login");
  }}
  className="flex items-center gap-3 p-4 rounded-xl text-red-400 hover:bg-red-500/10 w-full"
>
  🚪 Logout
</button>

</div>

<div id="dashboard" className="ml-48 flex-1 p-8">

  <div className="flex items-center justify-between gap-8 mb-10">

  <h1 className="text-4xl font-bold text-white whitespace-nowrap">
    Good Morning, {userName} ☀️
  </h1>

  <p className="text-gray-400 mt-2 whitespace-nowrap">
    Stay consistent and grow your streak every day
  </p>

  <input
        type="text"
        placeholder="Search habits..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="p-3 rounded-xl bg-black/30 border border-white/10 outline-none w-80"
      />

</div>

        
      <form
        onSubmit={handleSubmit}
        className="mt-8 mb-8 flex gap-4 bg-white/10 backdrop-blur-lg p-5 rounded-2xl max-w-3xl"
      >
        <input
          type="text"
          name="title"
          placeholder="Habit Title"
          value={formData.title}
          onChange={handleChange}
          className="p-3 rounded-xl bg-black/30 border border-white/10 outline-none"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="p-3 rounded-xl bg-black/30 border border-white/10 outline-none"
        />

        <button
          type="submit"
          className="bg-cyan-500 px-5 rounded-xl"
        >
          Add Habit
        </button>
      </form>

      

      <button
        onClick={() =>
          setShowCompleted(!showCompleted)
        }
        className="bg-purple-500 px-4 py-2 rounded-xl mb-6"
      >
        {showCompleted
          ? "Show All"
          : "Show Completed"}
      </button>

      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="bg-cyan-500/20 p-5 rounded-2xl">
          <h2 className="text-2xl font-bold">
            {habits.reduce(
  (total, habit) =>
    total + habit.streak,
  0
)}
          </h2>
          <p className="text-gray-400">
🔥 Current Streak
</p>
        </div>


        <div className="bg-green-500/20 p-5 rounded-2xl">
          <h2 className="text-2xl font-bold">
            {
 habits.length === 0
 ? 0
 : Math.round(
     habits.filter(
       (h) => h.completed
     ).length /
       habits.length *
       100
   )
}
%
          </h2>
          <p className="text-gray-400">
🎯 Completion Rate
</p>
        </div>

        <div className="bg-orange-500/20 p-5 rounded-2xl">
          <h2 className="text-2xl font-bold">
            {habits.length}
          </h2>
          <p className="text-gray-400">
📊 Total Habits
</p>
        </div>
      </div>

      <div id="analytics">
  <HabitChart habits={habits} />
</div>

<div className="bg-white/10 rounded-3xl p-5 mb-8">
  <Heatmap habits={habits} />
</div>

      <div className="p-5 rounded-3xl border border-white/10 transition-all duration-300 hover:shadow-lg">

  <h2 className="text-2xl font-bold mb-4">
    Progress Overview 🎯
  </h2>

  <p className="text-xl">
    Completion Rate:
    {" "}
    {
      habits.length === 0
        ? 0
        : Math.round(
            (
              habits.filter(
                (h) => h.completed
              ).length /
              habits.length
            ) * 100
          )
    }
    %
  </p>

</div>

      <div id="habits" className="grid grid-cols-3 gap-5 mt-8">
        {habits
          .filter((habit) =>
            habit.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          )
          .filter((habit) =>
            showCompleted
              ? habit.completed
              : true
          )
          .map((habit) => (
            <div
              key={habit._id}
              className={`p-5 rounded-3xl border border-white/10 ${
                habit.completed
                  ? "bg-green-500/20"
                  : "bg-white/10"
              }`}
            >
              <h2 className="text-2xl font-bold">
                {habit.title}
              </h2>

              <p>{habit.category}</p>

              <p className="mt-2 text-cyan-300">
                🔥 Streak: {habit.streak}
              </p>

              

              <div className="mt-4 flex gap-2 flex-wrap">
                <button
                  onClick={() =>
                    handleDelete(
                      habit._id
                    )
                  }
                  className="bg-red-500 px-4 py-2 rounded"
                >
                  Delete
                </button>

                <button
                  onClick={() =>
                    handleToggle(
                      habit._id
                    )
                  }
                  className="bg-green-500 px-4 py-2 rounded"
                >
                  {habit.completed
                    ? "Completed ✅"
                    : "Complete"}
                </button>

                <button
                  onClick={() =>
                    handleEdit(habit)
                  }
                  className="bg-yellow-500 px-4 py-2 rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
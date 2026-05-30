import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
  path="/habits"
  element={<Habits />}
/>

<Route
  path="/analytics"
  element={<Analytics />}
/>

<Route
  path="/settings"
  element={<Settings />}
/>

      </Routes>

    </BrowserRouter>

  );
}

export default App;
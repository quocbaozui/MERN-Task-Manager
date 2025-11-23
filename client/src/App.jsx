import { Routes, Route, Link } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  return (
    // data-theme="forest" sẽ ăn màu ngay lập tức nhờ min-h-screen
    <div
      className="min-h-screen bg-base-200 text-base-content"
      data-theme="forest"
    >
      <Navbar />

      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;

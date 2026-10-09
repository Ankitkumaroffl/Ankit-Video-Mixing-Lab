import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import About from "./pages/About";
import Gallery from "./Pages/Gallery";
import Contact from "./Pages/Contact";

import Notice from "./Pages/Notice";
import Services from "./Pages/Services";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Admin from "./Pages/Admin";


// ==========================================
// GET CURRENT USER
// ==========================================

function getCurrentUser() {
  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);

  } catch (error) {
    console.error("User data error:", error);
    return null;
  }
}


// ==========================================
// ADMIN PROTECTED ROUTE
// ==========================================

function AdminRoute() {

  const user = getCurrentUser();

  // User login nahi hai
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin check
  // "Admin" aur "admin" dono accept honge
  if (user.role?.toLowerCase() !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // Admin hai
  return <Admin />;
}


// ==========================================
// MAIN APP
// ==========================================

function App() {

  return (
    <BrowserRouter>

      {/* NAVBAR */}
      <Navbar />

      <main>

        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* ABOUT */}
          <Route
            path="/about"
            element={<About />}
          />

          {/* GALLERY */}
          <Route
            path="/gallery"
            element={<Gallery />}
          />

          {/* NOTICE */}
          <Route
            path="/notice"
            element={<Notice />}
          />

          {/* SERVICES */}
          <Route
            path="/services"
            element={<Services />}
          />

          {/* CONTACT */}
          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={<Register />}
          />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* =================================
              ADMIN - PROTECTED
          ================================= */}
          <Route
            path="/admin"
            element={<AdminRoute />}
          />

          {/* UNKNOWN URL */}
          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>

      </main>

      {/* FOOTER */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;
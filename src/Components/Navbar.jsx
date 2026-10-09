
import { Link, NavLink } from "react-router-dom";
import { Film, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  // ===============================
  // LOAD USER FROM LOCAL STORAGE
  // ===============================

  const loadUser = () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("User data error:", error);
      setUser(null);
    }
  };

  // ===============================
  // LISTEN FOR USER CHANGES
  // ===============================

  useEffect(() => {
    // Load user when Navbar starts
    loadUser();

    // Listen after login/logout
    const handleUserChanged = () => {
      loadUser();
    };

    window.addEventListener(
      "userChanged",
      handleUserChanged
    );

    return () => {
      window.removeEventListener(
        "userChanged",
        handleUserChanged
      );
    };
  }, []);

  // ===============================
  // ADMIN CHECK
  // ===============================

  const isAdmin =
    user?.role?.toLowerCase() === "admin";

  // ===============================
  // NAVIGATION LINKS
  // ===============================

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Gallery",
      path: "/gallery",
    },
    {
      name: "Notice",
      path: "/notice",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  // ===============================
  // CLOSE MOBILE MENU
  // ===============================

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <nav className="navbar">

      <div className="nav-container">

        {/* ===============================
            LOGO
        =============================== */}

        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          <span className="logo-icon">
            <Film size={22} />
          </span>

          <span>
            ANKIT
            <strong>
              VIDEO MIXING LAB
            </strong>
          </span>
        </Link>


        {/* ===============================
            NAVIGATION
        =============================== */}

        <div
          className={`nav-links ${
            open ? "active" : ""
          }`}
        >

          {/* MAIN LINKS */}

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
            >
              {link.name}
            </NavLink>
          ))}


          {/* ===============================
              LOGIN
          =============================== */}

          {!user && (
            <Link
              to="/login"
              className="nav-login"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}


          {/* ===============================
              GET STARTED
          =============================== */}

          {!user && (
            <Link
              to="/register"
              className="nav-register"
              onClick={closeMenu}
            >
              Get Started
            </Link>
          )}


          {/* ===============================
              DASHBOARD
          =============================== */}

          {user && (
            <Link
              to="/dashboard"
              className="nav-login"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          )}


          {/* ===============================
              ADMIN
              ONLY ADMIN CAN SEE
          =============================== */}

          {isAdmin && (
            <Link
              to="/admin"
              className="nav-link"
              onClick={closeMenu}
            >
              Admin
            </Link>
          )}

        </div>


        {/* ===============================
            MOBILE MENU BUTTON
        =============================== */}

        <button
          type="button"
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </div>

    </nav>
  );
}

export default Navbar;


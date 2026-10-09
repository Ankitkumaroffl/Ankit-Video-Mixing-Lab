import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Calendar,
  User,
  MessageSquare,
  RefreshCw,
  Inbox,
} from "lucide-react";

function Admin() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===============================
  // CHECK ADMIN ACCESS
  // ===============================

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);

      // Case-insensitive admin check
      if (user.role?.toLowerCase() !== "admin") {
        navigate("/dashboard");
        return;
      }

      fetchContacts(token);

    } catch (error) {
      console.error("User Data Error:", error);

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      navigate("/login");
    }
  }, [navigate]);


  // ===============================
  // FETCH CONTACTS
  // ===============================

  const fetchContacts = async (authToken) => {
    try {
      setLoading(true);
      setError("");

      const token =
        authToken || localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");

          navigate("/login");
          return;
        }

        if (response.status === 403) {
          navigate("/dashboard");
          return;
        }

        throw new Error(
          data.message || "Failed to fetch contacts"
        );
      }

      setContacts(data.contacts || []);

    } catch (error) {
      console.error("Admin Error:", error);

      setError(
        error.message ||
          "Unable to load booking requests"
      );

    } finally {
      setLoading(false);
    }
  };


  // ===============================
  // REFRESH
  // ===============================

  const handleRefresh = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchContacts(token);
  };


  // ===============================
  // ADMIN PAGE
  // ===============================

  return (
    <section className="admin-page">

      <div className="admin-orb admin-orb-one"></div>
      <div className="admin-orb admin-orb-two"></div>

      <div className="admin-container">

        {/* ================= HEADER ================= */}

        <motion.div
          className="admin-header"
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >

          <div>

            <span className="admin-label">
              ADMIN PANEL
            </span>

            <h1>
              Booking <span>Requests</span>
            </h1>

            <p>
              Manage your customer contact and booking
              requests from one place.
            </p>

          </div>

          <button
            className="admin-refresh"
            onClick={handleRefresh}
            disabled={loading}
          >

            <RefreshCw
              size={18}
              className={
                loading
                  ? "admin-spin"
                  : ""
              }
            />

            {loading
              ? "Loading..."
              : "Refresh"}

          </button>

        </motion.div>


        {/* ================= STATS ================= */}

        <motion.div
          className="admin-stats"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
        >

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <Inbox size={22} />
            </div>

            <div>

              <span>
                Total Requests
              </span>

              <strong>
                {contacts.length}
              </strong>

            </div>

          </div>


          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <MessageSquare size={22} />
            </div>

            <div>

              <span>
                Messages
              </span>

              <strong>
                {contacts.length}
              </strong>

            </div>

          </div>

        </motion.div>


        {/* ================= ERROR ================= */}

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}


        {/* ================= LOADING ================= */}

        {loading ? (

          <div className="admin-loading">

            <RefreshCw
              size={28}
              className="admin-spin"
            />

            <p>
              Loading booking requests...
            </p>

          </div>

        ) : contacts.length === 0 ? (

          /* ================= EMPTY ================= */

          <motion.div
            className="admin-empty"
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
          >

            <Inbox size={45} />

            <h2>
              No Requests Yet
            </h2>

            <p>
              Customer booking requests will appear
              here when someone submits the contact form.
            </p>

          </motion.div>

        ) : (

          /* ================= REQUEST LIST ================= */

          <div className="admin-list">

            {contacts.map((contact, index) => (

              <motion.div
                className="admin-card"
                key={contact.id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >

                {/* CARD HEADER */}

                <div className="admin-card-header">

                  <div className="admin-customer">

                    <div className="admin-avatar">
                      <User size={20} />
                    </div>

                    <div>

                      <h3>
                        {contact.name}
                      </h3>

                      <span>
                        Request #{contact.id}
                      </span>

                    </div>

                  </div>


                  <div className="admin-service">
                    {contact.service ||
                      "General Inquiry"}
                  </div>

                </div>


                {/* DETAILS */}

                <div className="admin-details">

                  <div>
                    <Mail size={17} />

                    <span>
                      {contact.email}
                    </span>
                  </div>

                  <div>
                    <Phone size={17} />

                    <span>
                      {contact.phone ||
                        "Not provided"}
                    </span>
                  </div>

                  <div>
                    <Calendar size={17} />

                    <span>
                      {new Date(
                        contact.created_at
                      ).toLocaleString()}
                    </span>
                  </div>

                </div>


                {/* MESSAGE */}

                <div className="admin-message">

                  <div className="admin-message-title">

                    <MessageSquare size={17} />

                    <span>
                      Project Details
                    </span>

                  </div>

                  <p>
                    {contact.message}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}

export default Admin;
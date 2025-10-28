
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    open: 0,
    in_progress: 0,
    closed: 0,
  });

  useEffect(() => {
    // Check if a user session exists
    const session = JSON.parse(localStorage.getItem("ticketapp_session"));
    if (!session) {
      navigate("/login");
    } else {
      setUser(session);
    }
  }, [navigate]);


  useEffect(() => {
    if (!user) return;

    // read per-user tickets from localStorage
    const storageKey = `tickets_${user.email}`;
    let storedTickets = [];
    try {
      storedTickets = JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch (err) {
      console.warn("Failed to parse stored tickets for dashboard", err);
      storedTickets = [];
    }
    const userTickets = storedTickets;

    const openCount = userTickets.filter((t) => t.status === "open").length;
    const inProgressCount = userTickets.filter((t) => t.status === "in_progress").length;
    const closedCount = userTickets.filter((t) => t.status === "closed").length;

    setStats({
      open: openCount,
      in_progress: inProgressCount,
      closed: closedCount,
    });
  }, [user]);


  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    navigate("/login");
  };

  return (
    
      <main className="dashboard">
        <header className="dashboard-header">
          <h1>🎟️ Ticket Dashboard</h1>
          <div className="user-section">
            <div className="user-info">
              <span className="user-greeting">Welcome,</span>
              <span className="user-email">{user?.email}</span>
            </div>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </header>
         
        <section className="stats-section">
          <div className="stat-card open">
            <h3>Open Tickets</h3>
            <p>{stats.open}</p>
          </div>
        <div className="stat-card in_progress">
          <h3>In Progress Tickets</h3>
          <p>{stats.in_progress}</p>
        </div>
        <div className="stat-card closed">
          <h3>Closed Tickets</h3>
          <p>{stats.closed}</p>
        </div>
        </section>

        <section className="ticket-list">
          <h2>My Tickets</h2>
          <p>View or manage your tickets in the Ticket Manager page.</p>
        </section>
        
      </main>
    
  );
}


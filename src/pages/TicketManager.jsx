import { useState, useEffect } from "react";
import "./dashboard.css"; // reuse dashboard styles
import { useToast } from "../context/useToast";

// Small edit form used in the modal
function EditForm({ ticket, onCancel, onSave }) {
  const [title, setTitle] = useState(ticket.title || "");
  const [description, setDescription] = useState(ticket.description || "");
  const [status, setStatus] = useState(ticket.status || "open");
  const [error, setError] = useState("");

  const STATUS_OPTIONS = ["open", "in_progress", "closed"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return setError("Title is required");
    if (!STATUS_OPTIONS.includes(status)) return setError("Invalid status");
    const updated = { ...ticket, title: title.trim(), description: description.trim(), status };
    const ok = onSave(updated);
    if (!ok) return; // parent will show toast on error
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      {error && <p className="error-text">{error}</p>}
      <label>Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

      <label>Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>

      <div className="modal-actions">
        <button type="button" className="btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}

export default function TicketManager() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState(null);
  const { addToast } = useToast() || { addToast: () => {} };

  // Load user and tickets
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("ticketapp_session"));
    if (session) setUser(session);

    // per-user tickets storage key
    const storageKey = session ? `tickets_${session.email}` : null;
    let saved = [];
    try {
      saved = storageKey ? JSON.parse(localStorage.getItem(storageKey)) || [] : [];
    } catch (err) {
      console.warn("Failed to parse saved tickets for user", session?.email, err);
      saved = [];
    }
    setTickets(saved);
  }, []);

  // Save tickets to per-user localStorage key whenever changed
  useEffect(() => {
    if (!user?.email) return;
    const storageKey = `tickets_${user.email}`;
    try {
      localStorage.setItem(storageKey, JSON.stringify(tickets));
    } catch (err) {
      console.error("Failed to save tickets to localStorage", err);
    }
  }, [tickets, user]);

  // Cross-tab sync: update tickets when storage changes for this user
  useEffect(() => {
    const handler = (e) => {
      // e.key can be null for storage.clear(); ignore
      if (!e.key) return;
      const expected = `tickets_${user?.email}`;
      if (e.key === expected) {
        try {
          const newVal = e.newValue ? JSON.parse(e.newValue) : [];
          setTickets(newVal || []);
        } catch (err) {
          console.warn("Failed to parse tickets from storage event", err);
        }
      }
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [user?.email]);

  const handleAddTicket = (e) => {
    e.preventDefault();
    if (!title || !description) {
      addToast("Please fill all fields", "error");
      return;
    }
    if (!user) {
      addToast("You must be logged in", "error");
      return;
    }

    const newTicket = {
      id: Date.now(),
      user: user.email, // ✅ associate ticket with user
      title,
      description,
      status: "open",
    };

    setTickets((prev) => [...prev, newTicket]);
    setTitle("");
    setDescription("");
    addToast("Ticket created", "success");
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = tickets.map((t) =>
      t.id === id ? { ...t, status: newStatus } : t
    );
    setTickets(updated);
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this ticket?")) return;
    setTickets((prev) => prev.filter((t) => t.id !== id));
    addToast("Ticket deleted", "success");
  };

  // Edit modal state
  const [editing, setEditing] = useState(null);

  const STATUS_OPTIONS = ["open", "in_progress", "closed"];

  const openEdit = (ticket) => setEditing(ticket);

  const saveEdit = (updated) => {
    // validation
    if (!updated.title || !updated.title.trim()) {
      addToast("Title is required", "error");
      return false;
    }
    if (!STATUS_OPTIONS.includes(updated.status)) {
      addToast("Invalid status selected", "error");
      return false;
    }

    setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    addToast("Ticket updated", "success");
    setEditing(null);
    return true;
  };

  // ✅ Only show tickets belonging to the logged-in user
  const userTickets = tickets.filter((t) => t.user === user?.email);

  const filteredTickets =
    filter === "all" ? userTickets : userTickets.filter((t) => t.status === filter);

  return (
    <>
      {editing && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Edit Ticket</h3>
            <EditForm
              ticket={editing}
              onCancel={() => setEditing(null)}
              onSave={(updated) => saveEdit(updated)}
            />
          </div>
        </div>
      )}
      <main className="dashboard">
        <header className="dashboard-header">
          <h1>🎫 Ticket Manager</h1>
        </header>

        <section className="create-ticket">
          <h2>Create New Ticket</h2>
          <form onSubmit={handleAddTicket} className="ticket-form">
            <input
              type="text"
              placeholder="Enter ticket title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Describe the issue"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" className="btn-login">
              Add Ticket
            </button>
          </form>
        </section>

        <section className="ticket-list">
          <h2>My Tickets</h2>
          <div className="filter-section">
            <label>Filter:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {filteredTickets.length === 0 ? (
            <p>No tickets found for your account.</p>
          ) : (
            <ul className="ticket-items">
              {filteredTickets.map((ticket) => (
                <li key={ticket.id} className={`ticket ${ticket.status}`}>
                  <h3>{ticket.title}</h3>
                  <p>{ticket.description}</p>
                  <div className="ticket-actions">
                    <select
                      value={ticket.status}
                      onChange={(e) =>
                        handleStatusChange(ticket.id, e.target.value)
                      }
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => openEdit(ticket)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => handleDelete(ticket.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}

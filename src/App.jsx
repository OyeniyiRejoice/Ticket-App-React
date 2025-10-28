/*
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TicketManager from "./pages/TicketManager";
import "./app.css";

function App() {
  return (
    
      <Layout>
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tickets" element={<TicketManager />} />
      </Routes>
      </Layout>
  
  );
}

export default App;*/


import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TicketManager from "./pages/TicketManager";
import PrivateRoute from "./utils/PrivateRoute";
import "./app.css";

function App() {
  return (
    <Routes>
      {/* Public routes (no layout) */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
  <Route path="/auth/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
  {/* public /tickets route removed to ensure TicketManager is only reachable via the protected route below */}


      {/* Protected / internal routes (with layout) */}
      <Route
        path="/dashboard"
        element={

          <Layout>
            <PrivateRoute>
            <Dashboard />
            </PrivateRoute>
          </Layout>
        }
      />
      <Route
        path="/tickets"
        element={
          <Layout>
            <PrivateRoute>
            <TicketManager />
            </PrivateRoute>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;

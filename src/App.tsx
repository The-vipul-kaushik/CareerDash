import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ApplicationList from "./pages/ApplicationList";
import AddApplication from "./pages/AddApplication";
import EditApplication from "./pages/EditApplication";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import NotFound from "./pages/NotFound"; // Create a simple 404 page
import Landing from "./pages/Landing";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Landing /></Layout>} />
        <Route path="/login" element={<PublicRoute><Layout><Login /></Layout></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Layout><Register /></Layout></PublicRoute>} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/applications" element={<ProtectedRoute><Layout><ApplicationList /></Layout></ProtectedRoute>} />
        <Route path="/add-application" element={<ProtectedRoute><Layout><AddApplication /></Layout></ProtectedRoute>} />
        <Route path="/edit-application/:id" element={<ProtectedRoute><Layout><EditApplication /></Layout></ProtectedRoute>} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

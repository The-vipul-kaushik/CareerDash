import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ApplicationList from "./pages/ApplicationList";
import AddApplication from "./pages/AddApplication";
import EditApplication from "./pages/EditApplication";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Login /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/applications" element={<Layout><ApplicationList /></Layout>} />
        <Route path="/add-application" element={<Layout><AddApplication /></Layout>} />
        <Route path="/edit-application/:id" element={<Layout><EditApplication /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;

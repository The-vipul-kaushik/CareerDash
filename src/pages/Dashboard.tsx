import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [applicationsData, setApplicationsData] = useState<any[]>([]);
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    interviewing: 0,
    offered: 0,
    rejected: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicationsData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("🚨 No token found, redirecting to login...");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/job-applications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("API response:", response.data);

        // ✅ Backend returns { data: [...] }
        if (Array.isArray(response.data.data)) {
          setApplicationsData(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setApplicationsData([]);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("❌ Axios error:", err.response?.data || err.message);
          if (err.response?.status === 401 || err.response?.status === 403) {
            localStorage.removeItem("token");
            navigate("/login");
          }
        } else {
          console.error("❌ Unknown error:", err);
        }
      }
    };

    fetchApplicationsData();
  }, [navigate]);

  useEffect(() => {
    if (!Array.isArray(applicationsData)) return;

    setCounts({
      total: applicationsData.length,
      pending: applicationsData.filter((app) => app.status === "PENDING").length,
      interviewing: applicationsData.filter((app) => app.status === "INTERVIEWING").length,
      offered: applicationsData.filter((app) => app.status === "OFFERED").length,
      rejected: applicationsData.filter((app) => app.status === "REJECTED").length,
    });
  }, [applicationsData]);

  const animations = {
    total: useSpring({ number: counts.total, from: { number: 0 }, config: { duration: 1000 } }),
    pending: useSpring({ number: counts.pending, from: { number: 0 }, config: { duration: 1000 } }),
    interviewing: useSpring({ number: counts.interviewing, from: { number: 0 }, config: { duration: 1000 } }),
    offered: useSpring({ number: counts.offered, from: { number: 0 }, config: { duration: 1000 } }),
    rejected: useSpring({ number: counts.rejected, from: { number: 0 }, config: { duration: 1000 } }),
  };

  const stats = [
    { label: "Total Applications", value: animations.total, color: "#e3f2fd" },
    { label: "Pending", value: animations.pending, color: "#ffecb3" },
    { label: "Interviewing", value: animations.interviewing, color: "#fff9c4" },
    { label: "Offered", value: animations.offered, color: "#c8e6c9" },
    { label: "Rejected", value: animations.rejected, color: "#ffcdd2" },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
        Dashboard
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {stats.map(({ label, value, color }) => (
          <Grid item xs={12} sm={6} md={4} key={label}>
            <Card
              sx={{
                backgroundColor: color,
                textAlign: "center",
                height: 150,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 3,
                boxShadow: 2,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)", boxShadow: 4 },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                  {label}
                </Typography>
                <Typography variant="h4" sx={{ color: "#333" }}>
                  <animated.div>{value.number.to((n) => n.toFixed(0))}</animated.div>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
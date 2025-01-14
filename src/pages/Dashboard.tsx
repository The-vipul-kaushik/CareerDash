import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import axios from "axios";
import { useSpring, animated } from "react-spring";

const Dashboard = () => {
  const [applicationsData, setApplicationsData] = useState<any>([]);
  const [totalApplications, setTotalApplications] = useState<number>(0);
  const [pendingApplications, setPendingApplications] = useState<number>(0);
  const [acceptedApplications, setAcceptedApplications] = useState<number>(0);
  const [rejectedApplications, setRejectedApplications] = useState<number>(0);

  const totalAppsAnimation = useSpring({ number: totalApplications, from: { number: 0 }, config: { duration: 1000 } });
  const pendingAppsAnimation = useSpring({ number: pendingApplications, from: { number: 0 }, config: { duration: 1000 } });
  const acceptedAppsAnimation = useSpring({ number: acceptedApplications, from: { number: 0 }, config: { duration: 1000 } });
  const rejectedAppsAnimation = useSpring({ number: rejectedApplications, from: { number: 0 }, config: { duration: 1000 } });

  useEffect(() => {
    const fetchApplicationsData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/applications");
        setApplicationsData(response.data);
      } catch (err) {
        console.error("Error fetching applications data", err);
      }
    };

    fetchApplicationsData();
  }, []);

  useEffect(() => {
    setTotalApplications(applicationsData.length);
    setPendingApplications(applicationsData.filter((app: any) => app.status === "Pending").length);
    setAcceptedApplications(applicationsData.filter((app: any) => app.status === "Accepted").length);
    setRejectedApplications(applicationsData.filter((app: any) => app.status === "Rejected").length);
  }, [applicationsData]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Grid-based layout with flexible card widths */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Automatically adjusts the card size
          gap: 2,
        }}
      >
        <Card sx={{ backgroundColor: "#e3f2fd" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Total Applications
            </Typography>
            <Typography variant="h4">
              <animated.div>{totalAppsAnimation.number.to((n: number) => n.toFixed(0))}</animated.div>
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: "#fff3e0" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Pending Applications
            </Typography>
            <Typography variant="h4">
              <animated.div>{pendingAppsAnimation.number.to((n: number) => n.toFixed(0))}</animated.div>
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: "#c8e6c9" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Accepted Offers
            </Typography>
            <Typography variant="h4">
              <animated.div>{acceptedAppsAnimation.number.to((n: number) => n.toFixed(0))}</animated.div>
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: "#f8bbd0" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Rejected Applications
            </Typography>
            <Typography variant="h4">
              <animated.div>{rejectedAppsAnimation.number.to((n: number) => n.toFixed(0))}</animated.div>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;

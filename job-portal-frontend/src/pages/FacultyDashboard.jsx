import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await api.get(`/faculty/${user.userId}`);
        if (!res.data) {
        } else {
          setFaculty(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      api.get(`/applications/faculty/${faculty?.id}`).then((res) => {
        console.log(res);
        setApplications(res?.data);
      });
    }
  }, [faculty]);

  console.log(faculty);
  console.log(applications);

  return (
    <div className="faculty-dashboard">
    <div className="college-dashboard">
      <div className="dashboard-header">
        <h2 style={{ textAlign: "left" }}>Faculty Dashboard</h2>

        {faculty ? (
          <>
            <h2>Welcome, {faculty?.fullName}</h2>
            <p>
              <strong>Location:</strong> {faculty?.address}
            </p>
            <p>
              <strong>Contact:</strong> {faculty?.contact}
            </p>
          </>
        ) : (
          <p style={{ color: "red" }}>Please Complete Profile to Apply Jobs!</p>
        )}
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/faculty/profile">Faculty Profile</Link>
        </div>
      </div>

      <h3 className="section-title">Your Applications</h3>
      <div className="job-list">
        {applications?.length === 0 ? (
          <p className="no-jobs">No jobs applied yet.</p>
        ) : (
          applications.map((a) => (
            <div key={a.id} className="college-job-card">
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ fontWeight: "bolder", margin: 0 }}>
                  Job: <span>{a.job?.title}</span> | Status:{" "}
                  <span style={{ color: "red" }}>{a?.status}</span>
                </p>
                <Link
                  to={`/apply/${a?.job?.id}`}
                  className="view-btn"
                >
                  View Application →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
}

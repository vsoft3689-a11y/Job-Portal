import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import "../App.css"; // Import CSS

export default function ApplicationsPage() {
  const { id } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get(`/applications/job/${id}`).then((res) => {
      setApplications(res.data);
    });
  }, [id]);

  const handleStatusChange = (appId, newStatus) => {
    api
      .put(`/applications/${appId}/status?status=${newStatus}`)
      .then((res) => {
        // Update state after status change
        setApplications((prev) =>
          prev.map((app) =>
            app.id === appId ? { ...app, status: newStatus } : app
          )
        );
      })
      .catch((err) => console.error(err));
  };
  console.log(applications);
  return (
    <div className="applications-container">
      <div className="applications-page">
        {applications.length > 0 ? (
          <h2>Applications for {applications[0]?.job?.title}</h2>
        ) : (
          <h2>Applications</h2>
        )}
        <br />
        <ul className="applications-list">
          {applications.length > 0 ? (
            applications.map((app) => (
              <li key={app.id} className="application-item">
                <div className="app-info">
                  <div className="faculty-details">
                    <p>
                      <strong>Name:</strong> {app.faculty.fullName}
                    </p>
                    <p>
                      <strong>Department:</strong> {app.faculty.department}
                    </p>
                    <p>
                      <strong>Experience:</strong> {app.faculty.experience}{" "}
                      years
                    </p>
                    <p>
                      <strong>Address:</strong> {app.faculty.address}
                    </p>
                    <p>
                      <strong>Contact:</strong> {app.faculty.contact}
                    </p>
                  </div>

                  <div className="app-actions">
                    <a
                      className="resume-link"
                      href={`http://localhost:8080/uploads/${app.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>

                    <select
                      value={app.status || "SELECT"}
                      onChange={(e) =>
                        handleStatusChange(app.id, e.target.value)
                      }
                    >
                      <option value="SELECT" disabled>
                        Update Status
                      </option>
                      <option value="SHORTLISTED">Shortlist</option>
                      <option value="REJECTED">Reject</option>
                    </select>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "30vh",
              }}
            >
              <p
                style={{
                  width: "550px",
                  padding: "40px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  backgroundColor: "#f9f9f9",
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "#333",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                No Applications Found
              </p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

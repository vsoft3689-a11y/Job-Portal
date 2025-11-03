import React, { useEffect, useState } from "react";
import api from "../api/api";
import "../App.css";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get("/applications").then((res) => {
      setApplications(res.data);
    });
  }, []);

  return (
    <div className="admin-applications-container">
      <h2>Manage Applications</h2>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Job Title</th>
              <th>Applied By</th>
              <th>Posted By</th>
              <th>Job Location</th>
              <th>Experience (Years)</th>
              <th>Applied Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app.id}>
                <td>{index + 1}</td>
                <td>{app?.job?.title}</td>
                <td>{app?.faculty?.fullName}</td>
                <td>{app?.job?.college?.name}</td>
                <td>{app?.job?.college?.address}</td>
                <td>{app?.faculty?.experience}</td>
                <td>{app?.appliedAt}</td>
                <td
                  className={`status ${
                    app?.status === "SHORTLISTED"
                      ? "active"
                      : app?.status === "REJECTED"
                      ? "inactive"
                      : ""
                  }`}
                >
                  {app?.status || "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminApplications;

import { useEffect, useState } from "react";
import api from "../api/api";
import "../App.css";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs").then((res) => {
      setJobs(res.data);
    });
  }, []);

  const handleStatus = (id, status) => {
    const newStatus = status === "active" ? "inactive" : "active";

    api
      .put(`/jobs/${id}`, { status: newStatus })
      .then((res) => {
        const updatedJob = res.data;
        setJobs((prev) =>
          prev.map((c) => (c.id === updatedJob.id ? updatedJob : c))
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="admin-jobs-container">
      <h2>Manage Jobs</h2>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Job Title</th>
              <th>Department</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Salary</th>
              <th>Posted By</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.id}>
                <td>{index + 1}</td>
                <td>{job?.title}</td>
                <td>{job?.department}</td>
                <td>{job?.qualification}</td>
                <td>{job?.experience}</td>
                <td>{job?.salary}</td>
                <td>{job?.college?.name}</td>
                <td
                  className={`status ${
                    job?.status === "active" ? "active" : "inactive"
                  }`}
                >
                  {job?.status}
                </td>
                <td>
                  <button
                    className={`admin-btn ${
                      job?.status === "active"
                        ? "inactivate-btn"
                        : "activate-btn"
                    }`}
                    onClick={() => handleStatus(job.id, job.status)}
                  >
                    {job?.status === "active" ? "Inactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminJobs;

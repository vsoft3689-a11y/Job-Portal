import { useEffect, useState } from "react";
import api from "../api/api";
import "../App.css";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [colleges, setColleges] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    api.get("/colleges").then((res) => {
      setColleges(res.data);
    });
    api.get("/jobs").then((res) => {
      setJobs(res.data);
    });
    api.get("/applications").then((res) => {
      setApplications(res.data);
    });
    api.get("/faculty").then((res) => {
      setFaculty(res.data);
    });
  }, []);

  const approvedColleges = colleges.filter((c) => c.verified);
  const pendingColleges = colleges.filter((c) => !c.verified);

  return (
    <div className="admin-container">
      <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>

        {/* Top Stats */}
        <div className="dashboard-stats">
          <section>
            <h3>Total Colleges</h3>
            <p>{colleges.length}</p>
          </section>
          <section>
            <h3>Pending Approvals</h3>
            <p>{pendingColleges.length}</p>
          </section>
          <section>
            <h3>Verified Colleges</h3>
            <p>{approvedColleges.length}</p>
          </section>

          <section>
            <h3>Total Faculty</h3>
            <p>{faculty.length}</p>
          </section>
          <section>
            <h3>Total Jobs Posted</h3>
            <p>{jobs.length}</p>
          </section>
          <section>
            <h3>Total Applications Received</h3>
            <p>{applications.length}</p>
          </section>
        </div>

        {/* Management Section */}
        <div className="management-section">
          <section>
            <h3>Manage College</h3> <br />
            {/* <p>View, verify, or delete registered college.</p> */}
            <Link to="/admin/college">View</Link>
          </section>
          <section>
            <h3>Manage Faculty</h3> <br />
            {/* <p>View, verify, or delete registered faculty.</p> */}
            <Link to="/admin/faculty">View</Link>
          </section>
          <section>
            <h3>Manage Jobs</h3> <br />
            {/* <p>View, approve, or remove job listings.</p> */}
            <Link to="/admin/jobs">View</Link>
          </section>
          <section>
            <h3>Manage Applications</h3> <br />
            {/* <p>Review and update job applications.</p> */}
            <Link to="/admin/applications">View</Link>
          </section>
        </div>
      </div>
    </div>
  );
}

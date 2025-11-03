import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import "../App.css";

export default function CollegeDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [college, setCollege] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch college info
  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const res = await api.get(`/colleges/${user.userId}`);
        if (res.data) setCollege(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [user.userId]);

  // Fetch jobs for college
  useEffect(() => {
    if (!college?.id) return;

    const fetchJobsWithApplicants = async () => {
      try {
        const jobsRes = await api.get(`/jobs/college/${college.id}`);
        const jobsData = jobsRes.data;

        // Fetch total applicants for each job
        const jobsWithCounts = await Promise.all(
          jobsData.map(async (job) => {
            const appsRes = await api.get(`/applications/job/${job.id}`);
            return { ...job, totalApplicants: appsRes.data.length };
          })
        );

        setJobs(jobsWithCounts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobsWithApplicants();
  }, [college]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="college-container">
    <div className="college-dashboard">
      <div className="dashboard-header">
        <h2 style={{textAlign:"left"}}>College Dashboard</h2>
        <br />
        {college ? (
          <>
            <h2>Welcome, {college.name}</h2>
            <p>
              <strong>Location:</strong> {college.address}
            </p>
            <p>
              <strong>Contact:</strong> {college.contact}
            </p>
          </>
        ) : (
          <p style={{ color: "red" }}>
            Please complete your profile to post jobs!
          </p>
        )}

        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/college/profile">College Profile</Link>
          {college && college.verified ? (
            <Link to="/post-job" className="post-job-btn">
              + Post Job
            </Link>
          ) : (
            <div className="approval-pending">
              🕓 Approval Pending from Admin. You’ll be able to post jobs once
              approved.
            </div>
          )}
        </div>
      </div>

      <h3 className="section-title">Your Posted Jobs</h3>
      {jobs.length === 0 ? (
        <p className="no-jobs">No jobs posted yet.</p>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <div key={job.id} className="college-job-card">
              <div className="job-info">
                <h4>{job.title}</h4>
                <p>
                  <strong>Department:</strong> {job.department}
                </p>
                <p>
                  <strong>Qualification:</strong> {job.qualification}
                </p>
                <p>
                  <strong>Experience:</strong> {job.experience} Years
                </p>
                <p>
                  <strong>Deadline:</strong> {job.deadline}
                </p>
                <p>
                  <strong>Total Applicants:</strong> {job.totalApplicants}
                </p>
              </div>
              <Link to={`/applications/${job.id}`} className="view-btn">
                View Applicants →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

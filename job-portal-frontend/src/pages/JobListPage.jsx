import { use, useEffect, useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useAuth } from "../contexts/AuthContext";

export default function JobListPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [faculty, setFaculty] = useState(null);
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch verified jobs
  useEffect(() => {
    api
      .get("/jobs")
      .then((res) => {
        const verifiedJobs = res.data.filter((j) => j.college?.verified);
        setJobs(verifiedJobs);
      })
      .catch(console.error);
  }, []);

  // Fetch faculty details if user is faculty
  useEffect(() => {
    const fetchFaculty = async () => {
      if (user && user.role === "ROLE_FACULTY") {
        try {
          const res = await api.get(`/faculty/${user.userId}`);
          if (res.data) setFaculty(res.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, [user]);

  // Fetch applications after faculty is loaded
  useEffect(() => {
    if (faculty?.id) {
      api
        .get(`/applications/faculty/${faculty.id}`)
        .then((res) => setApplications(res.data))
        .catch(console.error);
    }
  }, [faculty]);

  const handleApply = (id) => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", window.location.href);
      return navigate("/login");
    }
    if (!faculty) {
      alert("You must complete faculty registration before applying.");
      return navigate("/faculty/dashboard");
    }
    navigate(`/apply/${id}`);
  };

  return (
    <div className="joblist-container">
      <h2 className="joblist-title">Job Listings</h2>

      {loading ? (
        <p>Loading...</p>
      ) : jobs.length === 0 ? (
        <p className="no-jobs-msg">No jobs available at the moment.</p>
      ) : (
        <div className="joblist-wrapper">
          {jobs.map((job) => {
            const appForJob = applications?.find(
              (app) => app.job?.id === job.id
            );

            return (
              <div key={job.id} className="job-card">
                <div className="job-card-content">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-dept">
                    {job.department} | {job.qualification}
                  </p>
                  <p className="job-desc">
                    {job.description?.slice(0, 200)}...
                  </p>
                  <div className="job-card-spacer" />{" "}
                  {/* pushes bottom section down */}
                  <p className="job-deadline">Deadline: {job.deadline}</p>
                  {user ? (
                    user.role === "ROLE_FACULTY" ? (
                      appForJob ? (
                        <div className="apply-footer">
                          <div className="apply-content">
                            Status:{" "}
                            <span className="status">{appForJob.status}</span>
                          </div>
                          <Link to={`/apply/${job.id}`} className="apply-btn">
                            View Application
                          </Link>
                        </div>
                      ) : (
                        <div className="apply-footer">
                          <div className="apply-content">
                            Status: <span className="status">NOT APPLIED</span>
                          </div>
                          <button
                            className="apply-btn"
                            onClick={() => handleApply(job.id)}
                          >
                            Apply
                          </button>
                        </div>
                      )
                    ) : user.role !== "ROLE_COLLEGE" &&
                      user.role !== "ROLE_ADMIN" ? (
                      <Link to="/login" className="apply-btn">
                        Apply
                      </Link>
                    ) : null
                  ) : (
                    <Link to="/login" className="apply-btn">
                      Apply
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

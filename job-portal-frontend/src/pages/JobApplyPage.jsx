import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function JobApplyPage() {
  const { id } = useParams(); // job ID
  const { user } = useAuth();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Fetch faculty, job, and applications in a single useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return navigate("/login"); // redirect if not logged in

        // Get faculty details
        const facultyRes = await api.get(`/faculty/${user.userId}`);
        setFaculty(facultyRes.data);

        // Get job details
        const jobRes = await api.get(`/jobs/${id}`);
        setJob(jobRes.data);

        // Get applications for this faculty
        const appRes = await api.get(
          `/applications/faculty/${facultyRes.data.id}`
        );
        setApplications(appRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, id, navigate, applications]);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) return alert("Please select a resume");
    if (!faculty) return alert("Faculty not found!");
    setSubmitting(true); // disable button
    const formData = new FormData();
    formData.append("jobId", id);
    formData.append("resume", resume);
    formData.append("facultyId", faculty.id);

    try {
      await api.post(`/applications`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Application submitted!");
      // navigate("/jobs");
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Error applying for job");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  const appForThisJob = applications.find((app) => app.job.id === parseInt(id));

  return (
    <div className="jobapply-conatiner">
    <div className="jobapply-page">
      {job ? (
        <>
          <h2>Apply for Job: {job?.title}</h2>

          <div className="job-applycard">
            <h3>Title: {job?.title}</h3>
            <p>Department: {job.department}</p>
            <p>Qualification: {job.qualification}</p>
            <p>Description: {job.description?.slice(0, 200)}...</p>
            <p>Deadline: {job.deadline}</p>
            <p>Total Applications: {applications.length}</p>
          </div>

          <div className="college-applycard">
            <h3>College Details</h3>
            <p>Name: {job?.college?.name}</p>
            <p>Address: {job?.college?.address}</p>
            <p>Contact: {job?.college?.contact}</p>
            <p>Description: {job?.college?.description}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {!appForThisJob ? (
              <>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                />
                <button
                  className="job-apply-btn"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </>
            ) : (
              <p style={{ marginTop: "10px", fontWeight: "bolder" }}>
                Application Status:{" "}
                <span style={{ color: "red" }}>{appForThisJob.status}</span>
              </p>
            )}
          </form>
        </>
      ) : (
        <p>Job not found.</p>
      )}
    </div>
    </div>
  );
}

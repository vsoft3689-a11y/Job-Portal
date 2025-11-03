import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function JobPostPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [college, setCollege] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [qualification, setQualification] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (user?.userId) {
      api
        .get(`/colleges/${user.userId}`)
        .then((res) => setCollege(res.data))
        .catch((err) => console.error("Error fetching college:", err));
    }
  }, [user]);

  const submit = async (e) => {
    e.preventDefault();
    if (!college) {
      alert("College profile not found!");
      return;
    }
    await api.post("/jobs", {
      title,
      description,
      department,
      qualification,
      experience,
      salary,
      deadline,
      college: { id: college.id },
    });
    alert("Job posted successfully!");
    navigate("/college/dashboard");
  };

  return (
    <div className="jobpost-page">
      <div className="jobpost-container">
        <h2>Create a New Job</h2>
        <form onSubmit={submit} className="jobpost-form">
          <div className="form-group">
            <label>Job Title</label>
            <input
              placeholder="Enter job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Qualification</label>
            <input
              placeholder="Enter required qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Experience</label>
            <input
              placeholder="Enter required experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Salary</label>
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Application Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Job Description</label>
            <textarea
              placeholder="Enter detailed job description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}

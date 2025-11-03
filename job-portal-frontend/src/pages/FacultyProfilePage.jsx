import { useState, useEffect } from "react";
import api from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function FacultyProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    fullName: "",
    department: "",
    qualification: "",
    experience: "",
    address: "",
    contact: "",
  });
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    if (user && user.userId) {
      api
        .get(`/faculty/${user.userId}`)
        .then((res) => {
          if (res.data) {
            setProfile(res.data);
            setIsEditable(false); // disable editing if profile already exists
          }
        })
        .catch((err) => console.error("Error fetching college:", err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      fullName: profile.fullName,
      department: profile.department,
      qualification: profile.qualification,
      experience: profile.experience,
      address: profile.address,
      contact: profile.contact,
      user: { id: user.userId },
    };

    await api.post("/faculty", data);
    alert("Profile saved successfully!");
    setIsEditable(false); // disable inputs after save
    navigate("/faculty/dashboard");
  };

  console.log(localStorage.getItem("redirectAfterFaculty"));

  if (loading) return <p className="loading">Loading...</p>;
  return (
    <div className="profile-page">
    <div className="profile-container">
      <h2 className="profile-title">Faculty Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          name="fullName"
          value={profile.fullName}
          onChange={handleChange}
          required
          disabled={!isEditable}
        />

        <label>Department</label>
        <input
          name="department"
          value={profile.department}
          onChange={handleChange}
          required
          disabled={!isEditable}
        />

        <label>Qualification</label>
        <input
          name="qualification"
          value={profile.qualification}
          onChange={handleChange}
          required
          disabled={!isEditable}
        />

        <label>Experience</label>
        <input
          name="experience"
          value={profile.experience}
          onChange={handleChange}
          required
          disabled={!isEditable}
        />

        <label>Address</label>
        <input
          name="address"
          value={profile.address}
          onChange={handleChange}
          required
          disabled={!isEditable}
        />

        <label>Contact</label>
        <input
          name="contact"
          value={profile.contact}
          onChange={handleChange}
          required
          disabled={!isEditable}
        />

        {isEditable && (
          <button type="submit" className="save-btn">
            Save Profile
          </button>
        )}
        <br />
        <button
          className="contact-submit-btn"
          onClick={() => {
            navigate("/faculty/dashboard");
          }}
        >
          Back to Home
        </button>
      </form>
    </div>
    </div>
  );
}

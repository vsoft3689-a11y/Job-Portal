import { useState, useEffect } from "react";
import api from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function CollegeProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    contact: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    if (user && user.userId) {
      api
        .get(`/colleges/${user.userId}`)
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
      name: profile.name,
      address: profile.address,
      contact: profile.contact,
      description: profile.description,
      user: { id: user.userId },
    };

    await api.post("/colleges", data);
    alert("Profile saved successfully!");
    setIsEditable(false); // disable inputs after save
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="profile-page">
    <div className="profile-container">
      <h2 className="profile-title">College Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>College Name</label>
        <input
          name="name"
          value={profile.name}
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

        <label>Description</label>
        <textarea
          name="description"
          value={profile.description}
          onChange={handleChange}
          disabled={!isEditable}
        ></textarea>

        {isEditable && (
          <button type="submit" className="save-btn">
            Save Profile
          </button>
        )}
        <br />
        <button
          className="contact-submit-btn"
          onClick={() => {
            navigate("/college/dashboard");
          }}
        >
          Back to Home
        </button>
      </form>
    </div>
    </div>
  );
}

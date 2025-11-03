import { useEffect, useState } from "react";
import api from "../api/api";
import "../App.css"; // or import "./AdminFaculty.css";

const AdminFaculty = () => {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    api.get("/faculty").then((res) => {
      setFaculty(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    api
      .delete(`/faculty/${id}`)
      .then(() => {
        setFaculty((prev) => prev.filter((c) => c.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
   <div className="admin-faculty-container">
  <h2>Manage Faculty</h2>
  <div className="table-wrapper">
    <table className="admin-faculty-table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Faculty Name</th>
          <th>Address</th>
          <th>Contact</th>
          <th>Email</th>
          {/* <th>Action</th> */}
        </tr>
      </thead>
      <tbody>
        {faculty.map((c, index) => (
          <tr key={c.id}>
            <td data-label="S.No">{index + 1}</td>
            <td data-label="Faculty Name">{c?.fullName}</td>
            <td data-label="Address">{c?.address}</td>
            <td data-label="Contact">{c?.contact}</td>
            <td data-label="Email">{c?.user?.email}</td>
            {/* <td data-label="Action">
              <button
                className="admin-btn delete-btn"
                onClick={() => handleDelete(c.id)}
              >
                Delete
              </button>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default AdminFaculty;

import { useEffect, useState } from "react";
import api from "../api/api";
import "../App.css"; // Make sure styles are imported

const AdminCollege = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    api.get("/colleges").then((res) => {
      setColleges(res.data);
    });
  }, []);

  const handleVerify = (id) => {
    api.put(`/colleges/verify/${id}`).then((res) => {
      const updatedCollege = res.data;
      setColleges((prev) =>
        prev.map((c) => (c.id === updatedCollege.id ? updatedCollege : c))
      );
    });
  };

  const handleDelete = (id) => {
    api
      .delete(`/colleges/${id}`)
      .then(() => {
        setColleges((prev) => prev.filter((c) => c.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="admin-college-container">
      <h2>Manage Colleges</h2>
      <div className="table-wrapper">
        <table className="admin-college-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>College Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Status</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((c, index) => (
              <tr key={c.id}>
                <td>{index + 1}</td>
                <td>{c?.name}</td>
                <td>{c?.address}</td>
                <td>{c?.contact}</td>
                <td>{c?.user?.email}</td>
                <td className={`status ${c?.verified ? "verified" : "pending"}`}>
                  {c?.verified ? "Verified" : "Pending"}
                </td>
                <td>
                  <button
                    className={`admin-btn ${
                      c?.verified ? "unverify-btn" : "verify-btn"
                    }`}
                    onClick={() => handleVerify(c.id)}
                  >
                    {c?.verified ? "Unverify" : "Verify"}
                  </button>
                </td>
                {/* <td>
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

export default AdminCollege;

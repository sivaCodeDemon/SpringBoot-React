import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  //fetch the user records through api
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/getAllUsers");
      const formattedUsers = response.data.map(user => ({
        ...user,
        dateOfBirth: formatDateOfBirth(user.dateOfBirth)
      }));
      setUsers(formattedUsers);
    } catch (error) {
      setError("Error fetching users. Please try again later.");
      console.error("Error fetching users:", error);
    }
  };

  const formatDateOfBirth = (dateOfBirth) => {
    const date = new Date(dateOfBirth);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/deleteUser/${id}`);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const toggleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const bulkDeleteUsers = async () => {
    if (window.confirm("Are you sure you want to delete selected users?")) {
      try {
        await Promise.all(selectedUsers.map(id => axios.delete(`http://localhost:8080/api/v1/deleteUser/${id}`)));
        setUsers(users.filter(user => !selectedUsers.includes(user.id)));
        setSelectedUsers([]);
      } catch (error) {
        console.error("Error deleting users:", error);
      }
    }
  };

  const getStatusLabel = (status) => {
    return status ? "Active" : "Inactive";
  };

  const filteredUsers = users.filter(user => {
    return (
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="container">
      <div className="py-4">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by ID or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="btn btn-danger mb-3" onClick={bulkDeleteUsers}>
          Bulk Delete
        </button>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Select</th>
              <th scope="col">S.N0</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Gender</th>
              <th scope="col">Email</th>
              <th scope="col">Full Address</th>
              <th scope="col">Phone Number</th>
              <th scope="col">User Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleSelectUser(user.id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>{user.fullAddress}</td>
                <td>{user.phoneNumber}</td>
                <td>{getStatusLabel(user.userStatus)}</td>
                <td>
                  <Link
                    className="mx-2 text-primary"
                    to={`/viewuser/${user.id}`}
                  >
                    <i className="fas fa-eye"></i>
                  </Link>
                  <Link
                    className="mx-2 text-primary"
                    to={`/edituser/${user.id}`}
                  >
                    <i className="fas fa-edit"></i>
                  </Link>
                  <Link
                    className="mx-2 text-danger"
                    onClick={() => deleteUser(user.id)}
                    to="#"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


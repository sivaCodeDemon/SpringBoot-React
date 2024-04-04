import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    fullAddress: "",
    phoneNumber: "",
    userStatus: ""
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/getUserById/${id}`);
      // Format the date of birth
      response.data.dateOfBirth = formatDateOfBirth(response.data.dateOfBirth);
      setUser(response.data);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const formatDateOfBirth = (dateOfBirth) => {
    const date = new Date(dateOfBirth);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getStatusLabel = (status) => {
    return status ? "Active" : "Inactive";
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>First Name:</b> {user.firstName}
              </li>
              <li className="list-group-item">
                <b>Last Name:</b> {user.lastName}
              </li>
              <li className="list-group-item">
                <b>Date of Birth:</b> {user.dateOfBirth}
              </li>
              <li className="list-group-item">
                <b>Gender:</b> {user.gender}
              </li>
              <li className="list-group-item">
                <b>Email:</b> {user.email}
              </li>
              <li className="list-group-item">
                <b>Full Address:</b> {user.fullAddress}
              </li>
              <li className="list-group-item">
                <b>Phone Number:</b> {user.phoneNumber}
              </li>
              <li className="list-group-item">
                <b>User Status:</b> {getStatusLabel(user.userStatus)}
              </li>
            </ul>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

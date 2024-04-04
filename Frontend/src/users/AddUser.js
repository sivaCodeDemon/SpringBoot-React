import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

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

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { firstName, lastName, dateOfBirth, gender, email, fullAddress, phoneNumber, userStatus } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form fields before submitting
    if (validateForm()) {
      //sending post request to addUser
      await axios.post("http://localhost:8080/api/v1/addUser", user);
      //shows the success message
      setShowSuccessMessage(true);
      setTimeout(() => {
        // redirect to the home page
        setShowSuccessMessage(false);
        navigate("/");
      }, 3000);
    }
  };

  // Function to validate form fields
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validate First Name
    if (!firstName.trim()) {
      errors.firstName = "First name is required";
      isValid = false;
    }

    // Validate Last Name
    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    // Validate Date of Birth
    if (!dateOfBirth.trim()) {
      errors.dateOfBirth = "Date of birth is required";
      isValid = false;
    }

    // Validate Gender
    if (!gender.trim()) {
      errors.gender = "Gender is required";
      isValid = false;
    }

    // Validate Email
    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    // Validate Full Address
    if (!fullAddress.trim()) {
      errors.fullAddress = "Full address is required";
      isValid = false;
    }

    // Validate Phone Number
    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10 digits";
      isValid = false;
    }

    // Validate User Status
    if (!userStatus.trim()) {
      errors.userStatus = "User status is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

return (
  <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h2 className="text-center m-4">Add User</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className={`form-control ${formErrors.firstName && "is-invalid"}`}
              placeholder="Enter your first name"
              name="firstName"
              value={firstName}
              onChange={(e) => onInputChange(e)}
            />
            {formErrors.firstName && <div className="invalid-feedback">{formErrors.firstName}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className={`form-control ${formErrors.lastName && "is-invalid"}`}
              placeholder="Enter your last name"
              name="lastName"
              value={lastName}
              onChange={(e) => onInputChange(e)}
            />
            {formErrors.lastName && <div className="invalid-feedback">{formErrors.lastName}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="dateOfBirth" className="form-label">
              Date of Birth <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              className={`form-control ${formErrors.dateOfBirth && "is-invalid"}`}
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => onInputChange(e)}
            />
            {formErrors.dateOfBirth && <div className="invalid-feedback">{formErrors.dateOfBirth}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className={`form-select ${formErrors.gender && "is-invalid"}`}
              name="gender"
              value={gender}
              onChange={(e) => onInputChange(e)}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {formErrors.gender && <div className="invalid-feedback">{formErrors.gender}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email <span style={{ color: "red" }}>*</span> 
            </label>
            <input
              type="email"
              className={`form-control ${formErrors.email && "is-invalid"}`}
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
            {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="fullAddress" className="form-label">
              Address <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              className={`form-control ${formErrors.fullAddress && "is-invalid"}`}
              placeholder="Enter your address"
              name="fullAddress"
              value={fullAddress}
              onChange={(e) => onInputChange(e)}
            ></textarea>
            {formErrors.fullAddress && <div className="invalid-feedback">{formErrors.fullAddress}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number <span style={{ color: "red" }}>*</span> 
            </label>
            <input
              type="text"
              className={`form-control ${formErrors.phoneNumber && "is-invalid"}`}
              placeholder="Enter your phone number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => onInputChange(e)}
            />
            {formErrors.phoneNumber && <div className="invalid-feedback">{formErrors.phoneNumber}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="userStatus" className="form-label">
              User Status <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className={`form-select ${formErrors.userStatus && "is-invalid"}`}
              name="userStatus"
              value={userStatus}
              onChange={(e) => onInputChange(e)}
            >
              <option value="">Select status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            {formErrors.userStatus && <div className="invalid-feedback">{formErrors.userStatus}</div>}
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Submit
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/">
            Cancel
          </Link>
        </form>
          {showSuccessMessage && (
            <div className="alert alert-success mt-3" role="alert">
              User added successfully with name : {firstName} {lastName}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

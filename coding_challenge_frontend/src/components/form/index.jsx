import React from "react";
import useHook from "../custom-hook";
import "./form.css";

const SupervisorForm = () => {
  const [formData, message, errors, supervisors, handleChange, handleSubmit] =
    useHook();

  return (
    <div className="container-wraper">
      <h2> Notification Form</h2>
      {message && (
        <p style={{ color: "green", alignSelf: "flex-start" }}>{message}</p>
      )}
      <form className="form-wrapper" onClick={handleSubmit}>
        <div className="form">
          <div className="formd">
            <input
              className="input2"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
            <h4 className="quastion-notify">
              How would you prefer to be notified?
            </h4>
            <div className="input-checkbox-wrapeer">
              <div className="label">
                <input
                  name="lastName"
                  type="checkbox"
                  onChange={handleChange}
                />
                <label>Email</label>
              </div>

              <input
                className="input"
                name="email"
                placeholder="Email (optional)"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="formd2">
            <input
              className="input"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p className="error ">{errors.lastName}</p>}
            <div className="input-checkbox-wrapeer">
              <div className="label">
                <input
                  name="lastName"
                  type="checkbox"
                  onChange={handleChange}
                />
                <label>Phone</label>
              </div>

              <input
                className="input"
                name="phoneNumber"
                placeholder="Phone (optional)"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="form-select">
          <select
            name="supervisor"
            value={formData.supervisor}
            onChange={handleChange}
          >
            <option value="">Select Supervisor</option>
            {supervisors.map((s, idx) => (
              <option key={idx} value={s.label}>
                {s.label}
              </option>
            ))}
          </select>
          {errors.supervisor && <p className="error">{errors.supervisor}</p>}

          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SupervisorForm;

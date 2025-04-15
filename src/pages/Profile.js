import React, { useState } from "react";
import { useNutriCartContext } from "../context/NutriCartContext";
import "./Profile.css";

function Profile() {
  const { user, setUser } = useNutriCartContext();

  const [preferences, setPreferences] = useState({
    newsletter: user?.preferences?.newsletter ?? true,
    smsAlerts: user?.preferences?.smsAlerts ?? false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  if (!user) {
    return (
      <div className="profile-container">
        <h1>Please log in to view your profile.</h1>
      </div>
    );
  }

  let formattedDate = "Unknown";
  if (user.joinedDate) {
    const date = new Date(user.joinedDate);
    if (!isNaN(date.getTime())) {
      formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }

  // Checkbox preference change
  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Save updated preferences
  const handleSavePreferences = () => {
    const updatedUser = {
      ...user,
      preferences: preferences,
    };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Update users list in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(u =>
      u.email == updatedUser.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Preferences updated successfully!");
  };

  // password form input
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit password update
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    // Validate current password
    if (passwordData.currentPassword !== user.password) {
      alert("Current password is incorrect!");
      return;
    }

    // Validate new password match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    // Update password
    const updatedUser = {
      ...user,
      password: passwordData.newPassword,
    };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Users' list update
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(u =>
      u.email === updatedUser.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Password updated successfully!");

    // Clear form
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      {/* User Info */}
      <div className="profile-card">
        <h2>{user.username}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Member Since:</strong> {formattedDate}</p>
      </div>

      {/* Preferences */}
<div className="preferences-card">
  <h3>Preferences</h3>
  <div className="preferences-options">
    <label className="preference-item">
      <input
        type="checkbox"
        name="newsletter"
        checked={preferences.newsletter}
        onChange={handlePreferenceChange}
      />
      <span>Subscribe to Newsletter</span>
    </label>
    <label className="preference-item">
      <input
        type="checkbox"
        name="smsAlerts"
        checked={preferences.smsAlerts}
        onChange={handlePreferenceChange}
      />
      <span>Receive SMS Alerts</span>
    </label>
  </div>
  <button onClick={handleSavePreferences} className="update-btn">Save Preferences</button>
</div>

{/* Change Password */}
<div className="change-password-card">
  <h3>Change Password</h3>
  <form onSubmit={handlePasswordSubmit} className="password-form">
    <label htmlFor="currentPassword">Current Password</label>
    <input
      id="currentPassword"
      type="password"
      name="currentPassword"
      placeholder="Enter your current password"
      value={passwordData.currentPassword}
      onChange={handlePasswordChange}
      required
    />

    <label htmlFor="newPassword">New Password</label>
    <input
      id="newPassword"
      type="password"
      name="newPassword"
      placeholder="Enter your new password"
      value={passwordData.newPassword}
      onChange={handlePasswordChange}
      required
    />

    <label htmlFor="confirmPassword">Confirm New Password</label>
    <input
      id="confirmPassword"
      type="password"
      name="confirmPassword"
      placeholder="Confirm your new password"
      value={passwordData.confirmPassword}
      onChange={handlePasswordChange}
      required
    />

    <button type="submit" className="update-btn">Update Password</button>
  </form>
</div>

</div>
  );
}

export default Profile;
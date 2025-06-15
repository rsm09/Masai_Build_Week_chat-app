import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import "../css/editProfile.css";
import { useNavigate } from "react-router-dom";


const EditProfile = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
   const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setProfile(currentUser.profile || "");
    }
  }, [currentUser]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, {
      name:name,
      profile:profile
    });
    alert("Profile updated!");
    navigate("/dashboard", { replace: true })
    window.location.reload();
  }catch (error) {
      console.error("Update failed:", error.message);
      alert("Error updating profile.");
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" value={currentUser.email} disabled />

        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Profile Picture URL</label>
        <input type="text" value={profile} onChange={(e) => setProfile(e.target.value)} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useChat } from "../context/ChatContext";
import "../css/userlist.css";

const UserListPage = () => {
  const { currentUser } = useAuth();
  const { setSelectedChat } = useChat();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const allUsers = querySnapshot.docs
        .map((doc) => ({ uid: doc.id, ...doc.data() }))
        .filter((user) => user.uid !== currentUser.uid);
      setUsers(allUsers);
    };
    fetchUsers();
  }, [currentUser]);

  const handleSelectUser = (user) => {
    setSelectedChat({
      uid: user.uid,
      name: user.name,
      email: user.email,
      profile: user.profile,
      isGroup: false,
    });
    navigate("/dashboard");
  };



  return (
    <div className="userlist-page">
      <div className="top-row">
        <h2 className="section-title">Select a user to chat</h2>
        <button className="create-group-btn" onClick={() => navigate("/create-group")}>
          + Create Group
        </button>
      </div>

      <div className="userlist">
        {users.map((user) => (
          <div className="user-card" key={user.uid} onClick={() => handleSelectUser(user)}>
            <img src={user.profile} alt={user.name} />
            <div>
              <h4>{user.name}</h4>
              <p>{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListPage;

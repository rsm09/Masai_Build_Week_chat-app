import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import ThemeToggle from "../components/ThemeToggle";
import { useNavigate,Link } from "react-router-dom";
import "../css/dashboard.css";
import LogoutButton from "../components/LogoutButton";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { selectedChat } = useChat();
  const [userChats, setUserChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;
    const unsub = onSnapshot(
      collection(db, "users", currentUser.uid, "chats"),
      async (snapshot) => {
        const chatPromises = snapshot.docs.map(async (docSnap) => {
          const userRef = doc(db, "users", docSnap.id);
          const userDoc = await getDoc(userRef);
          return {
            uid: docSnap.id,
            ...userDoc.data(),
            lastMessage: docSnap.data().lastMessage,
            unread: docSnap.data().unread || false
          };
        });

        const chatList = await Promise.all(chatPromises);
        setUserChats(chatList);
      }
    );

    return () => unsub();
  }, [currentUser]);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="dashboard-header">
          <h3>Let's Chat</h3>
          <ThemeToggle />
          <LogoutButton/>
        </div>
        <div className="dashboard-profile">
            <img className="profile-pic" src={currentUser.profile || ""} alt="Profile" />
           <div>
              <h4>{currentUser.displayName || currentUser.name}</h4>
              <p>{currentUser.email}</p>
            </div>
            <Link to="/edit-profile" className="edit-btn">Edit</Link>
      </div>
        <button className="nav-btn" onClick={() => navigate("/users")}>
          ➕ New Conversation
        </button>
        <button className="nav-btn" onClick={() => navigate("/create-group")}>
          👥 Create Group
        </button>

        <div className="user-list">
          {userChats.map((user) => (
            <Sidebar key={user.uid} user={user} />
          ))}
        </div>
      </div>

      <div className="chat-section">
        {selectedChat ? (
          <ChatBox />
        ) : (
          <div className="no-chat-selected">
            <h2>Select a user or group to start chatting</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

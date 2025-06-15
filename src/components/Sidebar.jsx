import React, { useEffect, useState } from "react";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import "../css/sidebar.css";




const Sidebar = ({ user }) => {
  const { selectedChat, setSelectedChat } = useChat();
  const { currentUser } = useAuth();
   const [groups, setGroups] = useState([])
   const navigate = useNavigate()
  

   useEffect(()=>{
    const fetchGroups = async () => {
          const snapshot = await getDocs(collection(db, "groups"));
          const allGroups = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((grp) => grp.members?.includes(currentUser.uid));
          setGroups(allGroups);
          
    };
     fetchGroups();
   },[currentUser])
  const handleClick = () => {
    setSelectedChat({
      uid: user.uid,
      name: user.name,
      email: user.email,
      profile: user.profile,
      isGroup: user.isGroup || false,
    });
  };

   const handleSelectGroup = (group) => {
    setSelectedChat({
      uid: group.id,
      name: group.name,
      profile: group.profile,
      admin: group.admin,
      isGroup: true,
    });
    navigate("/dashboard");
  };

  
  return (
        <div className="sidebar">
       {/* Header */}
    <div
      className={`sidebar-user ${selectedChat?.uid === user.uid ? "active" : ""}`}
      onClick={handleClick}
    >
      <img src={user.profile} alt={user.name} />
      <div>
        <h4>{user.name}</h4>
        <p>{user.email}</p>
      </div>
      {user.unread && <span className="green-dot" />}
    </div>
      <div className="userlist">
        {groups.map((group) => (
          <div className="user-card" key={group.id} onClick={() => handleSelectGroup(group)}>
            <img src={group.profile} alt={group.name} />
            <div>
              <h4>{group.name}</h4>
              <p>Admin: {group.adminName}</p>
            </div>
            {console.log(group.name)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

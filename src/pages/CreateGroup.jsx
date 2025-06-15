import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/creategroup.css";

const CreateGroup = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupProfile, setGroupProfile] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      setUsers(snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }))
        .filter(u => u.uid !== currentUser.uid));
    };
    fetchUsers();
  }, [currentUser]);

  const toggleSelect = uid => {
    setSelectedUsers(prev =>
      prev.includes(uid) ? prev.filter(id => id !== uid) : [...prev, uid]
    );
  };

  const handleCreate = async () => {
    if (!groupName || selectedUsers.length === 0) return;

    await addDoc(collection(db, "groups"), {
      name: groupName,
      profile: groupProfile || "https://w7.pngwing.com/pngs/421/822/png-transparent-users-group-encapsulated-postscript-user-profile-group-miscellaneous-black-information-thumbnail.png",
      adminId: currentUser.uid,
      adminName: currentUser.name || currentUser.displayName,
      members: [...selectedUsers, currentUser.uid],
      createdAt: new Date(),
    });

    navigate("/dashboard");
  };

  return (
    <div className="create-group">
      <h2>Create Group</h2>
      <input
        type="text" placeholder="Group Name" value={groupName}
        onChange={e => setGroupName(e.target.value)}
      />
      <input
        type="text" placeholder="Group Image URL" value={groupProfile}
        onChange={e => setGroupProfile(e.target.value)}
      />
      <div className="user-list">
        {users.map(u => (
          <div
            key={u.uid}
            className={`user-item ${selectedUsers.includes(u.uid) ? "selected" : ""}`}
            onClick={() => toggleSelect(u.uid)}
          >
            <img src={u.profile} alt={u.name} />
            <span>{u.name}</span>
          </div>
        ))}
      </div>
      <button onClick={handleCreate}>Create Group</button>
    </div>
  );
};

export default CreateGroup;

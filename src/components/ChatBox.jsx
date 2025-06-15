import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import { db } from "../firebase/firebase";
import {
  collection,
  doc,
  addDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  setDoc,
  query, orderBy
} from "firebase/firestore";
import MessageBubble from "./MessageBubble";
import "../css/chatbox.css";

const ChatBox = () => {
  const { currentUser } = useAuth();
  const { selectedChat } = useChat();
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [viewOnce, setViewOnce] = useState(false);
  const scrollRef = useRef(null);

  const isGroup = selectedChat.isGroup;
  const chatId = isGroup
    ? selectedChat.uid
    : [currentUser.uid, selectedChat.uid].sort().join("_");

  useEffect(() => {
     const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp", "asc"));

  const unsub = onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setMessages(msgs);
  });

    // Mark unread as false
    if (!isGroup) {
      const userChatRef = doc(db, "users", currentUser.uid, "chats", selectedChat.uid);
      updateDoc(userChatRef, { unread: false });
    }

    return () => unsub();
  }, [chatId, selectedChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

const sendMessage = async () => {
  if (inputMsg.trim() === "") return;

  const msgObj = {
    text: inputMsg,
    sender: currentUser.uid,
    name: currentUser.displayName || currentUser.name,
    email: currentUser.email,
    profile: currentUser.profile || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    timestamp: serverTimestamp(),
    viewOnce,
  };

  try {
    await addDoc(collection(db, "chats", chatId, "messages"), msgObj);
    setInputMsg("");

    if (!isGroup) {
      const otherChatRef = doc(db, "users", selectedChat.uid, "chats", currentUser.uid);
      const myChatRef = doc(db, "users", currentUser.uid, "chats", selectedChat.uid);

      await setDoc(myChatRef, { lastMessage: inputMsg, unread: false });
      await setDoc(otherChatRef, { lastMessage: inputMsg, unread: true });
    }
  } catch (err) {
    console.error("Error sending message:", err);
  }
};


  return (
    <div className="chatbox">
     <div className="chatbox-header">
  <img src={selectedChat.profile} alt={selectedChat.name} />

  <div>
    <h3>
      {selectedChat.name}
    </h3>
    <p>{selectedChat.email || selectedChat.description || "Group Chat"}</p>
  </div>
</div>

      <div className="messages">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} isSender={msg.sender === currentUser.uid}/>
        ))}
        <div ref={scrollRef}></div>
      </div>

      <div className="chatbox-footer">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={viewOnce}
            onChange={(e) => setViewOnce(e.target.checked)}
          />
          View Once
        </label>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;

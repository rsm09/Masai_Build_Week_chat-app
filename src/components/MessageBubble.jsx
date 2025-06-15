import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "../css/messagebubble.css";

const MessageBubble = ({ message, isSender }) => {
  const [visibleText, setVisibleText] = useState(message.text);
  const [senderData, setSenderData] = useState(null);

  useEffect(() => {
    if (message.viewOnce && !isSender) {
      const timer = setTimeout(() => {
        setVisibleText("*****");
      }, 10000); // 10 seconds after viewing
      return () => clearTimeout(timer);
    }
  }, [message, isSender]);

useEffect(() => {
    const fetchSender = async () => {
      try {
        const docSnap = await getDoc(doc(db, "users", message.sender));
        if (docSnap.exists()) {
          setSenderData(docSnap.data());
        } else {
          setSenderData({
            name: "Unknown",
            email: "",
            profile: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          });
        }
      } catch (err) {
        console.error("Failed to fetch sender:", err);
        setSenderData({
          name: "Error",
          email: "",
          profile: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        });
      }
    };
   fetchSender();
  }, [message.sender])

const formattedTime = message.timestamp?.toDate
  ? (() => {
      const ts = new Date(message.timestamp.toDate());
      const time = ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const date = ts.toLocaleDateString([], { day: '2-digit', month: 'short', year: '2-digit' });
      return `${time}, ${date}`;
    })()
  : "";

    if (!senderData) return null;
  return (
    <div className={`message-bubble ${isSender ? "sender" : "receiver"}`}>
      <div className="msg-header">
        <img src={senderData.profile} alt={"profile"} />
        <div>
          <h5>{message.name}</h5>
          <p>{message.email}</p>
        </div>
      </div>
      <div className="msg-text">{visibleText}</div>
       {formattedTime && <span className="timestamp">{formattedTime}</span>}
    </div>
  );
};

export default MessageBubble;

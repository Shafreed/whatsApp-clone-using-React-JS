import React, { useEffect, useState } from "react";
import "./SideBarChats.css";
import { Avatar } from "@mui/material";
import { db } from "../../Firebase";
import { Link } from "react-router-dom";

const SideBarChats = ({ id, name, photo, addNewChat }) => {
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const creatChat=()=>{
    const roomName=prompt('please enter the room name')
    const roomPhoto=prompt('please enter the room photo')

    if(roomName && roomPhoto){
      db.collection('rooms').add({
        name:roomName,roomPhoto
      })
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sideChat">
        <Avatar src={photo} />
        <div className="sideChat_info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sideChat" onClick={creatChat}>
      <h2>Add New Chat</h2>
    </div>
  );
};

export default SideBarChats;

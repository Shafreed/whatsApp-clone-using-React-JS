import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { db } from "../../Firebase";

import {serverTimestamp} from 'firebase/firestore'

const Chat = () => {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');


  const sendMessage=(e)=>{
    e.preventDefault()

    db.collection('rooms').doc(roomId).collection('messages').add({
      message:input,
      name:'Ajeer',
      timestamp:serverTimestamp(),
    })
    setInput('')
  }

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomData(snapshot.data()));
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={roomData.roomPhoto} />
        <div className="chat_headerInfo">
          <h3>{roomData.name}</h3>
          <p>Last seen {new Date(messages[0]?.timestamp?.toDate()).toUTCString()}</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {
          messages.map((message)=>(
            <p className={`chat_message ${message.name === 'Shafs' && 'chat_reciever'}`}>
              <span className="chat_name">{message.name}</span>
              {message.message}
              <span className="chat_timestamp">
              {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          ))
        }
      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input type="text" value={input} onChange={(eve)=>setInput(eve.target.value)}/>
          <button type="submit" onClick={sendMessage}>Send</button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;

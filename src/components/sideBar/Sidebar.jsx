import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { Avatar, IconButton } from '@mui/material'
import { DonutLarge } from '@mui/icons-material'
import { Chat } from '@mui/icons-material'
import { MoreVert } from '@mui/icons-material'
import { Search } from '@mui/icons-material'
import SideBarChats from '../sidebarChats/SideBarChats'
import { db } from '../../Firebase'

const Sidebar = () => {
  const [rooms,setRooms]=useState([])

  useEffect(()=>{
  const unsubscribe=  db.collection('rooms').onSnapshot((snapShort)=>
    setRooms(snapShort.docs.map((doc)=>({
      id:doc.id,
      data:doc.data()
    }))))
    return ()=>unsubscribe
  },[])


  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src='https://media.licdn.com/dms/image/D5603AQF8tnNrp4cktg/profile-displayphoto-shrink_800_800/0/1686392178633?e=2147483647&v=beta&t=dEiAyntuDxe0Ijg_hssVt3-np7a9Rb2fp6vHBJHDSvY'/>
        <div className="sidebar_headerRight">
          <IconButton>
          <DonutLarge/>
          </IconButton>
          <IconButton>
          <Chat/> 
          </IconButton>
          <IconButton>
          <MoreVert/>
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchcontainer">
          <Search/>
          <input type="text" placeholder='Search the chat' />
        </div>
      </div>
      <div className="sidebar_chats">
        <SideBarChats addNewChat/> 
        {
          rooms.map((room)=>(
            <SideBarChats 
            key={room.id}
            id={room.id}
            name={room.data.name}
            photo={room.data.roomPhoto}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Sidebar
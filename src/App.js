import './App.css';
import Sidebar from './components/sideBar/Sidebar';
import Chat from './components/chatBox/Chat';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './LogIn/Login';

function App() {
  const [user,setUser]=useState(sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')): '')
  return (
    !user ? <Login setUser={setUser}/> :
    (<div className="app">
      <div className="app_body">
        <Router>
        <Sidebar/>
          <Routes>
          <Route path='/rooms/:roomId' element={<Chat/>} />
        
        </Routes>
        </Router>
      </div>
    </div>)
  
    
  );
}

export default App;

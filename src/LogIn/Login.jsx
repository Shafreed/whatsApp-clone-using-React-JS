import React from 'react'
import { auth,provider } from '../Firebase'
import { Button } from '@mui/material'
import './Login.css'


const Login = ({setUser}) => {
    const signIn=()=>{
        auth.signInWithPopup(provider).then(result =>setUser(result.user)).catch(err=>alert(err.message))
    }
  return (
    <div className='login'>
        <div className="login_container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" alt="" />
        <div className="login_text">
            <h1>Sign in to WhatsApp</h1>
        </div>
        </div>
        <Button type='submit' onClick={signIn}>
            <p>Sign in with google</p>
        </Button>
    </div>
  )
}

export default Login
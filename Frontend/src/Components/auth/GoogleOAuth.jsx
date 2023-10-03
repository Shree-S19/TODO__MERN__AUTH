import React from 'react'
import axios from 'axios'

function GoogleOAuth() {
    const callOAuth = ()=>{
        console.log("OAuth called");
        axios.post('http://localhost:3000/api/auth/google_oauth',{msg:"req from react"})
    }
  return (
    <div>
      <button onClick={callOAuth}>google</button>
    </div>
  )
}

export default GoogleOAuth

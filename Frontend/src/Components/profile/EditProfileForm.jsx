import React, { useEffect, useState } from 'react'
import './editProfile.css'
import {toast} from "react-hot-toast";
import axios from 'axios';
import { Link } from 'react-router-dom';

function EditProfileForm() {
  const [user, setUser] = useState({
    name : "",
    email: "",
  })
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  const updateProfile = async(e) =>{
    e.preventDefault();
    try{
        const updatedUser = {...user, name:nameInput,email : emailInput};

        const res = await axios.put('/api/users/me',updatedUser);
        toast.success("Profile Updated");
        setUser(updatedUsergit );
    }catch(err){
        console.log(err);
    }
  };

  useEffect(()=>{
    (async()=>{
      try{
        const {data} = await axios.get('/api/users/me');
        setUser(data);
      }catch(err){
        console.log(err);
      }
    })()
  }, [] );

  return (
    <div>
        <Link to='/' className='profile-container' style={{color:"white"}}>
            Home
        </Link>
        <div>
          <h1>Edit your Profile</h1>
          <form onSubmit={updateProfile}>
            <label htmlFor='name'>
                Full Name
                <input type='text' name='name'
                        placeholder={user.name} required
                        onChange={(e) => setNameInput(e.target.value)} />
            </label>
            <label htmlFor='email'>
                Email-ID
                <input type='email' name='email' 
                        placeholder={user.email} required
                        onChange={(e) => setEmailInput(e.target.value)} />
            </label>
            <label htmlFor='name'>
                <button type='submit'>Save</button>
            </label>
          </form>
        </div>
    </div>
  )
}

export default EditProfileForm

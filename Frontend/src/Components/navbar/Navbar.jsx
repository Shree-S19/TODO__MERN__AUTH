import React,{useState,useEffect} from 'react'
import axios from "axios";
import "./navbar.css";
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-hot-toast';

function Navbar() {

    const [user,setUser] = useState(null);
    const navigate = useNavigate();

    const getUser = async () =>{
        try{
            const {data} = await axios.get('/api/users/me');
            setUser(data);
        }catch(err){
            console.log(err);
            console.log("Error in Navbar!");
        }
    };
    useEffect(()=>{
        getUser();
    }, [] );

    const handleLogout = async()=>{
        try{
            await axios.get('api/auth/logout');
            setUser(null);
            toast.success('Logged out');
            navigate('/auth');
        }catch(err){
            console.log(err);
             console.log("Error in Navbar!");
        }
    }

    if(!user) return null;

  return (
    <header>
        <div className='navbar-container'>
            <div>
                <h1>{user.name}</h1>
                <h1>{user.email}</h1>
                <Link to='/edit-profile' style={{color:"white"}}>Edit your profile</Link>
            </div>
        </div>
        <nav>
            <button onClick={handleLogout}>
                Logout
            </button>
        </nav>
    </header>
  )
}

export default Navbar

import React,{useState} from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const register = async(e)=>{
        e.preventDefault();
        const user = {
            name,
            email,
            password
        };
        try{
            await axios.post('/api/auth/register',user);
            navigate('/auth');
            console.log('Login request send');
            
            console.log(user)
        }catch(err){
            console.log(err);
            toast.error('Register Failed');
            console.log(user);
        }
    }

  return (
    <div className='register-container'>
        <h1>Register</h1>
        <form onSubmit={register}>
            <label htmlFor='name'>
                Name
                <input type='text' name='name' placeholder='Name' required onChange={(e)=>setName(e.target.value)}/>
            </label>
            <label htmlFor='email'>
                Email
                <input type='email' name='email' placeholder='Email' required onChange={(e)=>setEmail(e.target.value)}/>
            </label>
            <label htmlFor='password'>
                Password
                <input type='password' name='password' placeholder='Password' required onChange={(e)=>setPassword(e.target.value)}/>
            </label>
            <br/>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register

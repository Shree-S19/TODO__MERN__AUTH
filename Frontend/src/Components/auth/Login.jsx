import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const login = async(e)=>{
    e.preventDefault();
    try{
      await axios.post('http://localhost:3000/api/auth/login',{
        email,
        password
      }, {
        withCredentials: true // Include cookies in the request
    })
      navigate('/');
      toast.success('Login request send');
      
      console.log('Login request send');
    }catch(err){
      console.log(err);
      toast.error('Login request failed');
    }
  }

  return (
    <div className='login-container'>
      <h1>login</h1>
      <form onSubmit={login}>
        <label htmlFor='email'>Email
          <input type='email' name='email' placeholder='email' required onChange={(e)=>setEmail(e.target.value)}/>
        </label>
        <label htmlFor='password'>Password
          <input type='password' name='password' placeholder='password' required onChange={(e)=>setPassword(e.target.value)}/>
        </label>
        <br/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login

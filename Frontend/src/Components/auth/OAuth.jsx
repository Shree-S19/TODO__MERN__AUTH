import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import jwtDecode from "jwt-decode";

function OAuth() {
  // const [OAuthUser,setOAuthUser] = useState({});
  const [EMAIL,setEmail] = useState(null);
  const [NAME,setName] = useState(null);
  const navigate = useNavigate();


  const handleCallbackResponse = async(response)=>{   
    console.log("Encoded JWT ID TOKEN : " + response.credential);
    const userObject = await jwtDecode(response.credential);
    // setOAuthUser(userObject);
    // console.log(OAuthUser);
    setEmail(userObject.email);
    setName(userObject.given_name);
    console.log(userObject);
    console.log(userObject.given_name);
    console.log(userObject.email);
    try{
      console.log("in try block sending the request...")
      console.log(NAME);
      console.log(EMAIL);
      if(!NAME || !EMAIL)toast.error('Slow Network try again :)');
      await axios.post('http://localhost:3000/api/auth/google_oauth',{
        name:NAME,
        email:EMAIL,
      }, {
        withCredentials: true // Include cookies in the request
    })
      navigate('/');
      toast.success('OAuth request send');
      
      console.log('OAuth request send');
    }catch(err){
      console.log(err);
      if(NAME !== null)toast.error('OAuth request failed');
    }
  }

  useEffect(()=>{
    google.accounts.id.initialize({
      client_id : "448455266195-8tn3humm9du0h3vgtgfug35rgbtievg3.apps.googleusercontent.com",
      callback : handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("SignInDiv"),
      {theme:"outline",size:"large"}
    );
  },[]);


  return (
    <div className='login-container'>
      <h1>OAuth</h1>
      <div id='SignInDiv'>
      </div>
    </div>
  )
}

export default OAuth

import React, { useEffect } from 'react'
import Login from '../Components/auth/Login';
import Register from '../Components/auth/Register';
import Layout from '../Components/Layout';
import './auth.css'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';

function Auth() {

  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(auth){
      navigate('/');
    }
  }, [auth, navigate]);

  return (
    <Layout>
        <div>
            <Login></Login>
            <Register></Register>
        </div>
    </Layout>
  )
}

export default Auth

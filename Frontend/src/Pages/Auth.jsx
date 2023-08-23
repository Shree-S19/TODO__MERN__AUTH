import React from 'react'
import Login from '../Components/auth/Login';
import Register from '../Components/auth/Register';
import Layout from '../Components/Layout';

function Auth() {
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

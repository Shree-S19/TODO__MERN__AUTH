import React from 'react'
import Login from '../Components/auth/Login';
import Register from '../Components/auth/Register';
import Layout from '../Components/Layout';
<<<<<<< HEAD

import './auth.css'

=======
// need to update the Layout Components
>>>>>>> 0b971406b715592787fb1265b10f702760d8e46f
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

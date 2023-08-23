import { useState } from 'react'
// import './App.css'
import {Toaster} from 'react-hot-toast';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';

import Home from './Pages/Home.jsx';
import PrivateRoutes from './Components/PrivateRoutes.jsx';

function App() {
  return (
    <Router>
        <Toaster position='top-right'
        toastOptions={{style: {fontSize : "3vh"}}}>
            
        </Toaster>
        <Routes>
            <Route element={<PrivateRoutes/>}>
                <Route path = '/' element={<Home/>}/>
                <Route path='/editProfile' element={<EditProfile/>} />
            </Route>
            <Route path='/auth' element={<Auth/>}/>
        </Routes>
    </Router>
  )
}

export default App

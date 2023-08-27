import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home.jsx';
import PrivateRoutes from './Components/PrivateRoutes.jsx';
import Auth from './Pages/Auth.jsx';

function App() {
    return (
        <Router>
            <Toaster position='top-right' toastOptions={{ style: { fontSize: '3vh' } }}>
                {/* Toaster options */}
            </Toaster>
            <Routes>
                {/* Define the public route */}
                <Route path='/auth' element={<Auth />} />

                {/* Define the private routes */}
                <Route element={<PrivateRoutes />}>
                    {/* Use the element prop directly for private routes */}
                    <Route path='/' element={<Home />} />
                    {/* <Route path='/editProfile' element={<EditProfile />} /> */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

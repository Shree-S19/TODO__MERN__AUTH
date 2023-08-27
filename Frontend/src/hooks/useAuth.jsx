import { useEffect, useState } from "react";
import axios from 'axios';

export default () => {
    const [auth, setAuth] = useState();

    const verifyAuth = async () => {
        try {
            const res = await axios.get('/api/auth/is_logged_in');
            console.log("is_logged_in from hook = " + res);
            return res.data;
        } catch (err) {
            console.log("error in useAuth Hook");
            return false;
        }
    };

    useEffect(() => {
        (async () => {
            const data = await verifyAuth();
            setAuth(data);
        })();
    }, []); // Add an empty dependency array to run the effect only once

    return { auth };
};

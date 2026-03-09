import { createContext } from "react";
import axios from "axios"
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';

const AppContext = createContext();

const AppContextProvider = (props) => {

    const cookies = new Cookies();
    const [token, setToken] = useState(cookies.get('user_token') ? cookies.get('user_token') : false);
    const [tempToken, setTempToken] = useState(cookies.get('temp_token') ? cookies.get('temp_token') : false);
    const [adminToken, setAdminToken] = useState(cookies.get('admin_token') ? cookies.get('admin_token') : false);
    const [waitListEmail, setWaitListEmail] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!token) {
                    setUser(null);
                    return;
                }

                const backend = import.meta.env.VITE_BACKEND_URL;
                const res = await axios.get(`${backend}/api/user/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data.status === "success") {
                    setUser(res.data.data);
                }
            } catch (e) {
                console.log("Failed to fetch user");
                setUser(null);
            }
        };

        fetchUser();
    }, [token]);

    const value = {
        token,
        setToken,
        tempToken,
        setTempToken,
        adminToken,
        setAdminToken,
        waitListEmail,
        setWaitListEmail,
        user,
        setUser
    };

    return (
        <AppContext.Provider value={value}>
            {props?.children}
        </AppContext.Provider>
    )
}

export { AppContextProvider, AppContext };
import { createContext, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { BASE_URL } from '../helper';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [cookies, setCookies, removeCookie] = useCookies();

   

    const login = async (email, password, navigate) => {
        try{
            const res = await axios.post(`${BASE_URL}/login`, {
                email: email,
                password: password
            });

            const expirationTime =  86400 * 1000; 
        const expirationDate = new Date(Date.now() + expirationTime);
            
        setCookies('token', res.data.token, {
            expires: expirationDate
        }); // your token

        setCookies('progress', res.data.progress, {
            expires: expirationDate
        }); // optional data
            
            alert("Logged In Successfully");

            navigate(`/question/${res.data.progress}`);
        }
        catch(error){
            console.log(error);
            alert("Invalid Login Details");
        }

    };

   
    const value = useMemo(
        () => ({
            cookies,
            login,
        
        }),
        [cookies]
    );

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(UserContext)
};
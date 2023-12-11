import { createContext, useContext, useState } from "react";
import { executeJWTAuthenticationService } from "../../services/AuthenticationApiService";
import { apiClient } from "../../services/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({children}) {
    
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);

    const [token, setToken] = useState(null);

    // async function login(username, password) {

    //     const baToken = 'Basic '+ window.btoa(username + ":" + password)

    //     try {

    //         const response = await executeBasicAuthenticationService(baToken);

    //         if(response.status=='200')
    //         {
    //             setAuthenticated(true);
    //             setUsername(username);
    //             setToken(baToken);

    //             apiClient.interceptors.request.use(
    //                 (config)=> {
    //                     config.headers.Authorization = baToken;
    //                     return config;
    //                 })

    //             return true;
    //         }else{
    //             logout();
    //             return false;
    //         }
    //     } catch (error) {
    //         logout();
    //         return false;
    //     }
    // }

    async function login(username, password) {

        try {
            const response = await executeJWTAuthenticationService(username,password);

            if(response.status=='200')
            {
                const jwtToken = 'Bearer ' + response.data.token; 
                setAuthenticated(true);
                setUsername(username);
                setToken(jwtToken);

                apiClient.interceptors.request.use(
                    (config)=> {
                        config.headers.Authorization = jwtToken;
                        return config;
                    })

                return true;
            }else{
                logout();
                return false;
            }
        } catch (error) {
            logout();
            return false;
        }
    }

    function logout() {
        setAuthenticated(false);
        setToken(null);
        setUsername(null);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, setAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>
    )
}
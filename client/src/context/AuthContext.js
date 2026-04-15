import React, { createContext, useContext, useEffect, useState } from 'react'
import LogoutPrompt from 'src/pages/auth/LogoutPrompt';

const loading = (
    <div className="pt-3 text-center min-vh-100">
        <div className="sk-spinner sk-spinner-pulse">
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    </div>
)

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
    const [loginStatus, setLoginStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [farmDetail, setFarmDetail] = useState()
    const [farmLoading, setFarmLoading] = useState(true)
    const [logoutPrompt, setLogoutPrompt] = useState(false)

    useEffect(() => {
        fetch(process.env.REACT_APP_API_HOST + "/farm").then(res => res.json())
            .then(data => {
                setFarmDetail(data)
                setFarmLoading(false)
            })
    }, [])

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem('token', token || '');
        if (token) {
            setIsLoading(true);
            setLoginStatus(true)
            setIsLoading(false);
        } else {
            setIsLoading(true);
            setLoginStatus(false)
            setIsLoading(false);
            // const abortCont = new AbortController();
            // fetch(process.env.REACT_APP_API_HOST + '/organizations/clientId/', { signal: abortCont.signal })
            //     .then(res => {
            //         if (res.status !== 200 && res.status !== 304) {
            //             throw Error('could not fetch data')
            //         }
            //         return res.json()
            //     })
            //     .then(data => {
            //         setFarm(data || {});
            //         document.title = data.name;
            //         setIsLoading(false);
            //     })
            //     .catch(err => {
            //         if (err.name === 'AbortError') {
            //             console.log('Fetch aborted');
            //         } else {
            //             setIsLoading(false);
            //             //setError(err.message);
            //         }
            //     });
            // return () => abortCont.abort();
        }
    }, [token]);

    // function getId() {
    //     return farm._id
    // }

    function customFetch(url, { method = 'GET', headers = {}, ...rest } = {}) {
        return fetch(process.env.REACT_APP_API_HOST + url, {
            method,
            headers: { "Authorization": "Bearer " + token, ...headers, },
            ...rest
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 304) {
                    throw Error('could not fetch data')
                }
                return res.json()
            })
    }

    function login(email, password) {
        return fetch(process.env.REACT_APP_API_HOST + `/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(response => {
                if (response.status === 401) {
                    throw Error("Invalid credientials")
                } else {
                    return response.json()
                }
            })
            .then(data => {
                // if (data.status) {
                setIsLoading(true)
                setUser(data.user)
                setToken(data.accessToken)
                console.log('Token set')
                // }
                return data;
            });
    }

    function logout() {
        setLoginStatus(false)
        setToken(null)
        setUser(null);
        return true;
    }

    function promptLogout() {
        setLogoutPrompt(true)
    }

    function closePrompt() {
        setLogoutPrompt(false)
    }

    function onPromptSuccess() {
        setLogoutPrompt(false)
        logout()
    }

    const value = {
        farmDetail,
        user,
        login,
        logout: promptLogout,
        customFetch,
        loginStatus,
        logoutPrompt,
        closePrompt,
        onPromptSuccess
    }

    return (
        <AuthContext.Provider value={value} >
            {(isLoading || farmLoading) ? loading : children}

        </AuthContext.Provider>
    )
}
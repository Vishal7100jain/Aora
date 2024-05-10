import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsloading] = useState(true)


    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setLoggedIn(true)
                    setUser(res)
                } else {
                    setLoggedIn(false)
                    setUser(null)
                }
            }).catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsloading(false)
            })
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                isLoading,
                user,
                setUser,
                isLoggedIn,
                setLoggedIn
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
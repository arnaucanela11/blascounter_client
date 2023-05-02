'use client'
import { useState } from "react"
import { GlobalState } from "./GlobalState"

export const Providers = ({children}) => {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [cart, setCart] = useState(0)

    const addToCart = () => {
        if (cart >= 0) {
            setCart(cart + 1)
            localStorage.setItem('cart', cart)
        }
    }

    const removeFromCart = () => {
        if (cart >= 0) {
            setCart(cart - 1)
            localStorage.setItem('cart', cart)
        }
    }

    const setLogin = (user, token) => {
        setToken(token)
        setUser(user)
        const stringifyUser = JSON.stringify(user)
        localStorage.setItem('token', token)
        localStorage.setItem('user', stringifyUser)
    }

    const setLogout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
    return (
        <GlobalState.Provider value={{
            user,
            token,
            cart,
            addToCart,
            removeFromCart,
            setLogin,
            setLogout
        }
        }>
            {children}
        </GlobalState.Provider>
    )
}
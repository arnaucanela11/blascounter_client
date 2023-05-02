import { createContext } from "react";


export const GlobalState = createContext({
    user: null,
    token: null,
    cart: 0,
    addToCart: () => {},
    removeFromCart: () => {},
    setLogin: (user, token) => {},
    setLogout: () => {}

})


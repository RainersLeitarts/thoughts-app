import { createContext, useReducer } from "react";


const AuthContext = createContext({
    user: null,
    login: (user) => { },
    logout: () => { },
})

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            console.log(action)
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state

    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, { user: null })

    const login = (user) => {
        dispatch(
            {
                type: 'LOGIN',
                payload: user
            }
        )
    }

    const logout = () => {
        dispatch(
            {
                type: 'LOGOUT',
            }
        )
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    )
}

export {AuthContext, AuthProvider}
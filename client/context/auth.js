import { createContext, useReducer, useEffect, useContext } from "react";
import jwtDecode from 'jwt-decode'


const initialState = {
    user: null
}

const AuthContext = createContext({
    user: null,
    login: (user) => { },
    logout: () => { },
})

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
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
    const [state, dispatch] = useReducer(authReducer, initialState)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const decodedToken = jwtDecode(localStorage.getItem('token'))
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem('token')
                dispatch(
                    {
                        type: 'LOGOUT',
                    }
                )
            }
            dispatch(
                {
                    type: 'LOGIN',
                    payload: decodedToken
                }
            )
        }
    }, [])

    const login = (user) => {
        localStorage.setItem('token', user.token)
        dispatch(
            {
                type: 'LOGIN',
                payload: user
            }
        )
    }

    const logout = () => {
        localStorage.removeItem('token')
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

export { AuthContext, AuthProvider }
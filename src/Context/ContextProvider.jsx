import React, { createContext, useContext, useState, useReducer } from 'react'
export const DataContext = createContext(null);
export const DispatchContext = createContext(null);

const initialValue = {
    url: {},
    genres: {}
}

function reducerFunction(state, action) {
    switch (action.type) {
        case 'ADD_URL': {
            return {
                ...state,
                url: {
                    ...state.url,
                    ...action.payload
                }
            }

        }
        case 'ADD_GENRES': {
            return {
                ...state,
                genres: {
                    ...state.genres,
                    ...action.payload
                }
            }

        }
        default: {
            return state
        }
    }
}

function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducerFunction, initialValue)

    return (
        <>
            <DataContext.Provider value={state}>
                <DispatchContext.Provider value={dispatch}>
                    {children}
                </DispatchContext.Provider>
            </DataContext.Provider>
        </>
    )
}


export function getState() {
    return useContext(DataContext)
}
export function getDispatch() {
    return useContext(DispatchContext)
}


export default ContextProvider
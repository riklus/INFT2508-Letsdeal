import { useState, createContext, useContext, useEffect } from "react"

// Initial state of this object.
const initialState = {
  theme: 'light',
  favCount: 0,
  locale: 'en',
  searchValue: undefined,
  filterValue: []
}

// Will be shared across components, through import.
const GlobalContext = createContext(null)

export const GlobalState = (props) => {
  const [globalState, setGlobalState] = useState({ ...initialState, ...props })

  const updateGlobalState = (key, newValue) => {
    setGlobalState(oldState => {
      if (oldState[key] !== newValue) {
        const newState = { ...oldState }
        newState[key] = newValue
        return newState
      } else {
        return oldState
      }
    })
  }

  return (
    <GlobalContext.Provider value={[globalState, updateGlobalState]}>{props.children}</GlobalContext.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalContext)
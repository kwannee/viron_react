import React, {useState} from 'react'
import AppContext from './AppContext'

const AppProvider = ({children}) =>{
    const [showNav, setShowNav] = useState(false)
    return(
        <AppContext.Provider value={{showNav,setShowNav}}>
            {children}
        </AppContext.Provider>
    )
}
export default AppProvider;
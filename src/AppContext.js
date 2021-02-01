import {createContext} from 'react'

const AppContext = createContext({
    showNav: false,
    setShowNav:()=>{}
})

export default AppContext;
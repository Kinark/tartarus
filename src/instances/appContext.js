import React from 'react'

export const AppContext = React.createContext({
   darkMode: false,
   playMode: false
})

export const withContext = Component => props => <AppContext.Consumer>{context => <Component {...props} context={context} />}</AppContext.Consumer>

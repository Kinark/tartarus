const initialStore = {
   // user: {
   //    nick: ''
   // },
   myWorlds: {
      loading: false,
      error: false,
      content: []
   },
   newWorld: {
      modal: false,
      loading: false,
      error: false
   },
   settings: {
      theme: 'light'
   },
   data: {
      friends: []
   },
   auth: {
      loggedIn: !!localStorage.getItem('JWToken'),
      loading: false,
      error: false
   },
   app: {
      playMode: false
   }
}

export default initialStore

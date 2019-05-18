const initialStore = {
   // user: {
   //    nick: ''
   // },
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

const initialStore = {
   // user: {
   //    nick: ''
   // },
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

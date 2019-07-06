const initialStore = {
   myWorlds: {
      loading: false,
      error: false,
      done: false,
      content: []
   },
   whereILive: {
      loading: false,
      error: false,
      done: false,
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
      username: '',
      userId: '',
      loading: false,
      error: false
   },
   app: {
      newWorldModalOpen: false,
      loadingRoomModal: false,
      authenticated: false,
      connected: false,
      messages: [],
      // players: [],
      playMode: false,
      tabs: []
   }
}

export default initialStore

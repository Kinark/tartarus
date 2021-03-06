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
   toastNotifications: {
      queue: [],
      active: ''
   },
   myRulesets: {
      loading: false,
      error: false,
      done: false,
      content: []
   },
   app: {
      newWorldModalOpen: false,
      loadingRoomModal: false,
      authenticated: false,
      connected: false,
      messages: [],
      playMode: false,
      tabs: [],
      subTabs: []
   }
}

export default initialStore

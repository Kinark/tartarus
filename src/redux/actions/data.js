import { listeners } from '~/constants/socketEvents'

export const SET_FRIENDS = 'SET_FRIENDS'

export const listenForFriendsList = () => ({ event: listeners.FRIENDS_LIST, handle: SET_FRIENDS })
export const unlistenForFriendsList = () => ({ event: listeners.FRIENDS_LIST, leave: true })

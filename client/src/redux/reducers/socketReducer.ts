import { ISocket, SOCKET } from './../types/socketTypes'

const socketReducer = (state: any = null, action: ISocket) => {
  switch (action.type) {
    case SOCKET:
      return action.payload
    default:
      return state
  }
}

export default socketReducer
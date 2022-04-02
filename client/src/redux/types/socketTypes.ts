import { Socket } from 'socket.io-client'

export const SOCKET = 'SOCKET'

export interface ISocket {
  type: typeof SOCKET
  payload: Socket
}
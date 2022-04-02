import { Socket } from 'socket.io'

export const socketServer = (socket: Socket) => {
  socket.on('joinRoom', (id: string) => {
    socket.join(id)
  })

  socket.on('leaveRoom', (id: string) => {
    socket.leave(id)
  })

  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnected.')
  })
}
import { Socket } from 'socket.io'

interface adminData {
  id: string
  socketId: string
}

let admin: adminData[] = []

export const socketServer = (socket: Socket) => {
  socket.on('joinUser', user => {
    if (user.role === 'admin') {
      admin.push({ id: user._id, socketId: socket.id })
    }
  })

  socket.on('joinRoom', (id: string) => {
    socket.join(id)
  })

  socket.on('leaveRoom', (id: string) => {
    socket.leave(id)
  })

  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnected.')
  })

  socket.on('createNotification', data => {
    admin.forEach(item => {
      socket.to(item.socketId).emit('createNotificationToClient', data)
    })
  })
}
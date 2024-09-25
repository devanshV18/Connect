import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Message = () => {
  const params = useParams()
  console.log("params", params?.userId)
  
  const socketConnection = useSelector(state => state.user.socketConnection)

  
  useEffect(() => {
    if(socketConnection){
      
      socketConnection.emit('message-page', params.userId)
      socketConnection.on('message-user', (data) => {
        console.log('userDetails', data)
      })
    }
  }, [socketConnection, params?.userId])

  return (
    <div>
      Messages
    </div>
  )
}

export default Message

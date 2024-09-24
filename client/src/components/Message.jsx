import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Message = () => {
  const params = useParams()
  console.log("params", params?.userId)
  const socketConenction = useSelector(state => state?.user?.socketConenction)

  useEffect(() => {
    if(socketConenction){
      socketConenction.emit('message-page', params.userId)
    }
  }, [socketConenction])

  return (
    <div>
      Messages
    </div>
  )
}

export default Message

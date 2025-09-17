import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addOneMessage } from '../store/messagesSlice'
import { socketEvents } from '../store/constans'
import socket from '../utils/socket'

function MessagesBox(props) {
  const { messages } = props
  const dispatch = useDispatch()

  useEffect(() => {
    const handleNewMessage = (payload) => {
      dispatch(addOneMessage(payload))
    }

    socket.on(socketEvents.newMessage, handleNewMessage)
    return () => {
      socket.off(socketEvents.newMessage, handleNewMessage)
    }
  }, [dispatch])

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.map((message) => {
        return (
          <div key={message.id} className="text-break mb-2">
            <b>{message.username}</b>
            {`: ${message.body}`}
          </div>
        )
      })}
    </div>
  )
}

export default MessagesBox

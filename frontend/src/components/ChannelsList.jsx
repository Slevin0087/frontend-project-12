import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveChannel } from '../store/channelsSlice'
import {
  addOneChannel,
  removeChannel,
  renameChannel,
} from '../store/channelsSlice'
import { socketEvents } from '../store/constans'
import socket from '../utils/socket'
import RemovableChannel from './RemovableChannel'
import cn from 'classnames'

function ChannelsList() {
  const dispatch = useDispatch()
  const channels = useSelector(state => state.channels.channels)
  const modifiedChannel = useSelector(
    state => state.channels.modifiedChannel,
  )
  const activeChannel = useSelector(state => state.channels.activeChannel)

  const handleSetActiveChannel = (cannel) => {
    dispatch(setActiveChannel(cannel))
  }

  useEffect(() => {
    const handleAddNewChannel = (payload) => {
      dispatch(addOneChannel(payload))
    }

    const handleRemoveChannel = (payload) => {
      dispatch(removeChannel(payload))
      dispatch(setActiveChannel(channels[0]))
    }

    const handleRenameChannel = (channel) => {
      dispatch(renameChannel(channel))
    }

    socket.on(socketEvents.addNewChannel, handleAddNewChannel)
    socket.on(socketEvents.removeChannel, handleRemoveChannel)
    socket.on(socketEvents.renameChannel, handleRenameChannel)
    return () => {
      // socket.removeAllListeners();
      socket.off(socketEvents.addNewChannel, handleAddNewChannel)
      socket.off(socketEvents.removeChannel, handleRemoveChannel)
      socket.off(socketEvents.renameChannel, handleRenameChannel)
    }
  }, [channels, modifiedChannel, dispatch])

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels.map((channel) => {
        const isActiveChannel = activeChannel.id === channel.id
        const btnClass = cn({
          'w-100 rounded-0 text-start btn': true,
          'btn-secondary': isActiveChannel,
        })

        return (
          <li key={channel.id} className="nav-item w-100">
            {
              channel.removable ?
                  (
                    <RemovableChannel
                      channel={channel}
                      isActiveChannel={isActiveChannel}
                      handleSetActiveChannel={() => handleSetActiveChannel(channel)}
                    />
                  )
                  : (
                    <button
                      type="button"
                      className={btnClass}
                      onClick={() => handleSetActiveChannel(channel)}
                    >
                      <span className="me-1">#</span>
                      {channel.name}
                    </button>
                  )
            }
          </li>
        )
      })}
    </ul>
  )
}

export default ChannelsList

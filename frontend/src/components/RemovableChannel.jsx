import { useDispatch } from 'react-redux'
import { setModifiedChannel } from '../store/channelsSlice'
import { showModalComponent } from '../store/modalsSlice'
import { useTranslation } from 'react-i18next'
import { modalBodyType } from '../store/constans'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'

function RemovableChannel(props) {
  const { channel, isActiveChannel, handleSetActiveChannel } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const titleRemoveChannel = t('modals.removeChannel.removeChannel')
  const titleRenameChannel = t('modals.renameChannel.renameChannel')
  const removeModalBodyType = modalBodyType.remove
  const renameModalBodyType = modalBodyType.rename

  const handleShowModal = (title, modalBodyType, channel) => {
    dispatch(setModifiedChannel(channel))
    dispatch(showModalComponent({ title, modalBodyType }))
  }

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button
        variant={isActiveChannel ? 'secondary' : 'light'}
        className="w-100 rounded-0 text-start text-truncate"
        onClick={() => handleSetActiveChannel(channel)}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
      <Dropdown.Toggle
        split
        variant={isActiveChannel ? 'secondary' : 'light'}
        className="flex-grow-0"
      >
        <span className="visually-hidden">
          {t('controlChannel.controlChannel')}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu align="bottom">
        <Dropdown.Item
          href="#"
          onClick={() => handleShowModal(titleRemoveChannel, removeModalBodyType, channel)}
        >
          {t('controlChannel.remove')}
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={() => handleShowModal(titleRenameChannel, renameModalBodyType, channel)}
        >
          {t('controlChannel.rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default RemovableChannel

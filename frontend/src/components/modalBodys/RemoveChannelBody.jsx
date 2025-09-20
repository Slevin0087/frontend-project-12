import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { headers } from '../../helpers/helper'
import { setActiveChannel, setModifiedChannel } from '../../store/channelsSlice'
import { unshowModalComponent } from '../../store/modalsSlice'
import { chatApi } from '../../store/constans'
import axios from 'axios'

function RemoveChannelBody() {
  const token = useSelector(state => state.auth.token)
  const channels = useSelector(state => state.channels.channels)
  const modifiedChannel = useSelector(state => state.channels.modifiedChannel)
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const { t } = useTranslation()
  const notify = () => toast.success(t('notifications.deleted'))

  const handleUnshow = () => dispatch(unshowModalComponent())

  const handleRemove = async (channel) => {
    setDisabled(true)
    try {
      await axios.delete(`${chatApi.channels}/${channel.id}`, headers(token))
      notify()
    }
    catch (error) {
      console.error('remove failed:', error)
    }
    finally {
      dispatch(setModifiedChannel(null))
      dispatch(setActiveChannel(channels[0]))
      setDisabled(false)
      dispatch(unshowModalComponent())
    }
  }

  return (
    <>
      <p className="lead">{t('modals.removeChannel.confirmation')}</p>
      <div className="d-flex justify-content-end">
        <Button
          type="button"
          className="me-2 btn btn-secondary"
          disabled={disabled}
          onClick={() => handleUnshow()}
        >
          {t('modals.removeChannel.cancel')}
        </Button>
        <Button
          type="button"
          className="btn btn-danger"
          disabled={disabled}
          onClick={() => handleRemove(modifiedChannel)}
        >
          {t('modals.removeChannel.remove')}
        </Button>
      </div>
    </>
  )
}

export default RemoveChannelBody

import { useState, useRef, useEffect } from 'react'
import { useFormik } from 'formik'
import { formsNames, getFormInitialValues, headers } from '../helpers/helper.js'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { unshowAddNewChannel } from '../store/modalsSlice.js'
import { chatApi } from '../routes.js'
import { setActiveChannel } from '../store/channelsSlice.js'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { ChannelValidationSchema } from '../validation.js'
import axios from 'axios'
import filter from '../utils/leoProfanity.js'

function ModalNewChannel() {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)
  const [disabled, setDisabled] = useState(false)
  const { t } = useTranslation()
  const show = useSelector(state => state.modals.addNewChannel.show)
  const channels = useSelector(state => state.channels.channels)
  const inputEl = useRef(null)
  const notify = () => toast.success(t('notifications.created'))
  const handleUnshow = () => {
    formik.resetForm()
    dispatch(unshowAddNewChannel())
  }

  const channelsNames = channels.map(channel => channel.name)

  const initialValues = getFormInitialValues(formsNames.ADDNEWCHANNEL_FORM)
  const validationSchema = ChannelValidationSchema(channelsNames, t)

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setDisabled(true)
      try {
        const filterClean = filter.clean(values.name)

        const newChannel = { name: filterClean }
        const response = await axios.post(
          chatApi.channels,
          newChannel,
          headers(token),
        )
        notify()
        dispatch(setActiveChannel(response.data))
        dispatch(unshowAddNewChannel())
      }
      catch (error) {
        console.error('neChannel failed:', error);
      }
      finally {
        setDisabled(false)
      }
    },
  })

  useEffect(() => {
    if (show && inputEl.current) {
      return inputEl.current.focus()
    }
  }, [show])

  return (
    <Modal show={show} centered>
      <Modal.Header className="btn" closeButton onClick={() => handleUnshow()}>
        <Modal.Title>{t('modals.newChannel.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="" onSubmit={formik.handleSubmit}>
          <div>
            <Form.Control
              ref={inputEl}
              name="name"
              id="name"
              className="mb-2 form-control"
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.errors.name}
            >
            </Form.Control>
            <Form.Label className="visually-hidden" htmlFor="name">
              {t('modals.newChannel.channelName')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            {' '}
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                className="me-2 btn btn-secondary"
                disabled={disabled}
                onClick={() => handleUnshow()}
              >
                {t('modals.newChannel.cancel')}
              </Button>
              <Button
                type="submit"
                className="btn btn-primary"
                disabled={disabled}
              >
                {t('modals.newChannel.send')}
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalNewChannel

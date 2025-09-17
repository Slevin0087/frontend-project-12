import { setModifiedChannel } from '../store/channelsSlice'
import { useState, useRef, useEffect } from 'react'
import { useFormik } from 'formik'
import { formsNames, getFormInitialValues, headers } from './helpers/helper'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { unshowRenameChannel } from '../store/modalsSlice.js'
import { chatApi } from '../routes.js'
import { defaultValues } from '../store/constans.js'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { ChannelValidationSchema } from '../validation.js'
import axios from 'axios'

function ModalRenameChannel() {
  const dispatch = useDispatch()
  const inputEl = useRef(null)
  const { token } = useSelector(state => state.auth)
  const channels = useSelector(state => state.channels.channels)
  const modifiedChannel = useSelector(
    state => state.channels.modifiedChannel,
  )
  const notify = () => toast.success(t('notifications.renamed'))

  const { show } = useSelector(state => state.modals.renameChannel)

  const [disabled, setDisabled] = useState(false)

  const channelsNames = channels.map(channel => channel.name)

  const { t } = useTranslation()

  const handleUnshow = () => {
    formik.resetForm()
    dispatch(unshowRenameChannel())
  }

  const initialValues = getFormInitialValues(formsNames.RENAME_CHANNEL_FORM)
  const validationSchema = ChannelValidationSchema(channelsNames, t)

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setDisabled(true)
      try {
        const editedChannel = { name: values.name }
        await axios.patch(
          `${chatApi.channels}/${modifiedChannel.id}`,
          editedChannel,
          headers(token),
        )
        notify()
      }
      catch (error) {
        console.error('rename failed:', error)
      }
      finally {
        values.name = defaultValues.channelName
        setDisabled(false)
        dispatch(unshowRenameChannel())
        dispatch(setModifiedChannel(null))
      }
    },
  })

  useEffect(() => {
    if (show && inputEl.current) {
      inputEl.current.value = modifiedChannel?.name
      inputEl.current.focus()
      inputEl.current.select()
    }
  }, [show, modifiedChannel?.name])

  return (
    <Modal show={show} centered>
      <Modal.Header className="btn" closeButton onClick={() => handleUnshow()}>
        <Modal.Title>{t('modals.renameChannel.renameChannel')}</Modal.Title>
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
              Имя канала
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>

            <div className="d-flex justify-content-end">
              <Button
                type="button"
                className="me-2 btn btn-secondary"
                disabled={disabled}
                onClick={() => handleUnshow()}
              >
                {t('modals.renameChannel.cancel')}
              </Button>
              <Button
                type="submit"
                className="btn btn-primary"
                disabled={disabled}
              >
                {t('modals.renameChannel.send')}
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalRenameChannel

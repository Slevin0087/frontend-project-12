import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { setModifiedChannel } from '../../store/channelsSlice'
import { unshowModalComponent } from '../../store/modalsSlice'
import {
  formsNames,
  getFormInitialValues,
  headers,
} from '../../helpers/helper'
import { defaultValues } from '../../store/constans'
import { channelValidationSchema } from '../../validation'
import { toast } from 'react-toastify'
import { chatApi } from '../../store/constans'
import axios from 'axios'

function RenameChannelForm() {
  const token = useSelector(state => state.auth.token)

  const channels = useSelector(state => state.channels.channels)
  const modifiedChannel = useSelector(state => state.channels.modifiedChannel)

  const [disabled, setDisabled] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const inputEl = useRef(null)
  const show = useSelector(state => state.modals.modalComponent.show)
  const channelsNames = channels.map(channel => channel.name)
  const notify = () => toast.success(t('notifications.renamed'))

  const initialValues = getFormInitialValues(formsNames.RENAME_CHANNEL_FORM)
  const validationSchema = channelValidationSchema(channelsNames, t)

  const handleUnshow = () => dispatch(unshowModalComponent())

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
        handleUnshow()
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
          autoComplete="off"
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
          <Button type="submit" className="btn btn-primary" disabled={disabled}>
            {t('modals.renameChannel.send')}
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default RenameChannelForm

import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import {
  formsNames,
  getFormInitialValues,
  headers,
} from '../../helpers/helper'
import { channelValidationSchema } from '../../validation'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { setActiveChannel } from '../../store/channelsSlice'
import { unshowModalComponent } from '../../store/modalsSlice'
import { chatApi } from '../../store/constans'
import axios from 'axios'
import filter from '../../utils/leoProfanity'

function NewChannelForm() {
  const token = useSelector(state => state.auth.token)
  const channels = useSelector(state => state.channels.channels)
  const [disabled, setDisabled] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const inputEl = useRef(null)
  const show = useSelector(state => state.modals.modalComponent.show)
  const channelsNames = channels.map(channel => channel.name)
  const notify = () => toast.success(t('notifications.created'))

  const initialValues = getFormInitialValues(formsNames.ADDNEWCHANNEL_FORM)
  const validationSchema = channelValidationSchema(channelsNames, t)

  const handleUnshow = () => dispatch(unshowModalComponent())

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
      }
      catch (error) {
        console.error('neChannel failed:', error)
      }
      finally {
        setDisabled(false)
        dispatch(unshowModalComponent())
      }
    },
  })

  useEffect(() => {
    if (show && inputEl.current) {
      return inputEl.current.focus()
    }
  }, [show])

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
          <Button type="submit" className="btn btn-primary" disabled={disabled}>
            {t('modals.newChannel.send')}
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default NewChannelForm

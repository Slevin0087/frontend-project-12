import { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { formsNames, getFormInitialValues, headers } from '../helpers/helper.js'
import { chatApi } from '../store/constans.js'
import { useSelector } from 'react-redux'
import { defaultValues } from '../store/constans.js'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import filter from '../utils/leoProfanity.js'

function MessageForm(props) {
  const { channels } = props
  const inputEl = useRef(null)
  const { username, token } = useSelector(state => state.auth)
  const [disabled, setDisabled] = useState(false)
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: getFormInitialValues(formsNames.MESSAGE_FORM),
    onSubmit: async (values) => {
      setDisabled(true)
      try {
        const filterClean = filter.clean(values.message)
        const body = filterClean
        const channelId = channels.activeChannel.id
        const newMessage = { body, channelId, username }
        await axios.post(
          chatApi.messages,
          newMessage,
          headers(token),
        )
        values.message = defaultValues.message
      }
      catch (error) {
        console.error('Message post failed:', error)
      }
      finally {
        setDisabled(false)
      }
    },
  })

  useEffect(() => {
    inputEl.current.focus()
  }, [channels.activeChannel])

  return (
    <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
      <div className="input-group has-validation">
        <Form.Control
          ref={inputEl}
          id="message"
          name="message"
          aria-label={t('homepage.ariaNewMessage')}
          placeholder={t('homepage.message')}
          onChange={formik.handleChange}
          value={formik.values.message}
        />

        <Button
          type="submit"
          variant="outline-primary"
          className="btn btn-group-vertical"
          disabled={disabled}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-right-square"
          >
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            >
            </path>
          </svg>
          <span className="visually-hidden">{t('homepage.sendButton')}</span>
        </Button>
      </div>
    </Form>
  )
}

export default MessageForm

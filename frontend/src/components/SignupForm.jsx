import { useEffect, useState, useRef } from 'react'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { formsNames, getFormInitialValues } from '../helpers/helper'
import { SignupValidationSchema } from '../validation'
import { loginUser } from '../store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clientRoutes, chatApi } from '../routes'
import { useTranslation } from 'react-i18next'

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const usernameInputRef = useRef(null)
  const [error, setError] = useState(false)
  const [errorValue, setErrorValue] = useState(null)

  const loginStatus = useSelector(state => state.auth.loginStatus)
  const loginError = useSelector(state => state.auth.error)

  const { t } = useTranslation()

  const initialValues = getFormInitialValues(formsNames.SIGNUP_FORM)
  const validationSchema = SignupValidationSchema(t)

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = { values, api: chatApi.signup }
      dispatch(loginUser(data))
    },
  })
  console.log(formik.errors)

  useEffect(() => {
    if (loginStatus) navigate(clientRoutes.home)
    if (loginError) {
      setError(true)
      if (loginError.code === 'ERR_BAD_REQUEST') {
        setErrorValue(t('errors.userExist'))
      }
      else if (loginError.code === 'ERR_NETWORK') {
        setErrorValue(t('errors.network'))
      }
      else setErrorValue(t('errors.unknown'))
    }
  }, [loginStatus, loginError, navigate, t])

  useEffect(() => {
    usernameInputRef.current.focus()
  }, [])

  return (
    <Form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('signupPage.signup')}</h1>

      <Form.Floating className="mb-3">
        <Form.Control
          placeholder={t('errors.lengthRules')}
          name="username"
          autoComplete="username"
          required
          id="username"
          ref={usernameInputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          isInvalid={formik.touched.username && formik.errors.username}
        />
        <Form.Label htmlFor="username">{t('signupPage.username')}</Form.Label>
        <Form.Control.Feedback type="invalid" placement="right" tooltip>
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Floating>

      <Form.Floating className="mb-3">
        <Form.Control
          placeholder={t('errors.passwordMinLength')}
          name="password"
          aria-describedby="passwordHelpBlock"
          required=""
          autoComplete="new-password"
          type="password"
          id="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isInvalid={formik.touched.password && formik.errors.password}
        />
        <Form.Label htmlFor="password">{t('password')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Floating>

      <Form.Floating className="mb-4">
        <Form.Control
          placeholder={t('errors.passwordsMatch')}
          name="confirmPassword"
          required
          autoComplete="new-password"
          type="password"
          id="confirmPassword"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          onBlur={formik.handleBlur}
          isInvalid={
            (formik.touched.confirmPassword
              && formik.errors.confirmPassword
              && formik.values.password)
              || error
          }
        />
        <Form.Label htmlFor="confirmPassword">
          {t('signupPage.confirmPassword')}
        </Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>
          {errorValue ? errorValue : t('errors.passwordsMatch')}
        </Form.Control.Feedback>
      </Form.Floating>
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100"
        disabled={formik.isSubmitting}
      >
        {t('signupPage.registration')}
      </Button>
    </Form>
  )
}

export default SignupForm

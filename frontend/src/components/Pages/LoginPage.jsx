import avatar from '../../assets/avatar.jpg'
import FormComponent from '../LoginForm.jsx'
import { useTranslation } from 'react-i18next'

function LoginPageFooter() {
  const { t } = useTranslation()
  return (
    <div className="card-footer p-4">
      <div className="text-center">
        <span>{t('loginPage.noAcc')}</span>
          {' '}
          <a href="/signup">{t("loginPage.signupNavigate")}</a>
      </div>
    </div>
  )
}

function LoginPage() {
  const { t } = useTranslation()
  return (
    <>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src={avatar}
                    className="rounded-circle"
                    alt={t("loginPage.login")}
                  ></img>
                </div>
                <FormComponent />
              </div>
              <LoginPageFooter />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage

import avatar_1 from '../../assets/avatar_1.jpg'
import SignupForm from '../SignupForm.jsx'
import { useTranslation } from 'react-i18next'

function SignupPage() {
  const { t } = useTranslation()
  return (
    <>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img
                    src={avatar_1}
                    className="rounded-circle"
                    alt={t('signupPage.signup')}
                  >
                  </img>
                </div>
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignupPage

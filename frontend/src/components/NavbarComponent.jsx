import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import ExitButton from './ExitButton'
import { clientRoutes } from '../store/constans'
import { useDispatch, useSelector } from 'react-redux'
import { userLogOut } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function NavbarComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loginStatus = useSelector(state => state.auth.loginStatus)
  const { t } = useTranslation()

  const handleExit = () => {
    dispatch(userLogOut())
    navigate(clientRoutes.login)
  }

  return (
    <Navbar expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand href={clientRoutes.home}>
          {t('homepage.header.title')}
        </Navbar.Brand>
        {loginStatus && <ExitButton onClick={handleExit} />}
      </Container>
    </Navbar>
  )
}

export default NavbarComponent

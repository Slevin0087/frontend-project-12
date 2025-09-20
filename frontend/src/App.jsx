import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { clientRoutes } from './store/constans.js'
import NavbarComponent from './components/NavbarComponent.jsx'
import LoginPage from './components/Pages/LoginPage.jsx'
import SignupPage from './components/Pages/SignupPage.jsx'
import NotFoundPage from './components/Pages/NotFoundPaje.jsx'
import ChatPage from './components/Pages/ChatPage.jsx'

function PrivateRoute({ children }) {
  const token = useSelector(state => state.auth.token)
  return token ? children : <Navigate to={clientRoutes.login} />
}

const App = () => {
  return (
    <BrowserRouter>
      <>
        <div className="d-flex flex-column h-100">
          <NavbarComponent />
          <Routes>
            <Route
              path={clientRoutes.home}
              element={
                (
                  <PrivateRoute>
                    <ChatPage />
                  </PrivateRoute>
                )
              }
            />
            <Route path={clientRoutes.login} element={<LoginPage />} />
            <Route path={clientRoutes.signup} element={<SignupPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <div className="Toastify"></div>
      </>
    </BrowserRouter>
  )
}

export default App

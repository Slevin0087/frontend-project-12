import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { clientRoutes } from "./routes.js";
import NavbarComponent from "./components/NavbarComponent.jsx";
import LoginPage from "./components/Pages/LoginPage.jsx";
import SignupPage from "./components/Pages/SignupPage.jsx";
import NotFoundPage from "./components/Pages/NotFoundPaje.jsx";
import ChatPage from "./components/Pages/ChatPage.jsx";

function PrivateRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  console.log("в PrivateRoute: ", token);

  return token ? children : <Navigate to={clientRoutes.login} />;
}

// import React from 'react';
// import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'

// const rollbarConfig = {
//   accessToken: '440602d9c12c44e09a7ba6eb1306b863',
//   environment: 'testenv',
// };

// function TestError() {
//   const a = null;
//   return a.hello();
// }

// Provider instantiates Rollbar client instance handling any uncaught errors or unhandled promises in the browser
// ErrorBoundary catches all React errors in the tree below and logs them to Rollbar
// export default function App() {
//   return (
//     <Provider config={rollbarConfig}>
//       <ErrorBoundary>
//         <TestError />
//       </ErrorBoundary>
//     </Provider>
//   );
// }

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
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
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
  );
};

export default App;

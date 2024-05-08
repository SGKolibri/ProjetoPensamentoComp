import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'react-auth-kit'
import 'bootstrap/dist/css/bootstrap.min.css'
import { StyledEngineProvider } from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <AuthProvider
        authType={'cookie'}
        authName={'_auth'}
        sameSite={'none'}
        cookieDomain={window.location.hostname} // setar o dominio do cookie
        cookieSecure={false} // settar true para https
      >
        <GoogleOAuthProvider clientId='824154051332-ivo69s15kk6md3rjh74bichc2ddueqmn.apps.googleusercontent.com'>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </AuthProvider>
    </StyledEngineProvider>
  </React.StrictMode >
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

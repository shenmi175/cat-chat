import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SettingsPage from './SettingsPage.jsx'
import DocPage from './DocPage.jsx'

const hash = window.location.hash;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {hash === '#settings' ? <SettingsPage /> : 
     hash === '#doc' ? <DocPage /> : 
     <App />}
  </React.StrictMode>
)

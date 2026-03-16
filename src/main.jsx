import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SettingsPage from './SettingsPage.jsx'

const isSettings = window.location.hash === '#settings';

ReactDOM.createRoot(document.getElementById('root')).render(
  isSettings ? <SettingsPage /> : <App />
)

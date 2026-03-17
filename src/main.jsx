import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SettingsPage from './SettingsPage.jsx'
import DocPage from './DocPage.jsx'
import HistoryPage from './HistoryPage.jsx'
import SensoryPage from './SensoryPage.jsx'
import './index.css'

const Main = () => {
  const [route, setRoute] = useState(window.location.hash || '#');

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isDashboardRoute = ['#settings', '#doc', '#history', '#sensory', '#general', '#memory'].some(r => route.startsWith(r));
  if (isDashboardRoute) return <SettingsPage />;
  return <App />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)

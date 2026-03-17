import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SettingsPage from './SettingsPage.jsx'
import DocPage from './DocPage.jsx'
import HistoryPage from './HistoryPage.jsx'
import './index.css'

const Main = () => {
  const [route, setRoute] = useState(window.location.hash || '#');

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (route.startsWith('#settings')) return <SettingsPage />;
  if (route.startsWith('#doc')) return <DocPage />;
  if (route.startsWith('#history')) return <HistoryPage />;
  return <App />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)

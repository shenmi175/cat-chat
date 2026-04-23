import { StrictMode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SettingsPage from './SettingsPage.jsx'
import './index.css'

// eslint-disable-next-line react-refresh/only-export-components
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
  <StrictMode>
    <Main />
  </StrictMode>
)

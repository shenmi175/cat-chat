import DocPage from './DocPage.jsx'

const hash = window.location.hash;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {hash === '#settings' ? <SettingsPage /> : 
     hash === '#doc' ? <DocPage /> : 
     <App />}
  </React.StrictMode>
)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import 'leaflet/dist/leaflet.css';
import App from './App';
import { ErrorBoundary } from './components';
import './index.css';

const redirect = sessionStorage.getItem('kenai-listings-redirect');
if (redirect) {
  sessionStorage.removeItem('kenai-listings-redirect');
  window.history.replaceState(null, '', redirect);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>,
);

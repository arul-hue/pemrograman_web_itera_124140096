import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';

// HashRouter dipakai supaya refresh halaman tidak 404 di GitHub Pages
createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
);

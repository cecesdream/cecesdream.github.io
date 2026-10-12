import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Every deploy (the story sync runs nightly) replaces the hashed chunks, so a tab
// opened before it asks for files that are gone. Reload once to pick up the new build.
window.addEventListener('vite:preloadError', (event) => {
  let last = 0;
  try { last = Number(sessionStorage.getItem('chunk-reload-at')) || 0; } catch {}
  if (Date.now() - last < 10_000) return;
  try { sessionStorage.setItem('chunk-reload-at', String(Date.now())); } catch {}
  event.preventDefault();
  window.location.reload();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

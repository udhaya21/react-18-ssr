import { hydrateRoot } from 'react-dom/client';
import App from '../src/components/App';

hydrateRoot(
  document,
  <App assets={window.assetManifest} posts={window.__INITIAL__STATE__} />
);

import { render } from 'preact';
import 'katex/dist/katex.min.css';
import './styles.css';
import { App } from './App.jsx';

render(<App />, document.getElementById('app'));

if ('serviceWorker' in navigator && location.protocol.startsWith('http') && import.meta.env.PROD) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

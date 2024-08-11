import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import '@/index.css';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
} else {
  console.log('Failed to find the root element');
}

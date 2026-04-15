import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from 'src/context/AuthContext';
import App from './App';

ReactDOM.render((
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();

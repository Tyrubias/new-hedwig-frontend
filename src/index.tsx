import { StrictMode } from 'react';
import { render } from 'react-dom';

import App from './App';
import reportWebVitals from '@hedwig/utils/reportWebVitals';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('app'),
);

// enable vitals reporting by passing a logging function in this call
reportWebVitals();

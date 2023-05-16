import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';

import TuDineroApp from './TuDineroApp';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      < TuDineroApp />
    </BrowserRouter>
  </React.StrictMode>,
)

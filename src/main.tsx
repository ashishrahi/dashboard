import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
import { Provider } from 'react-redux'
import {store} from './store/store'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Router>
    <Provider store={store}>
      <App />
      </Provider>
    </Router>
    </QueryClientProvider>
  </React.StrictMode>,
);

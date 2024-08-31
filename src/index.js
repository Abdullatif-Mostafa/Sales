import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
// import '../node_modules/bootstrap/dist/js/bootstrap.min.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
// import '@fortawesome/fontawesome-free/css/all.min.css';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './RTK/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>  
    <Provider store={store}>
       <App />    
   </Provider>  
   </BrowserRouter>
  </React.StrictMode>
);

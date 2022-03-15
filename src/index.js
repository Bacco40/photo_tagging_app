import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import Footer from './Components/Footer';
import { initializeApp } from 'firebase/app';

initializeApp({
  apiKey: "AIzaSyBE_pkFYbo23vH51T9q6Rr231G_b11o9YI",
  authDomain: "photo-tagging-app-b0a6a.firebaseapp.com",
  projectId: "photo-tagging-app-b0a6a",
  storageBucket: "photo-tagging-app-b0a6a.appspot.com",
  messagingSenderId: "798707054213",
  appId: "1:798707054213:web:791b51e14f75d3abce9bec"
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);

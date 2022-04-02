import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Archive from './Archive'
import Findings from './Findings'
import Navigation from './Navigation';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/findings" element={<Findings />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
/*<React.StrictMode>
    <App />
  </React.StrictMode>,*/
reportWebVitals();

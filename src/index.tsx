import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';

import { Routes } from './routes';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode >
    <div className="w-screen h-screen bg-gray-200" >
      <Routes/>
    </div>
  </React.StrictMode>
);


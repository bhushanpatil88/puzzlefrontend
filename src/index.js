import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserProvider } from './auth/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <App />
    </UserProvider>
);


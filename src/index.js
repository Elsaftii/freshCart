import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserContextProvider from './Context/UserContext';
import CartContextProvider from './Context/CartContext';
import { QueryClientProvider ,QueryClient } from 'react-query';

let queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client ={queryClient}>

        <CartContextProvider>
            <UserContextProvider>
                <App />

            </UserContextProvider>

        </CartContextProvider>
    </QueryClientProvider>

);

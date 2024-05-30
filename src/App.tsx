import React from 'react';
import Home from './pags/Home';
import NotFound from './pags/NotFound';
import { Route, Routes } from 'react-router';
import Cart from './pags/Cart';
import MainLayout from './layout/MainLayout';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route path="cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;

import { CircularProgress, Box } from '@mui/material';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header.jsx";


const Home = lazy(() => import('../pages/HomePage'));
const List = lazy(() => import('../pages/ListPage'));
const Cart = lazy(() => import('../pages/CartPage'));

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Suspense
                fallback={
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100vh'
                        }}
                    >
                        <CircularProgress />
                    </Box>
                }
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/produtos" element={<List />} />
                    <Route path="/carrinho" element={<Cart />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default Router
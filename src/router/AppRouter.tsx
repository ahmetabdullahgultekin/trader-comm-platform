import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Toaster} from 'react-hot-toast';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Lazy loading for better performance
const HomePage = lazy(() => import('../pages/HomePage'));
const ProductsPage = lazy(() => import('../pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const PartnersPage = lazy(() => import('../pages/PartnersPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Create QueryClient instance
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
            refetchOnWindowFocus: false,
        },
    },
});

const AppRouter: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Layout>
                    <Suspense fallback={<LoadingSpinner/>}>
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/urunler" element={<ProductsPage/>}/>
                            <Route path="/urun/:id" element={<ProductDetailPage/>}/>
                            <Route path="/hakkimda" element={<AboutPage/>}/>
                            <Route path="/iletisim" element={<ContactPage/>}/>
                            <Route path="/is-ortaklarimiz" element={<PartnersPage/>}/>

                            {/* Redirect old URLs to Turkish ones */}
                            <Route path="/products" element={<Navigate to="/urunler" replace/>}/>
                            <Route path="/about" element={<Navigate to="/hakkimda" replace/>}/>
                            <Route path="/contact" element={<Navigate to="/iletisim" replace/>}/>
                            <Route path="/partners" element={<Navigate to="/is-ortaklarimiz" replace/>}/>

                            {/* 404 Page */}
                            <Route path="*" element={<NotFoundPage/>}/>
                        </Routes>
                    </Suspense>
                </Layout>

                {/* Toast notifications */}
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                        success: {
                            style: {
                                background: '#10B981',
                            },
                        },
                        error: {
                            style: {
                                background: '#EF4444',
                            },
                        },
                    }}
                />
            </Router>
        </QueryClientProvider>
    );
};

export default AppRouter;

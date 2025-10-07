import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Toaster} from 'react-hot-toast';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import GoogleAnalytics from '../components/integrations/GoogleAnalytics';
import LiveChat from '../components/integrations/LiveChat';
import {AuthProvider} from '../contexts/AuthContext';

// Public pages - Lazy loading for better performance
const HomePage = lazy(() => import('../pages/HomePage'));
const ProductsPage = lazy(() => import('../pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const PartnersPage = lazy(() => import('../pages/PartnersPage'));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Auth pages
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const LogoutPage = lazy(() => import('../pages/auth/LogoutPage'));

// Admin pages
const AdminLoginPage = lazy(() => import('../pages/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const AdminProductsPage = lazy(() => import('../pages/admin/AdminProductsPage'));
const AdminAddProductPage = lazy(() => import('../pages/admin/AdminAddProductPage'));
const AdminEditProductPage = lazy(() => import('../pages/admin/AdminEditProductPage'));

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
            <AuthProvider>
                <Router>
                    {/* Google Analytics */}
                    <GoogleAnalytics/>

                    {/* Live Chat Widget */}
                    <LiveChat/>

                    <Suspense fallback={<LoadingSpinner fullScreen message="Sayfa yükleniyor..."/>}>
                        <Routes>
                            {/* Public Routes with Layout */}
                            <Route path="/" element={<Layout><HomePage/></Layout>}/>
                            <Route path="/urunler" element={<Layout><ProductsPage/></Layout>}/>
                            <Route path="/urunler/:id" element={<Layout><ProductDetailPage/></Layout>}/>
                            <Route path="/hakkimda" element={<Layout><AboutPage/></Layout>}/>
                            <Route path="/iletisim" element={<Layout><ContactPage/></Layout>}/>
                            <Route path="/is-ortaklarimiz" element={<Layout><PartnersPage/></Layout>}/>
                            <Route path="/favoriler" element={<Layout><FavoritesPage/></Layout>}/>

                            {/* Auth Routes without Layout */}
                            <Route path="/giris" element={<LoginPage/>}/>
                            <Route path="/cikis" element={<LogoutPage/>}/>

                            {/* Redirect old URLs to Turkish ones */}
                            <Route path="/products" element={<Navigate to="/urunler" replace/>}/>
                            <Route path="/about" element={<Navigate to="/hakkimda" replace/>}/>
                            <Route path="/contact" element={<Navigate to="/iletisim" replace/>}/>
                            <Route path="/partners" element={<Navigate to="/is-ortaklarimiz" replace/>}/>

                            {/* Admin Routes without Layout */}
                            <Route path="/admin" element={<AdminLoginPage/>}/>
                            <Route path="/admin/dashboard" element={
                                <ProtectedRoute>
                                    <AdminDashboardPage/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/admin/urunler" element={
                                <ProtectedRoute>
                                    <AdminProductsPage/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/admin/urun-ekle" element={
                                <ProtectedRoute>
                                    <AdminAddProductPage/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/admin/urun-duzenle/:id" element={
                                <ProtectedRoute>
                                    <AdminEditProductPage/>
                                </ProtectedRoute>
                            }/>

                            {/* 404 Page */}
                            <Route path="*" element={<Layout><NotFoundPage/></Layout>}/>
                        </Routes>
                    </Suspense>

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
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default AppRouter;

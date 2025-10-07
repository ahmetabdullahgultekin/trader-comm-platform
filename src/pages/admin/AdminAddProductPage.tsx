import React from 'react';
import {useNavigate} from 'react-router-dom';
import AddProductPage from '../../components/admin/AddProductPage';
import type {Product} from '../../types';
import {RouteKey} from '../../types/enums';

const AdminAddProductPage: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(RouteKey.ADMIN_PRODUCTS);
    };

    const handleProductAdded = (product: Product) => {
        // Product added successfully, navigate to products list
        navigate(RouteKey.ADMIN_PRODUCTS);
    };

    return (
        <AddProductPage
            onBack={handleBack}
            onProductAdded={handleProductAdded}
        />
    );
};

export default AdminAddProductPage;

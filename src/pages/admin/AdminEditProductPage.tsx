import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Loader} from 'lucide-react';
import EditProductPage from '../../components/admin/EditProductPage';
import {productService} from '../../services/firebaseService';
import type {Product} from '../../types';
import {RouteKey} from '../../types/enums';

const AdminEditProductPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) {
                setError('Ürün ID bulunamadı');
                setLoading(false);
                return;
            }

            try {
                const productData = await productService.getProduct(id);
                if (productData) {
                    setProduct(productData);
                } else {
                    setError('Ürün bulunamadı');
                }
            } catch (err: any) {
                setError(err.message || 'Ürün yüklenirken hata oluştu');
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    const handleBack = () => {
        navigate(RouteKey.ADMIN_PRODUCTS);
    };

    const handleProductUpdated = (updatedProduct: Product) => {
        setProduct(updatedProduct);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4"/>
                    <p className="text-gray-600">Ürün yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-600 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Hata</h2>
                    <p className="text-gray-600 mb-6">{error || 'Ürün bulunamadı'}</p>
                    <button
                        onClick={handleBack}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Ürün Listesine Dön
                    </button>
                </div>
            </div>
        );
    }

    return (
        <EditProductPage
            product={product}
            onBack={handleBack}
            onProductUpdated={handleProductUpdated}
        />
    );
};

export default AdminEditProductPage;

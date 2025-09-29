import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {ArrowLeft, Eye} from 'lucide-react';
import {useTranslation} from '../hooks';
import {useFahriErenConfig} from '../hooks/useFahriErenConfig';
import SEO from '../components/common/SEO';

const ProductDetailPage: React.FC = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const config = useFahriErenConfig();

    return (
        <>
            <SEO
                title={t('product.details')}
                description={t('product.detailsDesc')}
            />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4"/>
                        {t('common.goBack')}
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4"/>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        {t('product.notFound')}
                    </h2>
                    <p className="text-gray-500 mb-6">
                        {t('product.notFoundDesc')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/urunler')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            {t('product.viewAllProducts')}
                        </button>
                        <button
                            onClick={() => window.open(config.contact.whatsappUrl(), '_blank')}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            {t('contact.whatsapp')}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetailPage;

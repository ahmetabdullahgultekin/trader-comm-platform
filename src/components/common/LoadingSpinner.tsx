import React from 'react';
import {motion} from 'framer-motion';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    message?: string;
    fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                           size = 'md',
                                                           message = 'Yükleniyor...',
                                                           fullScreen = false
                                                       }) => {
    const sizeClasses = {
        sm: 'w-6 h-6 border-2',
        md: 'w-12 h-12 border-4',
        lg: 'w-16 h-16 border-4'
    };

    const content = (
        <div className="flex flex-col items-center justify-center space-y-4">
            <motion.div
                animate={{rotate: 360}}
                transition={{duration: 1, repeat: Infinity, ease: "linear"}}
                className={`${sizeClasses[size]} border-blue-200 border-t-blue-600 rounded-full`}
            />
            {message && (
                <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.2}}
                    className="text-gray-700 text-base font-medium"
                >
                    {message}
                </motion.p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 flex items-center justify-center"
            >
                {content}
            </motion.div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[200px] py-12">
            {content}
        </div>
    );
};

export default LoadingSpinner;

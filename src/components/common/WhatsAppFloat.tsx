import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppFloatProps {
    phoneNumber: string;
    message?: string;
}

const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({
    phoneNumber,
    message = 'Merhaba, urunleriniz hakkinda bilgi almak istiyorum.'
}) => {
    const handleClick = () => {
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            className="whatsapp-float"
            aria-label="WhatsApp ile iletisime gecin"
            title="WhatsApp ile iletisime gecin"
        >
            <MessageCircle className="w-7 h-7" />
        </button>
    );
};

export default WhatsAppFloat;

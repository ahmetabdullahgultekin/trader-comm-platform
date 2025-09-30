import React from 'react';
import {MapPin} from 'lucide-react';

interface GoogleMapProps {
    lat: number;
    lng: number;
    title?: string;
    zoom?: number;
}

const GoogleMap: React.FC<GoogleMapProps> = ({lat, lng, title = 'Konum', zoom = 15}) => {
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${lat},${lng}&zoom=${zoom}`;

    return (
        <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{border: 0}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={title}
                className="w-full h-full"
            />

            {/* Overlay badge */}
            <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600"/>
                <span className="font-semibold text-gray-900">{title}</span>
            </div>
        </div>
    );
};

export default GoogleMap;
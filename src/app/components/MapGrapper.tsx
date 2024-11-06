"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";

const MapComponent = dynamic(() => import('../components/MapComponent'), { ssr: false });

export default function MapWrapper() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return <MapComponent />;
}

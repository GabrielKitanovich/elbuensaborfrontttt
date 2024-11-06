import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

// Ruta de la imagen en la carpeta public
const iconUrl = '/pin.svg';

const customIcon = new L.Icon({
    iconUrl: iconUrl, // Aquí usamos la ruta pública directamente
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const MapComponent: React.FC = () => {
    return (
        <div className="w-full h-32">
            <MapContainer center={[-32.8719556, -68.8283655]} zoom={15} style={{ height: '100%', width: '100%' }}>
                <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />
                <Marker position={[-32.871909390614924, -68.82771107145592]} icon={customIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapComponent;

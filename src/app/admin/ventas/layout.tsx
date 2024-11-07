// src/app/ventas/layout.tsx

import React from 'react';

export default function VentasMinimalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-blue-500 min-h-screen py-10">
            <h1 className="text-center text-3xl font-bold text-white mb-8">ADMINISTRAR TUS PRODUCTOS</h1>
            <div className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
                {children}
            </div>
        </div>
    );
}


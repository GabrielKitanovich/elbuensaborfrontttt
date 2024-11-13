// layout.tsx
import React from 'react';

export default function VentasMinimalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-blue-500 min-h-screen py-10">
            <h1 className="text-center text-3xl font-bold text-white mb-8">ADMINISTRAR TUS PRODUCTOS</h1>
            <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                {children}
            </div>
        </div>
    );
}

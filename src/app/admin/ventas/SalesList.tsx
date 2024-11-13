// SalesList.tsx
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface SellData {
    id: string;
    product: {
        name: string;
        price: number;
    };
    qty: number;
    saleDate: string;
}

export default function SalesList() {
    const [sells, setSells] = useState<SellData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSells = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/sells');
                setSells(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar las ventas');
                setLoading(false);
            }
        };
        fetchSells();
    }, []);

    return (
        <div className="w-full max-w-xs bg-white p-4 rounded-xl shadow-lg overflow-auto">
            <h2 className="text-3xl font-semibold text-center text-gray-700 mb-4">Lista de Ventas</h2>
            {loading ? (
                <p className="text-center text-gray-500">Cargando ventas...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <ul className="space-y-4">
                    {sells.map((sell) => (
                        <li key={sell.id} className="p-2 border rounded-lg shadow-sm text-xs overflow-auto">
                            <h3 className="font-semibold text-gray-800 truncate">{sell.product.name}</h3>
                            <p className="text-gray-600">Cantidad: {sell.qty}</p>
                            <p className="text-gray-600">Precio Unitario: ${sell.product.price.toFixed(2)}</p>
                            <p className="text-gray-600">Fecha de Venta: {new Date(sell.saleDate).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

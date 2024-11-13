// SalesList.tsx
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface SellData {
    id: string;
    product: {
        name: string;
    };
    price: number;
    qty: number;
    saleDate: string;
}

const entriesPerPage = 3;

export default function SalesList() {
    const [sells, setSells] = useState<SellData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

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

    const totalPages = Math.ceil(sells.length / entriesPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedSells = sells.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

    return (
        <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg overflow-auto">
            <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Lista de Ventas</h2>
            {loading ? (
                <p className="text-center text-gray-500">Cargando ventas...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">ID</th>
                                <th className="py-2 px-4 border">Producto</th>
                                <th className="py-2 px-4 border">Cantidad</th>
                                <th className="py-2 px-4 border">Precio Unitario</th>
                                <th className="py-2 px-4 border">Precio Total</th>
                                <th className="py-2 px-4 border">Fecha de Venta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedSells.map((sell) => (
                                <tr key={sell.id}>
                                    <td className="py-2 px-4 border">{sell.id}</td>
                                    <td className="py-2 px-4 border">{sell.product.name}</td>
                                    <td className="py-2 px-4 border">{sell.qty}</td>
                                    <td className="py-2 px-4 border">${sell.price.toFixed(2)}</td>
                                    <td className="py-2 px-4 border">${(sell.price * sell.qty).toFixed(2)}</td>
                                    <td className="py-2 px-4 border">{new Date(sell.saleDate).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

// DayBookList.tsx

"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface DayBookData {
    id: string;
    description: string;
    amount: number;
    type: string;
    entryType: string;
    createdAt: string;
}

export default function DayBookList() {
    const [dayBooks, setDayBooks] = useState<DayBookData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDayBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/sells/daybook');
                setDayBooks(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los registros de daybook');
                setLoading(false);
            }
        };
        fetchDayBooks();
    }, []);

    return (
        <div className="w-full bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Registros de DayBook</h2>
            {loading ? (
                <p className="text-center text-gray-500">Cargando registros...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {dayBooks.map((dayBook, index) => (
                        <div key={dayBook.id} className="p-4 border rounded-lg shadow-sm">
                            <h5 className="text-[10px] font-semibold text-gray-800"> {/* Tamaño de fuente ajustado */}
                                {['VENTAS', 'CASH', 'CMV', 'MERCADERIAS'][index % 4]}
                            </h5>
                            <p className="text-gray-600">Monto: ${dayBook.amount.toFixed(2)}</p>
                            <p className="text-gray-600">Tipo: {dayBook.type}</p>
                            <p className="text-gray-600">Tipo de entrada: {dayBook.entryType}</p>
                            <p className="text-gray-600">Fecha: {new Date(dayBook.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

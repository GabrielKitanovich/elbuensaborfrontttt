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
    
    const currentDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const fetchDayBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/sells/daybook');
                const filteredDayBooks = response.data.filter((dayBook: DayBookData) => 
                    dayBook.createdAt.startsWith(currentDate)
                );
                setDayBooks(filteredDayBooks);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los registros de daybook');
                setLoading(false);
            }
        };
        fetchDayBooks();
    }, [currentDate]);

    const titles = ["VENTAS", "CASH", "CMV", "MERCADERIAS"];
    
    return (
        <div className="w-full max-w-xs bg-white p-4 rounded-xl shadow-lg overflow-auto">
            <h2 className="text-3xl font-semibold text-center text-gray-700 mb-4">Registros de DayBook</h2>
            <p className="text-center text-gray-500 mb-4 text-sm">Fecha de hoy: {currentDate}</p>
            {loading ? (
                <p className="text-center text-gray-500">Cargando registros...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="space-y-4">
                    {Array.from({ length: Math.ceil(dayBooks.length / 4) }, (_, rowIndex) => (
                        <div key={rowIndex}>
                            <div className="grid grid-cols-2 gap-4">
                                {dayBooks.slice(rowIndex * 4, rowIndex * 4 + 4).map((dayBook, index) => (
                                    <div key={dayBook.id} className="p-2 border rounded-lg shadow-sm text-xs overflow-auto">
                                        <h3 className="font-semibold text-gray-800 truncate">
                                            {titles[(rowIndex * 4 + index) % 4]}
                                        </h3>
                                        <p className="text-gray-600">Monto: ${dayBook.amount.toFixed(2)}</p>
                                        <p className="text-gray-600">Tipo: {dayBook.type}</p>
                                        <p className="text-gray-600">Tipo de entrada: {dayBook.entryType}</p>
                                        <p className="text-gray-600">Fecha: {new Date(dayBook.createdAt).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                            {rowIndex < Math.ceil(dayBooks.length / 4) - 1 && (
                                <hr className="my-4 border-t border-gray-300" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

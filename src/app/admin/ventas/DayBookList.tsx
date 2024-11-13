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

    // Agrupa los registros por fecha
    const groupedDayBooks = dayBooks.reduce((acc: { [key: string]: DayBookData[] }, dayBook) => {
        const date = new Date(dayBook.createdAt).toISOString().split('T')[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(dayBook);
        return acc;
    }, {});

    return (
        <div className="w-full max-w-xs bg-white p-4 rounded-xl shadow-lg overflow-auto">
            <h2 className="text-3xl font-semibold text-center text-gray-700 mb-4">Registros de DayBook</h2>
            {loading ? (
                <p className="text-center text-gray-500">Cargando registros...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="space-y-4">
                    {Object.keys(groupedDayBooks).map((date, dateIndex) => (
                        <div key={date}>
                            <h3 className="text-xl font-semibold text-gray-800">{`Fecha: ${date}`}</h3>
                            {Array.from({ length: Math.ceil(groupedDayBooks[date].length / 3) }, (_, rowIndex) => (
                                <div key={rowIndex}>
                                    <h4 className="text-lg font-semibold text-gray-700 text-center">{`${rowIndex + 1}`}</h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        {groupedDayBooks[date].slice(rowIndex * 3, rowIndex * 3 + 3).map((dayBook, idx) => (
                                            <div key={dayBook.id} className="p-2 border rounded-lg shadow-sm text-xs overflow-auto">
                                                <h3 className="font-semibold text-gray-800 truncate">{`Registro ${idx + 1}`}</h3>
                                                <p className="text-gray-600">Descripción: {dayBook.description}</p>
                                                <p className="text-gray-600">Monto: ${dayBook.amount.toFixed(2)}</p>
                                                <p className="text-gray-600">Tipo: {dayBook.type}</p>
                                                <p className="text-gray-600">Tipo de entrada: {dayBook.entryType}</p>
                                                <p className="text-gray-600">Fecha: {new Date(dayBook.createdAt).toLocaleString()}</p>
                                            </div>
                                        ))}
                                    </div>
                                    {rowIndex < Math.ceil(groupedDayBooks[date].length / 3) - 1 && (
                                        <hr className="my-4 border-t border-gray-300" />
                                    )}
                                </div>
                            ))}
                            {dateIndex < Object.keys(groupedDayBooks).length - 1 && (
                                <hr className="my-4 border-t border-gray-300" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

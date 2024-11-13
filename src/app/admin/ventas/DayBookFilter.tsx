// DayBookFilter.tsx
"use client";
import React, { useState } from 'react';
import axios from 'axios';

interface DayBookData {
    id: string;
    description: string;
    amount: number;
    type: string;
    entryType: string;
    createdAt: string;
}

export default function DayBookFilter() {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [filteredDayBooks, setFilteredDayBooks] = useState<DayBookData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFilter = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8080/api/v1/sells/daybook');
            const filteredData = response.data.filter((dayBook: DayBookData) => {
                const date = new Date(dayBook.createdAt);
                return date >= new Date(startDate) && date <= new Date(endDate);
            });
            setFilteredDayBooks(filteredData);
        } catch (err) {
            setError('Error al cargar los registros de daybook');
        }
        setLoading(false);
    };

    return (
        <div className="w-full max-w-xs bg-white p-4 rounded-xl shadow-lg overflow-auto">
            <h2 className="text-3xl font-semibold text-center text-gray-700 mb-4">Registros MayorBook</h2>
            <div className="flex justify-center space-x-4 mb-4">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="p-2 border rounded-lg"
                    required
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="p-2 border rounded-lg"
                    required
                />
                <button
                    onClick={handleFilter}
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Filtrar
                </button>
            </div>
            {loading ? (
                <p className="text-center text-gray-500">Cargando registros...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="space-y-4">
                    {Array.from({ length: Math.ceil(filteredDayBooks.length / 4) }, (_, rowIndex) => (
                        <div key={rowIndex}>
                            <div className="grid grid-cols-2 gap-4">
                                {filteredDayBooks.slice(rowIndex * 4, rowIndex * 4 + 4).map((dayBook) => (
                                    <div key={dayBook.id} className="p-2 border rounded-lg shadow-sm text-xs overflow-auto">
                                        <h3 className="font-semibold text-gray-800 truncate">{dayBook.description}</h3>
                                        <p className="text-gray-600">Monto: ${dayBook.amount.toFixed(2)}</p>
                                        <p className="text-gray-600">Tipo: {dayBook.type}</p>
                                        <p className="text-gray-600">Tipo de entrada: {dayBook.entryType}</p>
                                        <p className="text-gray-600">Fecha: {new Date(dayBook.createdAt).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                            {/* Línea divisora después de cada grupo completo de cuatro elementos */}
                            {rowIndex < Math.ceil(filteredDayBooks.length / 4) - 1 && (
                                <hr className="my-4 border-t border-gray-300" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

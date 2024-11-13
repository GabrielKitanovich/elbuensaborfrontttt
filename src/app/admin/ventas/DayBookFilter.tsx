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
    const [description, setDescription] = useState<string>('any');
    const [filteredDayBooks, setFilteredDayBooks] = useState<DayBookData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const descriptions = ['MERCADERIAS', 'GANANCIAS', 'BINANCE', 'MERCADOPAGO', 'CASH'];

    const handleFilter = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8080/api/v1/sells/daybook');
            const filteredData = response.data.filter((dayBook: DayBookData) => {
                const date = new Date(dayBook.createdAt);
                const isDateInRange = date >= new Date(startDate) && date <= new Date(endDate);
                const isDescriptionMatch = description === 'any' || dayBook.description === description;
                return isDateInRange && isDescriptionMatch;
            });
            setFilteredDayBooks(filteredData);
        } catch (err) {
            setError('Error al cargar los registros de daybook');
        }
        setLoading(false);
    };

    return (
        <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg overflow-auto">
            <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Registros MayorBook</h2>
            <div className="flex flex-wrap justify-center space-x-4 mb-6">
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
                <select
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 border rounded-lg"
                >
                    <option value="any">Any</option>
                    {descriptions.map((desc) => (
                        <option key={desc} value={desc}>
                            {desc}
                        </option>
                    ))}
                </select>
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
                <div className="space-y-6">
                    {Array.from({ length: Math.ceil(filteredDayBooks.length / 2) }, (_, rowIndex) => (
                        <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredDayBooks.slice(rowIndex * 2, rowIndex * 2 + 2).map((dayBook) => (
                                <div key={dayBook.id} className="p-4 border rounded-lg shadow-sm text-sm overflow-auto">
                                    <h3 className="font-semibold text-gray-800 truncate">{dayBook.description}</h3>
                                    <p className="text-gray-600">Monto: ${dayBook.amount.toFixed(2)}</p>
                                    <p className="text-gray-600">Tipo: {dayBook.type}</p>
                                    <p className="text-gray-600">Tipo de entrada: {dayBook.entryType}</p>
                                    <p className="text-gray-600">Fecha: {new Date(dayBook.createdAt).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

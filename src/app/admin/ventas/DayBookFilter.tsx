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

const entriesPerPage = 12;

const accountNumbers: { [key: string]: number } = {
    MERCADERIAS: 600,
    GANANCIAS: 700,
    BINANCE: 5721,
    MERCADOPAGO: 5722,
    CASH: 570,
};

export default function DayBookFilter() {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [description, setDescription] = useState<string>('any');
    const [filteredDayBooks, setFilteredDayBooks] = useState<DayBookData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

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
            setCurrentPage(1); // Reset page to 1 after filtering
        } catch (err) {
            setError('Error al cargar los registros de daybook');
        }
        setLoading(false);
    };

    const totalPages = Math.ceil(filteredDayBooks.length / entriesPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedDayBooks = filteredDayBooks.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

    const totalDebe = filteredDayBooks.reduce((sum, dayBook) => dayBook.entryType === 'DEBE' ? sum + dayBook.amount : sum, 0);
    const totalHaber = filteredDayBooks.reduce((sum, dayBook) => dayBook.entryType === 'HABER' ? sum + dayBook.amount : sum, 0);
    const saldo = totalHaber - totalDebe;

    return (
        <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg overflow-auto">
            <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">LIBRO MAYOR</h2>
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
                <>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border border-black">Nº ASIENTO</th>
                                <th className="py-2 px-4 border border-black">FECHA</th>
                                <th className="py-2 px-4 border border-black">Nº CUENTA</th>
                                <th className="py-2 px-4 border border-black">CONCEPTO</th>
                                <th className="py-2 px-4 border border-black">DEBE</th>
                                <th className="py-2 px-4 border border-black">HABER</th>
                            </tr>
                        </thead>
                        
                        <tbody className="">
                            {paginatedDayBooks.map((dayBook, index) => (
                                <tr key={dayBook.id}>
                                    <td className="py-2 px-4 border border-black">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                                    <td className="py-2 px-4 border border-black">{new Date(dayBook.createdAt).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border border-black">{accountNumbers[dayBook.description] || 'N/A'}</td>
                                    <td className="py-2 px-4 border border-black">{dayBook.description}</td>
                                    <td className="py-2 px-4 border border-black">{dayBook.entryType === 'DEBE' ? dayBook.amount.toFixed(2) : ''}</td>
                                    <td className="py-2 px-4 border border-black">{dayBook.entryType === 'HABER' ? dayBook.amount.toFixed(2) : ''}</td>
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
                    <div className="mt-6 text-center">
                        <p className="text-lg font-semibold">Total Debe: {totalDebe.toFixed(2)}</p>
                        <p className="text-lg font-semibold">Total Haber: {totalHaber.toFixed(2)}</p>
                        <p className={`text-lg font-semibold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            Saldo: {saldo.toFixed(2)} ({saldo >= 0 ? 'Positivo' : 'Negativo'})
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

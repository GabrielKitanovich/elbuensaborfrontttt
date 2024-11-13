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

const entriesPerPage = 12;

const accountNumbers: { [key: string]: number } = {
    MERCADERIAS: 600,
    GANANCIAS: 700,
    BINANCE: 5721,
    MERCADOPAGO: 5722,
    CASH: 570,
};

export default function DayBookList() {
    const [dayBooks, setDayBooks] = useState<DayBookData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

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

    const totalPages = Math.ceil(dayBooks.length / entriesPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedDayBooks = dayBooks.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

    return (
        <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg overflow-auto">
            <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">LIBRO DIARIO</h2>
            {loading ? (
                <p className="text-center text-gray-500">Cargando registros...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>

                                <th className="py-2 px-6 border border-black">Nº ASIENTO</th>
                                <th className="py-2 px-6 border border-black">FECHA</th>
                                <th className="py-2 px-6 border border-black">Nº CUENTA</th>
                                <th className="py-2 px-6 border border-black">CONCEPTO</th>
                                <th className="py-2 px-6 border border-black">DEBE</th>
                                <th className="py-2 px-6 border border-black">HABER</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedDayBooks.map((dayBook, index) => (
                                <React.Fragment key={dayBook.id}>
                                    {index % 3 === 0 && (
                                        <tr>
                                            <td colSpan={6} className="text-center font-bold py-2">
                                                ----------------------------------------------------------------{Math.floor(index / 3) + 1}-----------------------------------------------------------------------
                                            </td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td className="py-2 px-6 border border-black">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                                        <td className="py-2 px-6 border border-black">{new Date(dayBook.createdAt).toLocaleDateString()}</td>
                                        <td className="py-2 px-6 border border-black">{accountNumbers[dayBook.description] || 'N/A'}</td>
                                        <td className="py-2 px-6 border border-black">{dayBook.description}</td>
                                        <td className="py-2 px-6 border border-black">{dayBook.entryType === 'DEBE' ? dayBook.amount.toFixed(2) : ''}</td>
                                        <td className="py-2 px-6 border border-black">{dayBook.entryType === 'HABER' ? dayBook.amount.toFixed(2) : ''}</td>
                                    </tr>
                                </React.Fragment>
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

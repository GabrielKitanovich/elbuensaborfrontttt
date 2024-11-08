import React from 'react';
import DayBookList from './DayBookList';
import SalesList from './SalesList';

export default function VentasPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
            <SalesList />
            <DayBookList />
        </div>
    );
}

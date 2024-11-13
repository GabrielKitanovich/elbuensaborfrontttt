// VentasPage.tsx
import React from 'react';
import DayBookFilter from './DayBookFilter';
import DayBookList from './DayBookList';
import SalesList from './SalesList';

export default function VentasPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap gap-8 justify-center">
                <div className="w-full lg:w-1/3 max-w-xs">
                    <DayBookFilter />
                </div>
                <div className="w-full lg:w-1/3 max-w-xs">
                    <SalesList />
                </div>
                <div className="w-full lg:w-1/3 max-w-xs">
                    <DayBookList />
                </div>
            </div>
        </div>
    );
}

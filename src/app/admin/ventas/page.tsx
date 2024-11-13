// VentasPage.tsx
import React from 'react';
import DayBookFilter from './DayBookFilter';
import DayBookList from './DayBookList';
import SalesList from './SalesList';

export default function VentasPage() {
    return (
        
        <div className="container mx-auto px-8 py-12">
            
            <div className="flex flex-col gap-8 justify-center items-center">
                
                <div className="w-full max-w-4xl flex justify-center">
                    <SalesList />
                </div>
                <div className="w-full max-w-4xl">
                    <DayBookList />
                </div>
                <div className="w-full max-w-4xl">
                    <DayBookFilter />
                </div>
            </div>
        </div>
    );
}

// VentasPage.tsx

import React from 'react';
import DayBookList from './DayBookList';
import SalesList from './SalesList';

export default function VentasPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Organiza ambos componentes uno al lado del otro en pantallas medianas */}
            <SalesList />
            <DayBookList />
        </div>
    );
}

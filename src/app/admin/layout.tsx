// src/app/miCuenta/layout.tsx

import React from 'react';
import Navbar from '../components/Navbar';
import NavbarAdmin from '../components/NavbarAdmin';

export default function MiCuentaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <div className='bg-slate-200 '>
      <NavbarAdmin/>
      {children}
    </div>
    
  );
}

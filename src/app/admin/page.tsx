import React from 'react';

export default function Page() {
  return (
    <div className=" bg-slate-100 py-6"> 
      <div className="max-w-[1400px] mx-auto my-auto grid grid-cols-3 pt-5 justify-items-center rounded-xl bg-white shadow-2xl h-[800px]"> 
        <div className=""> 
          <h2 className="text-lg font-semibold uppercase">Hamburguesas</h2>
        </div>
        <div className=""> 
          <h2 className="text-lg font-semibold uppercase">Papas</h2>
        </div>
        <div className=""> 
          <h2 className="text-lg font-semibold uppercase">Bebidas</h2>
        </div>
      </div>
    </div>
  );
}

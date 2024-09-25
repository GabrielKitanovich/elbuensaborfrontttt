"use client";

import { useGetAllProductosQuery } from "@/redux/services/popularProductApi"; // Verifica que esta ruta sea correcta

export default function PopularProducts() {
    const { data: productos, error, isLoading } = useGetAllProductosQuery();

    if (isLoading) return <div>Cargando...</div>;
    if (error) {
        console.error("Error al cargar los productos:", error);
        return <div>Error al cargar los productos.</div>;
    }

    return (
        <>
            <h2 className="my-16 mx-6">
                Productos Populares
            </h2>
            <div className="grid grid-cols-2 gap-4">
                {productos?.map((producto) => (
                    <div key={producto.id} className="flex border p-4 gap-4">
                        <img src={producto.imagenHamburguesa} alt={producto.nombreHamburguesa} />

                        <div className="space-y-3">
                            <h2 className="text-lg font-semibold">{producto.nombreHamburguesa}</h2>
                            <p className="text-gray-600">Precio: ${producto.precioHamburguesa}</p>
                            <button className="bg-tertiary text-white w-[163px] h-[40px]">
                                Agregar
                            </button>
                        </div>
                
                    </div>
                ))}
            </div>
        </>
       
    );
}

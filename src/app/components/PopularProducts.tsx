"use client";

import { useGetAllProductosQuery } from "@/redux/services/popularProductApi";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice"; // Importa la acción para agregar al carrito
import { Product } from "@/redux/cartSlice"; // Asegúrate de importar la interfaz Product

export default function PopularProducts() {
    const { data: productos, error, isLoading } = useGetAllProductosQuery();
    const dispatch = useDispatch(); // Hook para despachar acciones

    if (isLoading) return <div>Cargando...</div>;
    if (error) {
        console.error("Error al cargar los productos:", error);
        return <div>Error al cargar los productos.</div>;
    }

    const handleAddToCart = (producto: Omit<Product, 'quantity'>) => {
        // Crea un nuevo objeto con la cantidad inicial
        const productWithQuantity = { ...producto, quantity: 1 };
        dispatch(addToCart(productWithQuantity)); // Agrega el producto al carrito
    };

    return (
        <>
            <h2 className="my-16 mx-6 text-xl font-semibold">Productos Populares</h2>
            <div className="grid grid-cols-2 gap-4">
                {productos?.map((producto) => (
                    <div key={producto.id} className="flex border p-4 gap-4"> 
                        <img src={producto.image} alt={producto.name} />
                        <div className="space-y-3">
                            <h2 className="text-lg font-semibold">{producto.name}</h2>
                            <p className="text-gray-600">Precio: ${producto.price}</p>
                            <p className="text-gray-600">{producto.description}</p>
                            <button 
                                className="bg-tertiary text-white w-[163px] h-[40px]"
                                onClick={() => handleAddToCart(producto)} // Maneja el clic para agregar al carrito
                            >
                                Agregar
                            </button>
                        </div>
                    </div> 
                ))}
            </div>
        </>
    );
}

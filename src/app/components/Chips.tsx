"use client";
import { useGetAllProductosQuery } from "@/redux/services/papasApi"; 
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice"; // Importa la acción para agregar al carrito
import { Product } from "@/redux/cartSlice"; // Asegúrate de importar la interfaz Product

export default function Chips() {
    const { data: productos, error, isLoading } = useGetAllProductosQuery();
    const dispatch = useDispatch(); // Hook para despachar acciones

    if (isLoading) return <div>Cargando...</div>;
    if (error) {
        console.error("Error al cargar los productos:", error);
        return <div>Error al cargar los productos.</div>;
    }

    const handleAddToCart = (producto: Product) => {
        dispatch(addToCart(producto)); // Agrega la papa al carrito
    };

    return (
        <>
            <h2 className="my-16 mx-6 text-xl font-semibold">Papas</h2>
            <div className="grid grid-cols-1 gap-4">
                {productos?.map((producto) => (
                    <div key={producto.id} className="flex border p-4 gap-4"> 
                        <img src={producto.imagenPapas} alt={producto.nombrePapas} />

                        <div className="space-y-3">
                            <h2 className="text-lg font-semibold">{producto.nombrePapas}</h2>
                            <p className="text-gray-600">Precio: ${producto.precioPapas}</p>
                            <p className="text-gray-600">{producto.descripcion}</p>
                            <button 
                                className="bg-tertiary text-white w-[163px] h-[40px]"
                                onClick={() => handleAddToCart({ 
                                    id: producto.id, 
                                    image: producto.imagenPapas, 
                                    name: producto.nombrePapas, 
                                    price: producto.precioPapas, 
                                    description: producto.descripcion, 
                                    quantity: 1 // Inicializamos la cantidad en 1
                                })} // Maneja el clic para agregar al carrito
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

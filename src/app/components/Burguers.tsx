"use client";
import { useGetAllProductosQuery } from "@/redux/services/hamburguesasApi";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { Product } from "@/redux/cartSlice";

export default function Burguers() {
    // Pasamos el parámetro "HAMBURGUESA" a la consulta
    const { data: productos, error, isLoading } = useGetAllProductosQuery();

    console.log(productos)
    const dispatch = useDispatch();

    if (isLoading) return <div>Cargando...</div>;
    if (error) {
        console.error("Error al cargar los productos:", error);
        return <div>Error al cargar los productos.</div>;
    }

    const handleAddToCart = (producto: Product) => {
        dispatch(addToCart(producto));
    };

    return (
        <>
            <h2 className="my-16 mx-6 text-xl font-semibold">Productos de Hamburguesas</h2>
            <div className="grid grid-cols-2 gap-4">
                {productos?.map((producto) => (
                    <div key={producto.id} className="flex border p-4 gap-4"> 
                        <img src={producto.imagenHamburguesa} alt={producto.nombreHamburguesa} />
    
                        <div className="space-y-3">
                            <h2 className="text-lg font-semibold">{producto.nombreHamburguesa}</h2>
                            <p className="text-gray-600">Precio: ${producto.precioHamburguesa}</p>
                            <p className="text-gray-600">{producto.descripcion}</p>
                            <button 
                                className="bg-tertiary text-white w-[163px] h-[40px]"
                                onClick={() => handleAddToCart({ 
                                    id: producto.id, 
                                    image: producto.imagenHamburguesa, 
                                    name: producto.nombreHamburguesa, 
                                    price: producto.precioHamburguesa, 
                                    description: producto.descripcion, 
                                    quantity: 1 
                                })}
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

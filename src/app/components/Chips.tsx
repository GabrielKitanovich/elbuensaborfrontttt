"use client";
import {useGetAllProductosQuery} from "@/redux/services/papasApi";
import {useDispatch} from "react-redux";
import {addToCart} from "@/redux/cartSlice"; // Importa la acción para agregar al carrito
import {Product} from "@/redux/cartSlice"; // Asegúrate de importar la interfaz Product

export default function Chips() {
    const {data: productos, error, isLoading} = useGetAllProductosQuery();
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
            <div className="flex justify-center flex-wrap w-full max-w-[1000px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productos?.map((producto) => (
                        <div key={producto.id}
                             className="flex flex-col border border-gray-300 rounded-lg overflow-hidden p-4 shadow-md">
                            <img
                                src={producto.image}
                                alt={producto.name}
                                className="w-full h-40 object-cover mb-4"
                            />
                            <div className="space-y-2">
                                <h2 className="text-lg font-semibold">{producto.name}</h2>
                                <p className="text-gray-600">Precio: ${producto.price}</p>
                                <p className="text-gray-600">{producto.description}</p>
                                <button
                                    className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    onClick={() => handleAddToCart({
                                        id: producto.id,
                                        image: producto.image,
                                        name: producto.name,
                                        price: producto.price,
                                        description: producto.description,
                                        quantity: 1
                                    })}
                                >
                                    Agregar al carrito
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </>
    );
}

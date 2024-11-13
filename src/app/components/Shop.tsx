"use client";
import Image from "next/image";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "@/redux/store";
import {addToCart, decreaseQuantity, removeFromCart, clearCart} from "@/redux/cartSlice";
import {Dispatch, SetStateAction, useState} from "react";

// Define the Product type with the image property
type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
    image: string; // Add the image property
};

type CartItem = Product & {
    image: string;
};
import axios from "axios";
import {initMercadoPago, Wallet} from '@mercadopago/sdk-react';
import {usePostProductosMutation} from "@/redux/services/ventasAPI";

type ShopProps = {
    setShowShop: Dispatch<SetStateAction<boolean>>;
};

export default function Shop({setShowShop}: ShopProps) {
    const cartItems = useSelector((state: RootState) => state.cart.items) as CartItem[];
    const [responseMessage, setResponseMessage] = useState('');
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [postProducto, {isLoading, error}] = usePostProductosMutation();

    // Inicialización de MercadoPago
    initMercadoPago("APP_USR-9dda84a6-71dc-4c7f-b0e7-366e6097cbcb", {
        locale: "es-AR"
    });

    // Crear la preferencia de pago para MercadoPago
    const createPreference = async () => {
        const paymentData = {
            title: "El Buen Sabor",
            price: totalAmount,
            quantity: 1
        };

        try {
            const response = await axios.post("http://localhost:8080/api/v1/payments/createmp", null, {
                params: paymentData
            });

            const paymentUrl = response.data;
            console.log("URL de pago recibida:", paymentUrl);
            window.location.href = paymentUrl; // Redirigir al usuario a MercadoPago
        } catch (error) {
            console.error("Error al crear el pago:", error);
            setResponseMessage("Error al crear el pago");
        }
    };

    //TOTALLLLLLL


    const handlePayment = async () => {
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/v1/payments/createbinance', {
                orderAmount: Number(totalAmount) / 1200,
                currency: "USDT"
            });

            // Imprime la respuesta para verificar la estructura
            console.log("Respuesta del servidor:", response.data);

            // Verifica si la respuesta tiene la propiedad 'universalUrl'
            if (response.data && response.data.data && response.data.data.universalUrl) {
                // Redirige al usuario a la URL universal de Binance
                window.location.href = response.data.data.universalUrl;

            } else {
                setResponseMessage('Error al crear el pago: ' + (response.data?.message || "Detalles no disponibles"));
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            setResponseMessage('Error en la conexión: ' + error);
        } finally {
            setLoading(false);
        }
    };
    // Enviar los productos como venta
    const handlePostProductos = async (paymentType: string) => {
        if (cartItems.length === 0) {
            console.error("El carrito está vacío, no se pueden enviar productos.");
            return;
        }
        console.log("Carrito enviado:", cartItems);
        try {
            const ventasToSend = cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                description: item.description,
                quantity: item.quantity
            }));
            console.log("ESTO SON LOS QUE VAN A COMPRARSE", ventasToSend);
            const response = await axios.post(
                'http://localhost:8080/api/v1/sells',  // Cambia la URL al endpoint correcto
                ventasToSend,
                {
                    params: { paymentType }, // Especifica el tipo de pago aquí
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            console.log("Respuesta del servidor:", response.data);
        } catch (error) {
            console.error("Error al enviar las ventas:", error ? error : error);
        }
    };

    // Ejemplo de uso de handlePostProductos con un tipo de pago específico


    //TOTALLLLLLL
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    const handleIncreaseQuantity = (itemId: number) => {
        const item = cartItems.find(item => item.id === itemId);
        if (item) {
            dispatch(addToCart(item)); // Aumenta la cantidad
        }
    };

    const handleDecreaseQuantity = (itemId: number) => {
        dispatch(decreaseQuantity(itemId)); // Disminuye la cantidad
    };

    const handleRemoveItem = (itemId: number) => {
        dispatch(removeFromCart(itemId)); // Elimina el producto
    };

    const handleClearCart = () => {
        dispatch(clearCart()); // Limpiar el carrito
    };

    // Calcular el total

    return (
        <div className="w-[500px] h-screen z-50 bg-white overflow-hidden">
            <div className="flex justify-end mt-4 mr-4">
                <button onClick={() => setShowShop(false)}>
                    <Image src="/cross3.svg" alt="cerrar" width={26} height={26}/>
                </button>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100vh-100px)]">
                <h2 className="text-xl font-bold">Contenido del carrito</h2>
                {cartItems.length === 0 ? (
                    <p>El carrito está vacío.</p>
                ) : (
                    <>
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex justify-between border-b py-2">
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-gray-600">Precio por unidad: ${item.price}</p>
                                        <p className="text-gray-600">Cantidad: {item.quantity}</p>
                                        <p className="text-gray-600">
                                            Precio total: ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleDecreaseQuantity(item.id)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <button
                                            className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                                            onClick={() => handleIncreaseQuantity(item.id)}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                    <Image src={item.image} alt={item.name} width={100} height={100}/>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between items-center">
                            <div className="mt-4">
                                <h3 className="font-bold">Total: ${totalAmount}</h3>
                            </div>
                            <button
                                className="bg-red-600 text-white mt-4 px-4 py-2 rounded"
                                onClick={handleClearCart}
                            >
                                Limpiar carrito
                            </button>
                        </div>

                        <div className="mt-20">
                            <div
                                className="bg-[#14c9e1] text-white w-full mt-4 items-center cursor-pointer px-4 py-2 flex justify-center gap-4 rounded-lg shadow-lg"
                                onClick={() => {
                                    createPreference();
                                    handlePostProductos("mercadoPago");
                                }}>
                                <Image
                                    src={"/mp.svg"}
                                    alt="mercado pago"
                                    width={32}
                                    height={32}
                                />
                                <p className="font-semibold">Mercado Pago</p>
                            </div>
                            <div
                                className="bg-[#ffde25] text-white w-full mt-4 items-center cursor-pointer px-4 py-2 flex justify-center gap-4 rounded-lg shadow-lg"
                                onClick={() => {
                                    handlePayment();
                                    handlePostProductos("Binance");
                                }}>
                                <Image
                                    src={"/bitcoin.svg"}
                                    alt="Bitcoin"
                                    width={32}
                                    height={32}
                                />
                                <p className="font-semibold">Bitcoin</p>
                            </div>
                        </div>

                        {responseMessage && (
                            <div className="mt-4 text-red-500">
                                <p>{responseMessage}</p>
                            </div>
                        )}

                        {preferenceId &&
                            <Wallet initialization={{preferenceId: preferenceId}}
                                    customization={{texts: {valueProp: 'smart_option'}}}/>
                        }

                    </>
                )}
            </div>
        </div>
    );
}

"use client";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store"; // Asegúrate de importar el tipo RootState
import { addToCart, decreaseQuantity, removeFromCart, clearCart } from "@/redux/cartSlice"; // Importa las acciones
import { SetStateAction, use } from "react";
import { Dispatch , useState} from "react";


import axios from "axios";

//mercado pago 
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'



//types props
type ShopProps = {
  setShowShop: Dispatch<SetStateAction<boolean>>;
};

export default function Shop({ setShowShop }: ShopProps) {

  initMercadoPago('YOUR_PUBLIC_KEY' , {
    locale : "es-AR"
  });

  const [preferenceId , setPreferenceId] = useState(null)

  const createPreference = async () => {
    try{
      const response = await axios.post("http://localhost:3000/create_preference")
      const items = cartItems.map(item => ({
        title: item.name,
        quantity: item.quantity,
        currency_id: 'ARS', // Cambia a tu moneda
        unit_price: item.price,
        
      }));


      const {id} = response.data
      return id

    }catch(error){
      console.log(error)
    }
  }


  const handleBuy = async() => {
    const id = await createPreference()
    if(id){
      setPreferenceId(id)
    }
  }





  const dispatch = useDispatch(); // Hook para despachar acciones
  const cartItems = useSelector((state: RootState) => state.cart.items); // Accede a los items del carrito

  const handleIncreaseQuantity = (itemId: number) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      dispatch(addToCart(item)); // Agrega uno al producto 
    }
  };

  const handleDecreaseQuantity = (itemId: number) => {
    dispatch(decreaseQuantity(itemId)); // Disminuye la cantidad del producto
  };

  const handleRemoveItem = (itemId: number) => {
    dispatch(removeFromCart(itemId)); // Elimina el producto completamente del carrito
  };

  const handleClearCart = () => {
    dispatch(clearCart()); // Limpiar el carrito
  };

  // Calcular el total
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  
  return (
    <div className="w-[500px] h-screen z-50 bg-white overflow-hidden">
      <div className="flex justify-end mt-4 mr-4">
        <button onClick={() => setShowShop(false)}>
          <Image src="/cross3.svg" alt="cerrar" width={26} height={26} />
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100vh-100px)]"> {/* Ajustar la altura para permitir el scroll */}
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
                    <p className="text-gray-600">Cantidad: {item.quantity}</p> {/* Muestra la cantidad aquí */}
                    <p className="text-gray-600">
                      Precio total: ${(item.price * item.quantity).toFixed(2)} {/* Muestra el precio total */}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDecreaseQuantity(item.id)}
                      disabled={item.quantity <= 1} // Deshabilitar si la cantidad es 1
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
                      onClick={() => handleRemoveItem(item.id)} // Eliminar producto
                    >
                      Eliminar
                    </button>
                  </div>
                  <Image src={item.image} alt={item.name} width={70} height={70} />
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center">
              <div className="mt-4">
                <h3 className="font-bold">Total: ${totalAmount}</h3> {/* Muestra el total aquí */}
              </div>
              <button
                className="bg-red-600 text-white mt-4 px-4 py-2 rounded"
                onClick={handleClearCart} // Botón para limpiar el carrito
              >
                Limpiar carrito
              </button>
            </div>
            {preferenceId && 
              <Wallet initialization={{ preferenceId: '<PREFERENCE_ID>' }} customization={{ texts:{ valueProp: 'smart_option'}}} />
            }

          </>
        )}
      </div>
    </div>
  );
}

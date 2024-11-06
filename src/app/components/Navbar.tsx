"use client";
import Link from "next/link";
import Image from "next/image";
import Products from "./Products";
import { useState } from "react";
import Shop from "./Shop";
import { useSelector } from "react-redux";
import { selectTotalItems } from "@/redux/cartSlice";
import { RootState } from "@/redux/store";

export default function Navbar() {
  const [showProducts, setShowProducts] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const totalItems = useSelector((state: RootState) => selectTotalItems(state)); // Número total de productos en el carrito

  return (
    <>
      <div className="bg-primary fixed top-0 left-0 w-full z-40">
        <nav className="flex justify-between mx-40 p-8 items-center">
          <div>
            <Link href="/">
              <Image src={"/logo.svg"} alt="logo" width={56} height={56} />
            </Link>
          </div>
          <div>
            <ul className="flex space-x-6">
              <li>
                <Link href="/">Inicio</Link>
              </li>
              <li onMouseEnter={() => setShowProducts(true)}>
                <Link href="#">Productos</Link>
              </li>
              <li>
                <Link href="#">Sucursales</Link>
              </li>
            </ul>
          </div>
          <div className="flex space-x-6 items-center">
            <ul className="flex space-x-6">
              <li>
                <Link href="/">Login</Link>
              </li>
              <li>
                <Link href="/about">Registrarse</Link>
              </li>
            </ul>
            <div
              onMouseEnter={() => setShowShop(true)}
              onMouseLeave={() => setShowShop(false)}
              className="relative"
            >
              <Image src={"/shop.svg"} alt="carrito" width={26} height={26} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
              {showShop && (
                <div className="absolute -top-12 -right-48 h-screen bg-white z-50">
                  <Shop setShowShop={setShowShop} />
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      <div className="pt-24">
        {showProducts && (
          <div
            onMouseEnter={() => setShowProducts(true)}
            onMouseLeave={() => setShowProducts(false)}
          >
            <Products />
          </div>
        )}
      </div>
    </>
  );
}

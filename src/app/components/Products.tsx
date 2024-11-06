"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Products() {
  const products = [
    {
      img: "/product1.svg",
      name: "Hamburguesas",
      link:"/productos/hamburguesas",
    },
    {
      img: "/product2.svg",
      name: "Bebidas",
      link:"/productos/bebidas",
    },
    {
      img: "/product3.svg",
      name: "Papas",
      link:"/productos/papas",
    },
  ];

  return (
    <div className='bg-white h-[129px] fixed z-40 w-full shadow-xl'>
      <div className='flex justify-center items-center mt-5 gap-20'>
        {products.map((product, index) => (
          <div 
            key={index}
            className='transition-transform duration-300 hover:scale-105 '
          >
            <Link href={product.link} className='flex flex-col items-center'>
              <Image
                src={product.img}
                alt={product.name}
                width={70}
                height={70}
              />
              <p>{product.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

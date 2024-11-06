import Link from 'next/link'
import React from 'react'

export default function NavbarLogin() {
  return (
    <>
    <div className='bg-blue-500 h-24'>
        

        <div className='flex justify-between mx-20 pt-9 gap-40'>
            <h1 className='text-white text-xl font-extrabold uppercase'>Administrar tus Productos</h1>
            <Link href={"/"}>
                <h2 className='text-white font-extrabold underline hover:text-blue-300'>Volver</h2>
            </Link>

        </div>
        
       
        
    </div>
    </>
  )
}

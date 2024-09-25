
import Link from "next/link"
import Image from "next/image"
export default function Navbar() {
  return (
    <>
        <div className="bg-primary">
            <nav className="flex justify-between mx-40 p-8 items-center">
                <div>
                    <Link href="/">
                        <Image
                            src={"/logo.svg"}
                            alt="logo"
                            width={56}
                            height={56}
                        />
                    </Link>
                   
                </div>
                <div>
                    <ul className="flex space-x-6">
                        <li>
                        <Link href="/">Inicio</Link>
                        </li>
                        <li>
                        <Link href="/about">Productos</Link>
                        </li>
                        <li>
                        <Link href="/contact">Sucursales</Link>
                        </li>
                        <li>
                        <Link href="/contact">Contacto</Link>
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
                    <Image
                    src={"/shop.svg"}
                    alt="carrito"
                    width={26}
                    height={26}
                    />
                </div> 
            </nav>
        </div>
    </>
  )
}

"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const navFooter = ["Home","Productos","Sucursales","Cotacto","Nosotros"]
    const redes = ["/whathsap.svg","/facebook.svg", "instagram.svg" , "twitter.svg"]
    const avisos = ["Politica de Privacidad","Condiciones de Uso","Ventas y Rembolsos"]
  return (
    <> 
    <div className="w-full">
        <Image
            src="/footer.svg"
            alt="footer"
            width={100}      
            height={100}  
            className="w-full"
        />
      <div className="h-[459px] bg-[#64240F]">
        <div className="flex justify-between pt-8 mx-40">
            <div className="flex flex-col items-center space-y-3">
                <Link href={"/"}>
                    <Image
                    src={"/logo.svg"}
                    alt="logo"
                    width={84}
                    height={84}
                    />
                </Link>
               
                <button className="bg-white w-[274px] h-[66px]">
                    Productos
                </button>

            </div>
            <div>
                <ul className="space-y-3">
                    {navFooter.map((item , index) => (
                        <li className="text-white" key={index}>{item}</li>
                    ))}
                </ul>
               
            </div>
           
            <div className="space-y-5">
                {redes.map((redes , index) =>(
                    <Image
                    key={index}
                    src={redes}
                    alt={redes}
                    width={24}
                    height={24}
                    />
                ))}
            </div>
           
        </div>
            <div className="flex justify-between px-40 items-center mt-20">
                <p className="text-white ">© 2024 El Buen Sabor Todos Los Derechos Reservados  </p>
                <ul className="space-x-3 flex">
                        {avisos.map((item , index) => (
                        <li className="text-white" key={index}>{item}</li>
                    ))}
                </ul>
                <p className="text-white">+54 567 56789</p>

            </div>
      </div>
    </div>
     
    </>
  );
}

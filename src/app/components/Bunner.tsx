"use client";
import Image from "next/image";
import Link from "next/link";
export default function Bunner() {
  return (
    <div className="relative bg-primary">
      <Image
        src={"/bunner2.svg"}
        alt="bunner"
        width={1440}
        height={488}
        className="w-full h-auto"
      />
      <Link href={"./productos/hamburguesas"}>
        <button className="absolute bottom-12 left-48 bg-tertiary text-white py-4 px-24">
          Ver Más
        </button>
      </Link>
      
    </div>
  );
}

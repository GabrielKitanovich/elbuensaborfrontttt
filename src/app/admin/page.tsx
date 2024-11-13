"use client";
import React, { useState } from "react";
import axios from "axios";

// Define el tipo para los datos del producto
interface ProductData {
    name: string;
    price: string;
    description: string;
    category: string;
    image: File | null;
    stock: string;
    max_stock: string;
}

export default function CreateProduct() {
    const [productData, setProductData] = useState<ProductData>({
        name: '',
        price: '',
        description: '',
        image: null,
        category: '',
        stock: '',
        max_stock: '',
    });
    const [message, setMessage] = useState<string>("");

    // Función para redimensionar la imagen a 70x70
    const resizeImage = (file: File) => {
        return new Promise<File>((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = 185;
                canvas.height = 164;

                if (ctx) {
                    ctx.drawImage(img, 0, 0, 185, 164);
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const resizedImage = new File([blob], file.name, {
                                type: file.type,
                            });
                            resolve(resizedImage);
                        }
                    }, file.type);
                }
            };
        });
    };

    // Maneja los cambios en el formulario
    const handleChange = async (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, files } = e.target as HTMLInputElement;

        if (name === "image" && files && files[0]) {
            const resizedImage = await resizeImage(files[0]);
            setProductData((prevData) => ({
                ...prevData,
                [name]: resizedImage,
            }));
        } else {
            setProductData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };


    // Envía los datos al backend
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", productData.name);
            formData.append("price", productData.price);
            formData.append("description", productData.description);
            formData.append("category", productData.category);
            formData.append("stock", productData.stock);
            formData.append("max_stock", productData.max_stock);
            if (productData.image) {
                formData.append("image", productData.image);
            }

            const response = await axios.post("http://localhost:8080/api/v1/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setMessage("Producto creado exitosamente");
            setProductData({
                name: '',
                price: '',
                description: '',
                image: null,
                category: '',
                stock: '',
                max_stock: '',
            });
        } catch (error) {
            setMessage("Error al crear el producto");
            console.error(error);
        }
    };

    return (
        <div className="bg-gray-100 py-10 min-h-screen flex items-center justify-center">
            <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Crear Producto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Nombre del Producto</label>
                        <input
                            type="text"
                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                            id="name"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-600">Precio</label>
                        <input
                            type="number"
                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                            id="price"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600">Descripción</label>
                        <textarea
                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                            id="description"
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                            rows={4}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-600">Categoría</label>
                        <select
                            id="category"
                            name="category"
                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                            value={productData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            <option value="Hamburguesas">Hamburguesas</option>
                            <option value="Papas">Papas</option>
                            <option value="Bebidas">Bebidas</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-600">Stock</label>
                        <input
                            type="number"
                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                            id="stock"
                            name="stock"
                            value={productData.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="max_stock" className="block text-sm font-medium text-gray-600">Stock Máximo</label>
                        <input
                            type="number"
                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                            id="max_stock"
                            name="max_stock"
                            value={productData.max_stock}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-600">Subir imagen</label>
                        <input
                            type="file"
                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                            id="image"
                            name="image"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Crear Producto
                    </button>
                </form>
                {message && (
                    <p className={`mt-4 text-center ${message.includes("exitosamente") ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

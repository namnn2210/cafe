'use client';

import { useEffect, useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { Pagination, Spinner } from '@nextui-org/react';
import Image from 'next/image';
import BASE_API_URL from '@/config/config';
import {fetchFromAPI} from "@/utils/api";

export default function FoodsPage() {
    const { addToOrder } = useOrder();
    const [foods, setFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); // State for loading
    const itemsPerPage = 4;

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const data = await fetchFromAPI(`/products/category/2`);
                setFoods(data);
            } catch (error) {
                console.error('Error fetching foods:', error);
            } finally {
                setLoading(false); // Stop loading spinner after data is fetched
            }
        };

        fetchFoods();
    }, []);

    const handleAddToOrder = (food: { id: number; name: string; price: number }) => {
        addToOrder(food);
    };

    const filteredFoods = foods.filter((food: any) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
    const paginatedFoods = filteredFoods.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) {
        return (
            <main className="p-4 flex items-center justify-center h-screen bg-[var(--background)]">
                <Spinner size="lg" color="primary" /> {/* Spinner while loading */}
            </main>
        );
    }

    return (
        <main className="p-4 pb-20 bg-[var(--background)]">
            <h1 className="text-2xl font-bold mb-4 text-center">Đồ ăn</h1>

            {/* Search Bar */}
            <div className="relative mb-6">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.621 3.863l4.528 4.529a1 1 0 01-1.414 1.414l-4.529-4.528A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
                <input
                    type="text"
                    placeholder="Tìm kiếm đồ ăn..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition"
                />
            </div>

            {/* Food Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paginatedFoods.map((food: any) => (
                    <div
                        key={food.id}
                        className="p-4 transition text-center cursor-pointer"
                        onClick={() => handleAddToOrder(food)}
                    >
                        <Image
                            src={`${BASE_API_URL}${food.image}`}
                            alt={food.name}
                            width={300}
                            height={300}
                            style={{ objectFit: 'cover' }}
                            className="w-72 h-72 object-cover mx-auto"
                        />
                        <h2 className="text-lg font-bold mt-4">{food.name}</h2>
                        <p className="mt-2">
                            {food.price.toLocaleString('vi-VN')} VND
                        </p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <Pagination
                    total={totalPages}
                    page={currentPage}
                    onChange={(page) => setCurrentPage(page)}
                    size="lg"
                />
            </div>
        </main>
    );
}

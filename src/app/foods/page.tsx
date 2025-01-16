'use client';

import { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { Pagination } from '@nextui-org/react';

const foods = [
    { id: 1, name: 'Khoai tây chiên', price: 30000, image: 'https://placehold.co/300x300?text=Khoai+t%C3%A2y+chi%C3%AAn' },
    { id: 2, name: 'Nem chua rán (5 cái)', price: 50000, image: 'https://placehold.co/300x300?text=Nem+chua+r%C3%A1n' },
    { id: 3, name: 'Bánh tráng nướng', price: 20000, image: 'https://placehold.co/300x300?text=B%C3%A1nh+tr%C3%A1ng+n%C6%B0%E1%BB%9Bng' },
    { id: 4, name: 'Gỏi cuốn', price: 25000, image: 'https://placehold.co/300x300?text=G%E1%BB%8Fi+cu%E1%BB%91n' },
    { id: 5, name: 'Chả giò', price: 35000, image: 'https://placehold.co/300x300?text=Ch%E1%BA%A3+gi%C3%B2' },
    { id: 6, name: 'Bánh mì pate', price: 30000, image: 'https://placehold.co/300x300?text=B%C3%A1nh+m%C3%AC+pate' },
    { id: 7, name: 'Phở bò', price: 60000, image: 'https://placehold.co/300x300?text=Ph%E1%BB%9F+b%C3%B2' },
    { id: 8, name: 'Hủ tiếu', price: 55000, image: 'https://placehold.co/300x300?text=H%E1%BB%A7+ti%E1%BA%BFu' },
    { id: 9, name: 'Bún thịt nướng', price: 50000, image: 'https://placehold.co/300x300?text=B%C3%BAn+th%E1%BB%8Bt+n%C6%B0%E1%BB%9Bng' },
    { id: 10, name: 'Mì xào hải sản', price: 70000, image: 'https://placehold.co/300x300?text=M%C3%AC+x%C3%A0o+h%E1%BA%A3i+s%E1%BA%A3n' },
];

export default function FoodsPage() {
    const { addToOrder } = useOrder();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const handleAddToOrder = (food: { id: number; name: string; price: number }) => {
        addToOrder(food);
    };

    // Filter foods based on search input
    const filteredFoods = foods.filter((food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination calculations
    const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
    const paginatedFoods = filteredFoods.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
                        setCurrentPage(1); // Reset to the first page when search term changes
                    }}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition"
                />
            </div>

            {/* Food Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paginatedFoods.map((food) => (
                    <div
                        key={food.id}
                        className="p-4 transition text-center cursor-pointer"
                        onClick={() => handleAddToOrder(food)}
                    >
                        <img
                            src={food.image}
                            alt={food.name}
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

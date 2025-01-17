'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Spinner } from '@nextui-org/react';
import BASE_API_URL from '@/config/config';
import {fetchFromAPI} from "@/utils/api";
import Drink from "@/output/drink";
import Food from "@/output/food"

export default function HomePage() {
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const [foods, setFoods] = useState<Food[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const drinksData = await fetchFromAPI(`/products/category/1`);
                const foodsData = await fetchFromAPI(`/products/category/2`);

                setDrinks(drinksData);
                setFoods(foodsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <main className="p-4 flex items-center justify-center h-screen bg-[var(--background)]">
                <Spinner size="lg" color="primary" />
            </main>
        );
    }

    return (
        <main className="p-4">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r bg-[var(--foreground)] rounded-lg shadow-lg overflow-hidden mb-8">
                <Image
                    src="https://placehold.co/600x300"
                    alt="226 Coffee Hero"
                    priority
                    width={600}
                    height={300}
                    className="opacity-50"
                />
                <div className="relative z-10 text-center text-white p-8">
                    <h1 className="text-4xl font-bold mb-2">Chào mừng đến với 226&apos;s Cafe</h1>
                    <p className="text-lg mb-4">
                        Khám phá các thức uống thủ công và món ăn ngon của chúng tôi. Sự hài lòng của bạn là niềm đam mê của chúng tôi.
                    </p>
                    <Link href="/drinks">
                        <button className="px-6 py-3 bg-white text-green-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition">
                            Khám phá thực đơn
                        </button>
                    </Link>
                </div>
            </div>

            {/* Drinks Section */}
            <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Thức uống</h2>
                    <Link href="/drinks" className="hover:underline">
                        Xem thêm
                    </Link>
                </div>
                <div className="flex overflow-x-scroll space-x-4 scrollbar-hide">
                    {drinks.map((drink: Drink) => (
                        <div key={drink.id} className="min-w-[150px] p-4 transition text-center">
                            <Image
                                src={`${BASE_API_URL}${drink.image}`}
                                alt={drink.name}
                                width={150}
                                height={150}
                                className="mb-2"
                            />
                            <h3 className="font-bold">{drink.name}</h3>
                            <p>{drink.price.toLocaleString('vi-VN')} VND</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Foods Section */}
            <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Đồ ăn</h2>
                    <Link href="/foods" className="hover:underline">
                        Xem thêm
                    </Link>
                </div>
                <div className="flex overflow-x-scroll space-x-4 scrollbar-hide">
                    {foods.map((food: Food) => (
                        <div key={food.id} className="min-w-[150px] p-4 transition text-center">
                            <Image
                                src={`${BASE_API_URL}${food.image}`}
                                alt={food.name}
                                width={150}
                                height={150}
                                className="mb-2"
                            />
                            <h3 className="font-bold">{food.name}</h3>
                            <p>{food.price.toLocaleString('vi-VN')} VND</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

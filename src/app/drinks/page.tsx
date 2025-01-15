'use client';

import { useOrder } from '../context/OrderContext';
import { useState } from 'react';

const drinks = [
    {
        id: 1,
        name: 'Cappuccino',
        description: 'A warm and creamy coffee drink topped with milk foam.',
        price: 45000,
        image: 'https://placehold.co/300x200?text=Cappuccino',
    },
    {
        id: 2,
        name: 'Latte',
        description: 'Smooth espresso mixed with steamed milk.',
        price: 50000,
        image: 'https://placehold.co/300x200?text=Latte',
    },
    {
        id: 3,
        name: 'Iced Coffee',
        description: 'Cold brewed coffee served over ice.',
        price: 38000,
        image: 'https://placehold.co/300x200?text=Iced+Coffee',
    },
];

export default function DrinksPage() {
    const { addToOrder } = useOrder();
    const [clickedItemId, setClickedItemId] = useState<number | null>(null);

    const handleAddToOrder = (drink: { id: number; name: string; price: number }) => {
        setClickedItemId(drink.id);
        addToOrder(drink);

        // Remove animation state after animation duration (e.g., 500ms)
        setTimeout(() => setClickedItemId(null), 500);
    };
    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Drinks Menu</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {drinks.map((drink) => (
                    <div key={drink.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                        <img
                            src={drink.image}
                            alt={drink.name}
                            className="w-full h-40 object-cover rounded"
                        />
                        <h2 className="text-lg font-bold mt-2">{drink.name}</h2>
                        <p className="text-gray-600">{drink.description}</p>
                        <p className="text-green-500 font-semibold mt-1">
                            {drink.price.toLocaleString('vi-VN')} VND
                        </p>
                        <button className={`bg-green-500 text-white px-4 py-2 mt-2 rounded-full hover:bg-green-600 transition transform ${
                            clickedItemId === drink.id ? 'scale-110' : 'scale-100'
                        }`}
                                onClick={() => handleAddToOrder(drink)}>
                            Add
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}

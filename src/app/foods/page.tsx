'use client';

import { useOrder } from '../context/OrderContext';
import { useState } from 'react';

const foods = [
    {
        id: 1,
        name: 'Cheeseburger',
        description: 'Juicy beef patty with melted cheese, lettuce, and tomato.',
        price: 85000,
        image: 'https://placehold.co/300x200?text=Cheeseburger',
    },
    {
        id: 2,
        name: 'Margherita Pizza',
        description: 'Classic pizza topped with fresh tomatoes, mozzarella, and basil.',
        price: 120000,
        image: 'https://placehold.co/300x200?text=Pizza',
    },
    {
        id: 3,
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce with Caesar dressing and croutons.',
        price: 75000,
        image: 'https://placehold.co/300x200?text=Caesar+Salad',
    },
];

export default function FoodsPage() {
    const { addToOrder } = useOrder();
    const [clickedItemId, setClickedItemId] = useState<number | null>(null);

    const handleAddToOrder = (food: { id: number; name: string; price: number }) => {
        setClickedItemId(food.id);
        addToOrder(food);

        // Reset animation after 500ms
        setTimeout(() => setClickedItemId(null), 500);
    };

    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Foods Menu</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {foods.map((food) => (
                    <div key={food.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                        <img
                            src={food.image}
                            alt={food.name}
                            className="w-full h-40 object-cover rounded"
                        />
                        <h2 className="text-lg font-bold mt-2">{food.name}</h2>
                        <p className="text-gray-600">{food.description}</p>
                        <p className="text-green-500 font-semibold mt-1">
                            {food.price.toLocaleString('vi-VN')} VND
                        </p>
                        <button className={`bg-green-500 text-white px-4 py-2 mt-2 rounded-full hover:bg-green-600 transition transform ${
                            clickedItemId === food.id ? 'scale-110' : 'scale-100'
                        }`}
                                onClick={() => handleAddToOrder(food)}
                        >
                            Add
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}

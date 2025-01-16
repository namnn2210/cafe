'use client';

import Link from 'next/link';
import Image from 'next/image';

const drinks = [
    { id: 1, name: "Bạc sỉu", price: 30000, image: "https://placehold.co/150x150?text=Bạc+sỉu" },
    { id: 2, name: "Đen đá", price: 30000, image: "https://placehold.co/150x150?text=Đen+đá" },
    { id: 3, name: "Nâu đá", price: 35000, image: "https://placehold.co/150x150?text=Nâu+đá" },
    { id: 4, name: "Trà đào cam sả", price: 40000, image: "https://placehold.co/150x150?text=Trà+đào" },
    { id: 5, name: "Trà sữa truyền thống", price: 45000, image: "https://placehold.co/150x150?text=Trà+sữa" },
];

const foods = [
    { id: 1, name: 'Khoai tây chiên', price: 30000, image: 'https://placehold.co/150x150?text=Khoai+t%C3%A2y+chi%C3%AAn' },
    { id: 2, name: 'Nem chua rán (5 cái)', price: 50000, image: 'https://placehold.co/150x150?text=Nem+chua+r%C3%A1n' },
    { id: 3, name: 'Bánh tráng nướng', price: 20000, image: 'https://placehold.co/150x150?text=B%C3%A1nh+tr%C3%A1ng+n%C6%B0%E1%BB%9Bng' },
    { id: 4, name: 'Gỏi cuốn', price: 25000, image: 'https://placehold.co/150x150?text=G%E1%BB%8Fi+cu%E1%BB%91n' },
    { id: 5, name: 'Chả giò', price: 35000, image: 'https://placehold.co/150x150?text=Ch%E1%BA%A3+gi%C3%B2' },
];

export default function HomePage() {
    return (
        <main className="p-4">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r bg-[var(--foreground)] rounded-lg shadow-lg overflow-hidden mb-8">
                <Image
                    src="https://placehold.co/600x300"
                    alt="226 Coffee Hero"
                    layout="fill"
                    objectFit="cover"
                    quality={80}
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
                    {drinks.map((drink) => (
                        <div key={drink.id} className="min-w-[150px] p-4 transition text-center">
                            <Image
                                src={drink.image}
                                alt={drink.name}
                                style={{ objectFit: 'cover' }}
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
                    {foods.map((food) => (
                        <div key={food.id} className="min-w-[150px] p-4 transition text-center">
                            <Image
                                src={food.image}
                                alt={food.name}
                                style={{ objectFit: 'cover' }}
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

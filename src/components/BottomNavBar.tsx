"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useOrder } from '@/app/context/OrderContext';

interface NavItem {
    name: string;
    href: string;
    icon: string;
}

const navItems: NavItem[] = [
    { name: 'Trang chủ', href: '/', icon: '🏠' },
    { name: 'Đồ uống', href: '/drinks', icon: '🍹' },
    { name: 'Đồ ăn', href: '/foods', icon: '🍔' },
    { name: 'Đơn hàng', href: '/order', icon: '🛒' },
];

export default function BottomNavBar() {
    const pathname = usePathname();
    const { totalItems } = useOrder();

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-blue-900 border-t border-gray-700 z-50">
            <div className="max-w-screen-sm mx-auto flex justify-around p-2 text-white">
                {navItems.map((item) => (
                    <Link key={item.name} href={item.href}>
                        <div
                            className={`relative flex flex-col items-center ${
                                pathname === item.href ? 'text-yellow-300' : 'text-gray-300'
                            } hover:text-yellow-300`}
                        >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-sm font-medium">{item.name}</span>
                            {item.name === 'Đơn hàng' && totalItems > 0 && (
                                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </nav>
    );
}


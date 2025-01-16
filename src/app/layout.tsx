import './globals.css';
import BottomNavBar from '@/components/BottomNavBar';
import Header from '@/components/Header';
import { ReactNode } from 'react';
import { OrderProvider } from './context/OrderContext';
import { NextUIProvider } from '@nextui-org/react';

export const metadata = {
    title: "226's Cafe Menu",
    description: 'Order food and drinks with ease.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className="bg-[var(--background)]">
        <NextUIProvider>
            <OrderProvider>
                <div className="max-w-screen-sm mx-auto min-h-screen pb-16 bg-[var(--background)]">
                    <Header />
                    {children}
                    <BottomNavBar />
                </div>
            </OrderProvider>
        </NextUIProvider>
        </body>
        </html>
    );
}

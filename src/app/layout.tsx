import './globals.css';
import BottomNavBar from '@/components/BottomNavBar';
import Header from '@/components/Header';
import { ReactNode } from 'react';
import { OrderProvider } from './context/OrderContext';

export const metadata = {
    title: 'Cafe Ordering System',
    description: 'Order food and drinks with ease.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className="bg-gray-100">
        <OrderProvider>
            <div className="max-w-screen-sm mx-auto min-h-screen pb-16 bg-white">
                <Header />
                {children}
                <BottomNavBar />
            </div>
        </OrderProvider>
        </body>
        </html>
    );
}
'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface OrderContextType {
    order: OrderItem[];
    totalItems: number;
    addToOrder: (item: Omit<OrderItem, 'quantity'>) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [order, setOrder] = useState<OrderItem[]>([]);

    const addToOrder = (item: Omit<OrderItem, 'quantity'>) => {
        setOrder((prevOrder) => {
            const existingItem = prevOrder.find((o) => o.id === item.id);
            if (existingItem) {
                return prevOrder.map((o) =>
                    o.id === item.id ? { ...o, quantity: o.quantity + 1 } : o
                );
            }
            return [...prevOrder, { ...item, quantity: 1 }];
        });
    };

    const totalItems = useMemo(
        () => order.reduce((total, item) => total + item.quantity, 0),
        [order]
    );

    return (
        <OrderContext.Provider value={{ order, totalItems, addToOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};

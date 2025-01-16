'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the structure of an order item
interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    options?: {
        sugarLevels?: string[];
        iceLevels?: string[];
        toppings?: string[];
    };
}

// Define the context type
interface OrderContextType {
    order: OrderItem[];
    totalItems: number;
    addToOrder: (item: Omit<OrderItem, 'quantity'>) => void;
    updateOrderItem: (index: number, quantity: number, options?: OrderItem['options']) => void;
    removeOrderItem: (index: number) => void;
}

// Create the context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Context Provider Component
export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [order, setOrder] = useState<OrderItem[]>([]);

    // Add an item to the order
    const addToOrder = (item: Omit<OrderItem, 'quantity'>) => {
        setOrder((prevOrder) => {
            const existingItemIndex = prevOrder.findIndex(
                (o) => o.id === item.id && JSON.stringify(o.options) === JSON.stringify(item.options)
            );

            if (existingItemIndex !== -1) {
                // Update the quantity of the existing item
                return prevOrder.map((o, idx) =>
                    idx === existingItemIndex
                        ? { ...o, quantity: o.quantity + 1 }
                        : o
                );
            }
            // Add a new item
            return [...prevOrder, { ...item, quantity: 1 }];
        });
    };

    // Update the quantity and options of an item in the order
    const updateOrderItem = (index: number, quantity: number, options?: OrderItem['options']) => {
        setOrder((prevOrder) =>
            prevOrder.map((item, idx) =>
                idx === index ? { ...item, quantity, options } : item
            )
        );
    };

    // Remove an item from the order
    const removeOrderItem = (index: number) => {
        setOrder((prevOrder) => prevOrder.filter((_, idx) => idx !== index));
    };

    // Calculate the total number of items in the order
    const totalItems = order.reduce((total, item) => total + item.quantity, 0);

    return (
        <OrderContext.Provider value={{ order, totalItems, addToOrder, updateOrderItem, removeOrderItem }}>
            {children}
        </OrderContext.Provider>
    );
};

// Hook to use the OrderContext
export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};

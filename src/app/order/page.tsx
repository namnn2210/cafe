'use client';

import { useOrder } from '../context/OrderContext';
import { useState } from 'react';

export default function OrderPage() {
    const { order, updateOrderItem, removeOrderItem } = useOrder();
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'qr'>('cash');
    const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
    const [editedQuantity, setEditedQuantity] = useState<number>(1);
    const [editedOptions, setEditedOptions] = useState<any>({
        sugarLevel: '',
        iceLevel: '',
        toppings: [],
    });

    const totalPrice = order.reduce((total, item) => total + item.price * item.quantity, 0);

    // Replace with your actual account details
    const accountNumber = '0021000463899';
    const bankCode = 'VCB'; // Replace with the bank code
    const accountName = 'NGO NGOC NAM';
    const memo = 'Thanh toan Cafe';

    const qrCodeUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact.jpg?amount=${totalPrice}&addInfo=${encodeURIComponent(
        memo
    )}&accountName=${encodeURIComponent(accountName)}`;

    const handleCashSubmit = () => {
        alert('Order submitted. Please pay at the counter.');
    };

    const handleQrPaid = () => {
        alert('Payment confirmed. Thank you!');
    };

    const startEditingItem = (index: number, item: any) => {
        setEditingItemIndex(index);
        setEditedQuantity(item.quantity);
        setEditedOptions({ ...item.options });
    };

    const saveEditedItem = (index: number) => {
        updateOrderItem(index, editedQuantity, editedOptions);
        setEditingItemIndex(null);
    };

    const cancelEditing = () => {
        setEditingItemIndex(null);
    };

    const handleRemoveItem = (index: number) => {
        removeOrderItem(index);
    };

    return (
        <main className="p-4">
            <div className="max-w-screen-sm mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                {/* Header */}
                <h1 className="text-center text-xl font-bold mb-4">Cafe Delight</h1>
                <p className="text-center text-sm text-gray-500">Your Order Receipt</p>
                <hr className="my-4 border-gray-300" />

                {/* Itemized List */}
                <div className="mb-4">
                    {order.length === 0 ? (
                        <p className="text-center text-gray-500">Your order is empty.</p>
                    ) : (
                        <ul>
                            {order.map((item, index) => (
                                <li key={`${item.id}-${index}`} className="py-2 border-b last:border-none text-gray-700">
                                    {editingItemIndex === index ? (
                                        <div>
                                            {/* Edit Quantity */}
                                            <div className="flex items-center justify-between mb-2">
                                                <input
                                                    type="number"
                                                    value={editedQuantity}
                                                    onChange={(e) => setEditedQuantity(Number(e.target.value))}
                                                    min="1"
                                                    className="w-16 border rounded px-2 py-1"
                                                />
                                                <button
                                                    className="text-green-500 font-medium hover:underline"
                                                    onClick={() => saveEditedItem(index)}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="text-red-500 font-medium hover:underline"
                                                    onClick={cancelEditing}
                                                >
                                                    Cancel
                                                </button>
                                            </div>

                                            {/* Edit Options */}
                                            <div>
                                                <h4 className="font-medium">Options</h4>

                                                {/* Sugar Level */}
                                                <div className="flex items-center mb-2">
                                                    <label className="mr-2">Sugar:</label>
                                                    <select
                                                        value={editedOptions.sugarLevel}
                                                        onChange={(e) =>
                                                            setEditedOptions((prev: any) => ({
                                                                ...prev,
                                                                sugarLevel: e.target.value,
                                                            }))
                                                        }
                                                        className="border rounded px-2 py-1"
                                                    >
                                                        {item.options?.sugarLevels?.map((level: string) => (
                                                            <option key={level} value={level}>
                                                                {level}%
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Ice Level */}
                                                <div className="flex items-center mb-2">
                                                    <label className="mr-2">Ice:</label>
                                                    <select
                                                        value={editedOptions.iceLevel}
                                                        onChange={(e) =>
                                                            setEditedOptions((prev: any) => ({
                                                                ...prev,
                                                                iceLevel: e.target.value,
                                                            }))
                                                        }
                                                        className="border rounded px-2 py-1"
                                                    >
                                                        {item.options?.iceLevels?.map((level: string) => (
                                                            <option key={level} value={level}>
                                                                {level}%
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Toppings */}
                                                <div>
                                                    <label className="mr-2">Toppings:</label>
                                                    <select
                                                        multiple
                                                        value={editedOptions.toppings}
                                                        onChange={(e) =>
                                                            setEditedOptions((prev: any) => ({
                                                                ...prev,
                                                                toppings: Array.from(e.target.selectedOptions, (option) =>
                                                                    option.value
                                                                ),
                                                            }))
                                                        }
                                                        className="border rounded px-2 py-1"
                                                    >
                                                        {item.options?.toppings?.map((topping: string) => (
                                                            <option key={topping} value={topping}>
                                                                {topping}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between">
                                            <span>
                                                {item.name}{' '}
                                                <span className="text-sm text-gray-500">x{item.quantity}</span>
                                            </span>
                                            <span>
                                                {(item.price * item.quantity).toLocaleString('vi-VN')} VND
                                            </span>
                                        </div>
                                    )}
                                    {item.options && (
                                        <ul className="text-sm text-gray-500 mt-1 pl-4 list-disc">
                                            {item.options.sugarLevels && <li>Sugar: {item.options.sugarLevels}%</li>}
                                            {item.options.iceLevels && <li>Ice: {item.options.iceLevels}%</li>}
                                            {item.options.toppings && item.options.toppings.length > 0 && (
                                                <li>Toppings: {item.options.toppings.join(', ')}</li>
                                            )}
                                        </ul>
                                    )}
                                    <div className="flex justify-between mt-2">
                                        <button
                                            className="text-blue-500 font-medium hover:underline"
                                            onClick={() => startEditingItem(index, item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-500 font-medium hover:underline"
                                            onClick={() => handleRemoveItem(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Total */}
                <div className="flex justify-between font-bold text-gray-800 border-t pt-4">
                    <span>Total</span>
                    <span>{totalPrice.toLocaleString('vi-VN')} VND</span>
                </div>

                {/* Payment Options */}
                {order.length > 0 && totalPrice > 0 && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
                        <div className="flex justify-around mb-4">
                            <button
                                className={`px-4 py-2 rounded ${
                                    paymentMethod === 'cash'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                }`}
                                onClick={() => setPaymentMethod('cash')}
                            >
                                Cash
                            </button>
                            <button
                                className={`px-4 py-2 rounded ${
                                    paymentMethod === 'qr'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                }`}
                                onClick={() => setPaymentMethod('qr')}
                            >
                                QR Code
                            </button>
                        </div>

                        {/* Conditional Rendering for Payment Method */}
                        {paymentMethod === 'cash' && (
                            <div className="text-center">
                                <p className="text-gray-700 mb-4">
                                    Please pay <strong>{totalPrice.toLocaleString('vi-VN')} VND</strong> in cash at the
                                    counter.
                                </p>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
                                    onClick={handleCashSubmit}
                                >
                                    Submit Order
                                </button>
                            </div>
                        )}
                        {paymentMethod === 'qr' && (
                            <div className="text-center">
                                <h3 className="text-sm font-medium mb-2">Scan this QR Code to Pay</h3>
                                <img
                                    src={qrCodeUrl}
                                    alt="QR Code for Payment"
                                    className="mx-auto w-40 h-40 border border-gray-300 rounded"
                                />
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-blue-600 transition"
                                    onClick={handleQrPaid}
                                >
                                    Confirm Paid
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer */}
                <p className="text-center text-xs text-gray-500 mt-6">Thank you for dining with us!</p>
            </div>
        </main>
    );
}

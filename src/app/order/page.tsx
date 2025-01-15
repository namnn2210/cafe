'use client';

import { useOrder } from '../context/OrderContext';
import { useState } from 'react';

export default function OrderPage() {
    const { order } = useOrder();
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'qr'>('cash');

    const totalPrice = order.reduce((total, item) => total + item.price * item.quantity, 0);

    // Replace with your actual account details
    const accountNumber = '0021000463899';
    const bankCode = 'VCB'; // Replace with the bank code
    const description = 'Cafe Delight Payment';
    const accountName = 'NGO NGOC NAM';
    const memo = 'Thanh toan Cafe';

    const qrCodeUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact.jpg?amount=${totalPrice}&addInfo=${encodeURIComponent(
        memo
    )}&accountName=${encodeURIComponent(accountName)}`;

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
                            {order.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex justify-between py-2 border-b last:border-none text-gray-700"
                                >
                  <span>
                    {item.name} <span className="text-sm text-gray-500">x{item.quantity}</span>
                  </span>
                                    <span>{(item.price * item.quantity).toLocaleString('vi-VN')} VND</span>
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
                            <p className="text-center text-gray-700">
                                Please pay <strong>{totalPrice.toLocaleString('vi-VN')} VND</strong> in cash at the
                                counter.
                            </p>
                        )}
                        {paymentMethod === 'qr' && (
                            <div className="text-center">
                                <h3 className="text-sm font-medium mb-2">Scan this QR Code to Pay</h3>
                                <img
                                    src={qrCodeUrl}
                                    alt="QR Code for Payment"
                                    className="mx-auto w-40 h-40 border border-gray-300 rounded"
                                />
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

'use client';

import { useOrder } from '../context/OrderContext';

export default function OrderPage() {
    const { order } = useOrder();

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

                {/* QR Code */}
                {order.length > 0 && totalPrice > 0 && (
                    <div className="mt-6 text-center">
                        <h2 className="text-lg font-semibold mb-2">Scan to Pay</h2>
                        <img
                            src={qrCodeUrl}
                            alt="QR Code for Payment"
                            className="mx-auto border border-gray-300 rounded"
                        />
                    </div>
                )}

                {/* Footer */}
                <p className="text-center text-xs text-gray-500 mt-6">Thank you for dining with us!</p>
            </div>
        </main>
    );
}

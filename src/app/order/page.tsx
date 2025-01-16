'use client';

import { useOrder } from '../context/OrderContext';
import { useState } from 'react';
import Image from 'next/image';

export default function OrderPage() {
    const { order, removeOrderItem } = useOrder();
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'qr'>('cash');

    const totalPrice = order.reduce((total, item) => total + item.price * item.quantity, 0);

    const accountNumber = '0021000463899';
    const bankCode = 'VCB';
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

    const handleRemoveItem = (index: number) => {
        removeOrderItem(index);
    };

    return (
        <main className="p-4">
            <div className="max-w-screen-sm mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                {/* Header */}
                <h1 className="text-center text-xl font-bold mb-4">226&apos;s Cafe</h1>
                <p className="text-center text-sm text-gray-500">Đơn hàng của bạn</p>
                <hr className="my-4 border-gray-300" />

                {/* Itemized List */}
                <div className="mb-4">
                    {order.length === 0 ? (
                        <p className="text-center text-gray-500">Đơn hàng của bạn đang trống</p>
                    ) : (
                        <ul>
                            {order.map((item, index) => (
                                <li key={`${item.id}-${index}`} className="py-2 border-b last:border-none text-gray-700">
                                    <div className="flex justify-between">
                                        <span>
                                            {item.name}{' '}
                                            <span className="text-sm text-gray-500">x{item.quantity}</span>
                                        </span>
                                        <span>
                                            {(item.price * item.quantity).toLocaleString('vi-VN')} VND
                                        </span>
                                    </div>
                                    {item.options && (
                                        <ul className="text-sm text-gray-500 mt-1 pl-4 list-disc">
                                            {item.options.sugarLevel && (
                                                <li>Sugar: {item.options.sugarLevel}%</li>
                                            )}
                                            {item.options.iceLevel && (
                                                <li>Ice: {item.options.iceLevel}%</li>
                                            )}
                                            {item.options.toppings && item.options.toppings.length > 0 && (
                                                <li>Toppings: {item.options.toppings.join(', ')}</li>
                                            )}
                                        </ul>
                                    )}
                                    <div className="flex justify-end mt-2">
                                        <button
                                            className="text-red-500 font-medium hover:underline"
                                            onClick={() => handleRemoveItem(index)}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Total */}
                <div className="flex justify-between font-bold text-gray-800 border-t pt-4">
                    <span>Thành tiền</span>
                    <span>{totalPrice.toLocaleString('vi-VN')} VND</span>
                </div>

                {/* Payment Options */}
                {order.length > 0 && totalPrice > 0 && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-4">Lựa chọn phương thức thanh toán</h2>
                        <div className="flex justify-around mb-4">
                            <button
                                className={`px-4 py-2 rounded ${
                                    paymentMethod === 'cash'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                }`}
                                onClick={() => setPaymentMethod('cash')}
                            >
                                Tiền mặt
                            </button>
                            <button
                                className={`px-4 py-2 rounded ${
                                    paymentMethod === 'qr'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                }`}
                                onClick={() => setPaymentMethod('qr')}
                            >
                                Mã QR
                            </button>
                        </div>

                        {/* Conditional Rendering for Payment Method */}
                        {paymentMethod === 'cash' && (
                            <div className="text-center">
                                <p className="text-gray-700 mb-4">
                                    Vui lòng thanh toán <strong>{totalPrice.toLocaleString('vi-VN')} VND</strong> tiền mặt tại quầy thanh toán.
                                </p>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
                                    onClick={handleCashSubmit}
                                >
                                    Xác nhận đơn hàng
                                </button>
                            </div>
                        )}
                        {paymentMethod === 'qr' && (
                            <div className="text-center">
                                <h3 className="text-sm font-medium mb-2">Quét mã QR dưới đây để thanh toán</h3>
                                <Image
                                    src={qrCodeUrl}
                                    alt="QR Code for Payment"
                                    width={160}
                                    height={160}
                                    className="mx-auto border border-gray-300 rounded"
                                />
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-blue-600 transition"
                                    onClick={handleQrPaid}
                                >
                                    Xác nhận thanh toán
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer */}
                <p className="text-center text-xs text-gray-500 mt-6">Cảm ơn bạn đã ghé thăm quán của chúng tôi!</p>
            </div>
        </main>
    );
}

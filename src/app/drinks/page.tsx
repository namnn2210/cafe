'use client';

import React, {useState, useEffect} from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    RadioGroup,
    Radio,
    CheckboxGroup,
    Checkbox,
    useDisclosure,
    Pagination,
} from "@nextui-org/react";
import Image from 'next/image';
import {useOrder} from "../context/OrderContext";
import {fetchFromAPI} from '@/utils/api';
import { Spinner } from '@nextui-org/react';
import BASE_API_URL from '@/config/config';
import Drink from '@/output/drink';


export default function DrinksPage() {
    const {addToOrder} = useOrder();
    const {isOpen, onOpenChange} = useDisclosure();
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
    const [selectedSugarLevel, setSelectedSugarLevel] = useState<string>("");
    const [selectedIceLevel, setSelectedIceLevel] = useState<string>("");
    const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Fetch drinks from API
    useEffect(() => {
        const fetchDrinks = async () => {
            try {
                const data = await fetchFromAPI('/products/category/1');
                setDrinks(data);
            } catch (error) {
                console.error('Error fetching drinks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDrinks();
    }, []);

    if (loading) {
        return (
            <main className="p-4 flex items-center justify-center h-screen bg-[var(--background)]">
                <Spinner size="lg" color="primary" />
            </main>
        );
    }

    const handleCustomize = (drink: Drink) => {
        setSelectedDrink(drink);
        setSelectedSugarLevel(drink.options.sugarLevels[0]);
        setSelectedIceLevel(drink.options.iceLevels[0]);
        setSelectedToppings([]);
        // @ts-expect-error: Known type issue with onOpenChange
        onOpenChange(true);
    };

    const handleAddToOrder = () => {
        if (selectedDrink) {
            addToOrder({
                ...selectedDrink,
                options: {
                    sugarLevel: selectedSugarLevel,
                    iceLevel: selectedIceLevel,
                    toppings: selectedToppings,
                },
            });
            // @ts-expect-error: Known type issue with onOpenChange
            onOpenChange(false);
            setSelectedDrink(null);
            setSelectedSugarLevel("");
            setSelectedIceLevel("");
            setSelectedToppings([]);
        }
    };

    const handleCancel = () => {
        // @ts-expect-error: Known type issue with onOpenChange
        onOpenChange(false);
    }

    const filteredDrinks = drinks.filter((drink) =>
        drink.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredDrinks.length / itemsPerPage);
    const paginatedDrinks = filteredDrinks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <main className="p-4 pb-20 bg-[var(--background)]">
            <h1 className="text-2xl font-bold mb-4 text-center">Đồ uống</h1>

            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Tìm kiếm đồ uống..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paginatedDrinks.map((drink) => (
                    <div
                        key={drink.id}
                        className="p-4 transition text-center cursor-pointer"
                        onClick={() => handleCustomize(drink)}
                    >
                        <Image
                            src={`${BASE_API_URL}${drink.image}`}
                            alt={drink.name}
                            style={{objectFit: 'cover'}}
                            width={300}
                            height={300}
                            className="w-72 h-72 object-cover mx-auto"
                        />
                        <h2 className="text-lg font-bold mt-4">{drink.name}</h2>
                        <p className="mt-2">
                            {drink.price.toLocaleString("vi-VN")} VND
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                <Pagination
                    total={totalPages}
                    page={currentPage}
                    onChange={(page) => setCurrentPage(page)}
                    size="lg"
                />
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <>
                        <ModalHeader>Customize {selectedDrink?.name}</ModalHeader>
                        <ModalBody>
                            <div className="mb-4">
                                <h4 className="font-medium mb-2">Sugar Level</h4>
                                <RadioGroup
                                    orientation="horizontal"
                                    value={selectedSugarLevel}
                                    onValueChange={(value) => setSelectedSugarLevel(value)}
                                >
                                    {selectedDrink?.options.sugarLevels.map((level, index) => (
                                        <Radio key={index} value={level}>
                                            {level}%
                                        </Radio>
                                    ))}
                                </RadioGroup>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-medium mb-2">Ice Level</h4>
                                <RadioGroup
                                    orientation="horizontal"
                                    value={selectedIceLevel}
                                    onValueChange={(value) => setSelectedIceLevel(value)}
                                >
                                    {selectedDrink?.options.iceLevels.map((level, index) => (
                                        <Radio key={index} value={level}>
                                            {level}%
                                        </Radio>
                                    ))}
                                </RadioGroup>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-medium mb-2">Toppings</h4>
                                <CheckboxGroup
                                    orientation="vertical"
                                    value={selectedToppings}
                                    onValueChange={setSelectedToppings}
                                >
                                    {selectedDrink?.options.toppings.map((topping, index) => (
                                        <Checkbox key={index} value={topping}>
                                            {topping}
                                        </Checkbox>
                                    ))}
                                </CheckboxGroup>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={handleCancel}>
                                Cancel
                            </Button>
                            <Button color="success" onPress={handleAddToOrder}>
                                Confirm
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </main>
    );
}

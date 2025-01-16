'use client';

import React, { useState } from 'react';
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
import { useOrder } from "../context/OrderContext";

const drinks = [
    { id: 1, name: "Bạc sỉu", price: 30000, image: "https://placehold.co/300x300?text=Bạc+sỉu", options: { sugarLevels: ["100", "70", "50", "30"], iceLevels: ["100", "70", "50", "30"], toppings: ["Pudding", "Boba", "Whipped Cream"] } },
    { id: 2, name: "Đen đá", price: 30000, image: "https://placehold.co/300x300?text=Đen+đá", options: { sugarLevels: ["100", "70", "50"], iceLevels: ["100", "50"], toppings: ["Grass Jelly", "Boba"] } },
    { id: 3, name: "Nâu đá", price: 35000, image: "https://placehold.co/300x300?text=Nâu+đá", options: { sugarLevels: ["100", "70", "50", "30"], iceLevels: ["100", "70", "50", "30"], toppings: ["Pudding", "Boba", "Whipped Cream", "Grass Jelly"] } },
    { id: 4, name: "Trà đào cam sả", price: 40000, image: "https://placehold.co/300x300?text=Trà+đào", options: { sugarLevels: ["100", "70", "50", "30"], iceLevels: ["100", "70", "50", "30"], toppings: ["Pudding", "Boba", "Whipped Cream", "Grass Jelly"] } },
    { id: 5, name: "Trà sữa truyền thống", price: 45000, image: "https://placehold.co/300x300?text=Trà+sữa", options: { sugarLevels: ["100", "70", "50", "30"], iceLevels: ["100", "70", "50", "30"], toppings: ["Pudding", "Boba", "Whipped Cream"] } },
    { id: 6, name: "Matcha Latte", price: 50000, image: "https://placehold.co/300x300?text=Matcha+Latte", options: { sugarLevels: ["100", "70", "50"], iceLevels: ["100", "50"], toppings: ["Grass Jelly", "Boba"] } },
    { id: 7, name: "Caramel Macchiato", price: 55000, image: "https://placehold.co/300x300?text=Caramel", options: { sugarLevels: ["100", "70", "50", "30"], iceLevels: ["100", "70", "50", "30"], toppings: ["Pudding", "Boba", "Whipped Cream"] } },
    { id: 8, name: "Espresso", price: 40000, image: "https://placehold.co/300x300?text=Espresso", options: { sugarLevels: ["100", "70", "50", "30"], iceLevels: ["100", "70", "50", "30"], toppings: ["Whipped Cream"] } },
    { id: 9, name: "Mocha", price: 60000, image: "https://placehold.co/300x300?text=Mocha", options: { sugarLevels: ["100", "70", "50"], iceLevels: ["100", "50"], toppings: ["Grass Jelly", "Boba"] } },
    { id: 10, name: "Americano", price: 35000, image: "https://placehold.co/300x300?text=Americano", options: { sugarLevels: ["100", "70", "50", "30"], iceLevels: ["100", "70", "50", "30"], toppings: [] } },
];

export default function DrinksPage() {
    const { addToOrder } = useOrder();
    const { isOpen, onOpenChange } = useDisclosure();
    const [selectedDrink, setSelectedDrink] = useState<any>(null);

    const [selectedSugarLevel, setSelectedSugarLevel] = useState<string>("");
    const [selectedIceLevel, setSelectedIceLevel] = useState<string>("");
    const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const handleCustomize = (drink: any) => {
        setSelectedDrink(drink);
        setSelectedSugarLevel(drink.options.sugarLevels[0]);
        setSelectedIceLevel(drink.options.iceLevels[0]);
        setSelectedToppings([]);
        // @ts-ignore
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
            // @ts-ignore
            onOpenChange(false);
            setSelectedDrink(null);
            setSelectedSugarLevel("");
            setSelectedIceLevel("");
            setSelectedToppings([]);
        }
    };

    // Reset pagination when the search term changes
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page
    };

    const handleCancel = () => {
        // @ts-ignore
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

            {/* Search Bar */}
            <div className="relative mb-6">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.621 3.863l4.528 4.529a1 1 0 01-1.414 1.414l-4.529-4.528A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
                <input
                    type="text"
                    placeholder="Tìm kiếm đồ uống..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition"
                />
            </div>

            {/* Drink Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paginatedDrinks.map((drink) => (
                    <div
                        key={drink.id}
                        className="p-4 transition text-center cursor-pointer"
                        onClick={() => handleCustomize(drink)}
                    >
                        <img
                            src={drink.image}
                            alt={drink.name}
                            className="w-72 h-72 object-cover mx-auto"
                        />
                        <h2 className="text-lg font-bold mt-4">{drink.name}</h2>
                        <p className="mt-2">
                            {drink.price.toLocaleString("vi-VN")} VND
                        </p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <Pagination
                    total={totalPages}
                    page={currentPage}
                    onChange={(page) => setCurrentPage(page)}
                    size="lg"
                />
            </div>

            {/* NextUI Modal */}

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom" className="bg-[var(--background)]">
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Customize {selectedDrink?.name}
                        </ModalHeader>
                        <ModalBody>
                            <div className="mb-4">
                                <h4 className="font-medium mb-2">Sugar Level</h4>
                                <RadioGroup
                                    orientation="horizontal"
                                    value={selectedSugarLevel}
                                    onValueChange={(value) => setSelectedSugarLevel(value)}
                                >
                                    {selectedDrink?.options.sugarLevels.map((level: string, index: number) => (
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
                                    {selectedDrink?.options.iceLevels.map((level: string, index: number) => (
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
                                    {selectedDrink?.options.toppings.map((topping: string, index: number) => (
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

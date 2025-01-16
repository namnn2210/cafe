'use client';

import React, { useState } from "react";
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
} from "@nextui-org/react";
import { useOrder } from "../context/OrderContext";

const drinks = [
    {
        id: 1,
        name: "Cappuccino",
        description: "A warm and creamy coffee drink topped with milk foam.",
        price: 45000,
        image: "https://placehold.co/300x200?text=Cappuccino",
        options: {
            sugarLevels: ["100", "70", "50", "30"],
            iceLevels: ["100", "70", "50", "30"],
            toppings: ["Pudding", "Boba", "Whipped Cream"],
        },
    },
    {
        id: 2,
        name: "Latte",
        description: "Smooth espresso mixed with steamed milk.",
        price: 50000,
        image: "https://placehold.co/300x200?text=Latte",
        options: {
            sugarLevels: ["100", "70", "50"],
            iceLevels: ["100", "50"],
            toppings: ["Grass Jelly", "Boba"],
        },
    },
    {
        id: 3,
        name: "Iced Coffee",
        description: "Cold brewed coffee served over ice.",
        price: 38000,
        image: "https://placehold.co/300x200?text=Iced+Coffee",
        options: {
            sugarLevels: ["100", "70", "50", "30"],
            iceLevels: ["100", "70", "50", "30"],
            toppings: ["Pudding", "Boba", "Whipped Cream", "Grass Jelly"],
        },
    },
];

export default function DrinksPage() {
    const { addToOrder } = useOrder();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedDrink, setSelectedDrink] = useState<any>(null);

    const [selectedSugarLevel, setSelectedSugarLevel] = useState<string>("");
    const [selectedIceLevel, setSelectedIceLevel] = useState<string>("");
    const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

    const handleCustomize = (drink: any) => {
        setSelectedDrink(drink);
        setSelectedSugarLevel(drink.options.sugarLevels[0]); // Default to first option
        setSelectedIceLevel(drink.options.iceLevels[0]); // Default to first option
        setSelectedToppings([]); // Default no toppings
        onOpen();
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
            onOpenChange(false);
            setSelectedDrink(null);
            setSelectedSugarLevel("");
            setSelectedIceLevel("");
            setSelectedToppings([]);
        }
    };

    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Drinks Menu</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {drinks.map((drink) => (
                    <div
                        key={drink.id}
                        className="border rounded-lg p-4 shadow hover:shadow-lg transition"
                    >
                        <img
                            src={drink.image}
                            alt={drink.name}
                            className="w-full h-40 object-cover rounded"
                        />
                        <h2 className="text-lg font-bold mt-2">{drink.name}</h2>
                        <p className="text-gray-600">{drink.description}</p>
                        <p className="text-green-500 font-semibold mt-1">
                            {drink.price.toLocaleString("vi-VN")} VND
                        </p>
                        <Button className="w-full" color="success" onPress={() => handleCustomize(drink)}>Add</Button>
                    </div>
                ))}
            </div>

            {/* NextUI Modal with Bottom Placement */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Customize {selectedDrink?.name}
                            </ModalHeader>
                            <ModalBody>
                                {/* Sugar Level */}
                                <div className="mb-4">
                                    <h4 className="font-medium mb-2">Sugar Level</h4>
                                    <RadioGroup
                                        orientation="horizontal"
                                        value={selectedSugarLevel}
                                        onValueChange={(value) => setSelectedSugarLevel(value)}
                                    >
                                        {selectedDrink?.options.sugarLevels.map((level: string, index: number) => (
                                            <Radio key={`sugar-${selectedDrink.id}-${index}`} value={level}>
                                                {level}%
                                            </Radio>
                                        ))}
                                    </RadioGroup>
                                </div>

                                {/* Ice Level */}
                                <div className="mb-4">
                                    <h4 className="font-medium mb-2">Ice Level</h4>
                                    <RadioGroup
                                        orientation="horizontal"
                                        value={selectedIceLevel}
                                        onValueChange={(value) => setSelectedIceLevel(value)}
                                    >
                                        {selectedDrink?.options.iceLevels.map((level: string, index: number) => (
                                            <Radio key={`ice-${selectedDrink.id}-${index}`} value={level}>
                                                {level}%
                                            </Radio>
                                        ))}
                                    </RadioGroup>
                                </div>

                                {/* Toppings */}
                                <div className="mb-4">
                                    <h4 className="font-medium mb-2">Toppings</h4>
                                    <CheckboxGroup
                                        orientation="vertical"
                                        value={selectedToppings}
                                        onValueChange={setSelectedToppings}
                                    >
                                        {selectedDrink?.options.toppings.map((topping: string, index: number) => (
                                            <Checkbox key={`topping-${selectedDrink.id}-${index}`} value={topping}>
                                                {topping}
                                            </Checkbox>
                                        ))}
                                    </CheckboxGroup>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="success" onPress={handleAddToOrder}>
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </main>
    );
}

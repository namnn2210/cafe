type Drink = {
    id: number;
    name: string;
    price: number;
    image: string;
    options: {
        sugarLevels: string[];
        iceLevels: string[];
        toppings: string[];
    };
};

export default Drink;
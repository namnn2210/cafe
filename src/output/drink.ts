type Drink = {
    id: number;
    name: string;
    price: number;
    image: string;
    option_groups: {
        sugarLevels: string[];
        iceLevels: string[];
        toppings: string[];
    };
};

export default Drink;
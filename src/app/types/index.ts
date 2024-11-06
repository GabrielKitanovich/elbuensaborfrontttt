export type MenuItem = {
    id: number;
    image: string;
    name: string;
    price: number;
    description: string;
};

export type OrderItem = MenuItem & {
    quantity: number;
};

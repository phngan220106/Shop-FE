const CART_STORAGE_KEY = "shop-fe-cart";

export const createCartKey = ({ id, color, size }) => `${id}-${color}-${size}`;

export const normalizeCartItem = (item) => ({
    cartKey: item.cartKey ?? createCartKey(item),
    id: item.id,
    name: item.name,
    image: item.image,
    price: item.price,
    color: item.color,
    size: item.size,
    quantity: Math.max(1, Number(item.quantity) || 1)
});

export const cartApi = {
    getCart() {
        if (typeof window === "undefined") {
            return [];
        }

        try {
            const rawValue = window.localStorage.getItem(CART_STORAGE_KEY);
            const parsedValue = rawValue ? JSON.parse(rawValue) : [];
            return Array.isArray(parsedValue) ? parsedValue.map(normalizeCartItem) : [];
        } catch {
            return [];
        }
    },

    saveCart(items) {
        if (typeof window === "undefined") {
            return;
        }

        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items.map(normalizeCartItem)));
    }
};

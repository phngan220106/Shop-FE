import { createContext, useEffect, useMemo, useState } from "react";
import { cartApi, createCartKey, normalizeCartItem } from "../apis/cart.js";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => cartApi.getCart());

    useEffect(() => {
        cartApi.saveCart(cartItems);
    }, [cartItems]);

    const addToCart = (item) => {
        const normalizedItem = normalizeCartItem({
            ...item,
            cartKey: item.cartKey ?? createCartKey(item)
        });

        setCartItems((prev) => {
            const existingItem = prev.find((cartItem) => cartItem.cartKey === normalizedItem.cartKey);

            if (!existingItem) {
                return [...prev, normalizedItem];
            }

            return prev.map((cartItem) =>
                cartItem.cartKey === normalizedItem.cartKey
                    ? { ...cartItem, quantity: cartItem.quantity + normalizedItem.quantity }
                    : cartItem
            );
        });
    };

    const updateCartItemQuantity = (cartKey, quantity) => {
        if (quantity <= 0) {
            setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
            return;
        }

        setCartItems((prev) =>
            prev.map((item) => (
                item.cartKey === cartKey
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            ))
        );
    };

    const removeFromCart = (cartKey) => {
        setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = useMemo(
        () => cartItems.reduce((total, item) => total + item.quantity, 0),
        [cartItems]
    );

    const cartSubtotal = useMemo(
        () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        [cartItems]
    );

    const contextValue = useMemo(
        () => ({
            cartItems,
            cartCount,
            cartSubtotal,
            addToCart,
            updateCartItemQuantity,
            removeFromCart,
            clearCart
        }),
        [cartItems, cartCount, cartSubtotal]
    );

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

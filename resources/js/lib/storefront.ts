import { Product } from '@/types';

const CART_KEY = 'storefront_cart';
const FAVORITES_KEY = 'storefront_favorites';
const SEARCHES_KEY = 'storefront_searches';

export type CartItem = Product & {
    quantity: number;
};

function canUseStorage() {
    return typeof window !== 'undefined';
}

export function readCart(): CartItem[] {
    if (!canUseStorage()) {
        return [];
    }

    try {
        return JSON.parse(window.localStorage.getItem(CART_KEY) ?? '[]');
    } catch {
        return [];
    }
}

export function writeCart(items: CartItem[]) {
    if (!canUseStorage()) {
        return;
    }

    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('storefront:cart-updated'));
}

export function addToCart(product: Product, quantity = 1) {
    const items = readCart();
    const existing = items.find((item) => item.id === product.id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        items.push({ ...product, quantity });
    }

    writeCart(items);
}

export function updateCartQuantity(productId: number, quantity: number) {
    const items = readCart()
        .map((item) => item.id === productId ? { ...item, quantity } : item)
        .filter((item) => item.quantity > 0);

    writeCart(items);
}

export function removeFromCart(productId: number) {
    writeCart(readCart().filter((item) => item.id !== productId));
}

export function readFavorites(): Product[] {
    if (!canUseStorage()) {
        return [];
    }

    try {
        return JSON.parse(window.localStorage.getItem(FAVORITES_KEY) ?? '[]');
    } catch {
        return [];
    }
}

export function toggleFavorite(product: Product) {
    const favorites = readFavorites();
    const exists = favorites.some((item) => item.id === product.id);
    const next = exists ? favorites.filter((item) => item.id !== product.id) : [...favorites, product];

    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('storefront:favorites-updated'));
}

export function readSearches(): string[] {
    if (!canUseStorage()) {
        return [];
    }

    try {
        return JSON.parse(window.localStorage.getItem(SEARCHES_KEY) ?? '[]');
    } catch {
        return [];
    }
}

export function saveSearch(term: string) {
    const normalized = term.trim();

    if (!normalized || !canUseStorage()) {
        return;
    }

    const next = [normalized, ...readSearches().filter((item) => item !== normalized)].slice(0, 10);
    window.localStorage.setItem(SEARCHES_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('storefront:searches-updated'));
}

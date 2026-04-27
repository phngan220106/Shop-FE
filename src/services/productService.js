import { productSeed } from "../data/products.mock.js";

const normalizeText = (value) => String(value ?? "").trim().toLowerCase();

const normalizeProduct = (product) => {
    if (!product) {
        return null;
    }

    return {
        id: product.id ?? product._id ?? product.productId ?? null,
        name: product.name ?? product.productName ?? "",
        price: Number(product.price ?? product.unitPrice ?? 0),
        image: product.image ?? product.thumbnail ?? product.imageUrl ?? "",
        description: product.description ?? product.shortDescription ?? "",
        category: product.category?.name ?? product.categoryName ?? product.category ?? "",
        categorySlug: product.category?.slug ?? product.categorySlug ?? "",
        stock: Number(product.stock ?? product.quantity ?? product.availableQuantity ?? 0),
        isHot: Boolean(product.isHot ?? product.hot ?? product.featured)
    };
};

const normalizeProductList = (payload) => {
    const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.items)
            ? payload.items
            : Array.isArray(payload?.data)
                ? payload.data
                : Array.isArray(payload?.products)
                    ? payload.products
                    : [];

    return list.map(normalizeProduct).filter(Boolean);
};

const applyPriceRange = (items, priceRange) => {
    if (priceRange === "under-200") {
        return items.filter((product) => product.price < 200000);
    }

    if (priceRange === "200-400") {
        return items.filter((product) => product.price >= 200000 && product.price <= 400000);
    }

    if (priceRange === "400-600") {
        return items.filter((product) => product.price > 400000 && product.price <= 600000);
    }

    if (priceRange === "over-600") {
        return items.filter((product) => product.price > 600000);
    }

    return items;
};

const applySort = (items, sortBy) => {
    const nextItems = [...items];

    nextItems.sort((firstProduct, secondProduct) => {
        if (sortBy === "price-asc") {
            return firstProduct.price - secondProduct.price;
        }

        if (sortBy === "price-desc") {
            return secondProduct.price - firstProduct.price;
        }

        if (sortBy === "name-asc") {
            return firstProduct.name.localeCompare(secondProduct.name);
        }

        if (sortBy === "stock-desc") {
            return secondProduct.stock - firstProduct.stock;
        }

        return Number(secondProduct.isHot) - Number(firstProduct.isHot);
    });

    return nextItems;
};

export const productService = {
    async list(params = {}) {
        const products = [...productSeed].map(normalizeProduct).filter(Boolean);
        const normalizedKeyword = normalizeText(params.keyword);
        let nextProducts = products;

        if (normalizedKeyword) {
            nextProducts = nextProducts.filter((product) => normalizeText(product.name).includes(normalizedKeyword));
        }

        if (params.category && params.category !== "all") {
            nextProducts = nextProducts.filter((product) => product.categorySlug === params.category || product.category === params.category);
        }

        nextProducts = applyPriceRange(nextProducts, params.priceRange ?? "all");

        if (params.hotOnly) {
            nextProducts = nextProducts.filter((product) => product.isHot);
        }

        if (params.inStockOnly) {
            nextProducts = nextProducts.filter((product) => product.stock > 0);
        }

        nextProducts = applySort(nextProducts, params.sortBy ?? "featured");

        const limit = Number.isInteger(params.limit) ? params.limit : nextProducts.length;
        const page = Number.isInteger(params.page) && params.page > 0 ? params.page : 1;
        const startIndex = (page - 1) * limit;

        return {
            items: nextProducts.slice(startIndex, startIndex + limit),
            total: nextProducts.length,
            page,
            limit
        };
    },

    async detail(id) {
        return normalizeProduct(productSeed.find((product) => String(product.id) === String(id)));
    },

    async related({ category, excludeId, limit = 4 } = {}) {
        return productSeed
            .map(normalizeProduct)
            .filter(Boolean)
            .filter((product) => String(product.id) !== String(excludeId) && (!category || product.categorySlug === category || product.category === category))
            .slice(0, limit);
    }
};
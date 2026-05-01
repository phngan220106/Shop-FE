import api from "../apis/default.js";
import { productSeed } from "../data/products.mock.js";

const slugify = (value) => String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeCategory = (category) => {
    if (!category) {
        return null;
    }

    return {
        id: category.id ?? category._id ?? category.slug ?? slugify(category.name ?? category.categoryName ?? ""),
        name: category.name ?? category.categoryName ?? "",
        slug: category.slug ?? slugify(category.name ?? category.categoryName ?? ""),
        productCount: Number(category.productCount ?? category.totalProducts ?? 0),
        description: category.description ?? ""
    };
};

const buildCategory = (name) => {
    const products = productSeed.filter((product) => product.category === name);

    return {
        id: slugify(name),
        name,
        slug: slugify(name),
        productCount: products.length,
        products
    };
};

const extractListPayload = (responseData) => {
    if (Array.isArray(responseData)) {
        return responseData;
    }

    if (Array.isArray(responseData?.items)) {
        return responseData.items;
    }

    if (Array.isArray(responseData?.data)) {
        return responseData.data;
    }

    if (Array.isArray(responseData?.categories)) {
        return responseData.categories;
    }

    return [];
};

export const categoryService = {
    async list() {
        try {
            const response = await api.get("/categories");
            const categories = extractListPayload(response.data?.data ?? response.data)
                .map(normalizeCategory)
                .filter(Boolean);

            if (categories.length > 0) {
                return categories;
            }

            return [...new Set(productSeed.map((product) => product.category))].map(buildCategory);
        } catch {
            return [...new Set(productSeed.map((product) => product.category))].map(buildCategory);
        }
    },

    async detail(identifier) {
        try {
            const response = await api.get(`/categories/${identifier}`);
            const data = response.data?.data ?? response.data;
            const category = normalizeCategory(data);

            if (category) {
                return category;
            }
        } catch {
            // fall through to seed fallback
        }

        const normalizedIdentifier = slugify(identifier);
        const categoryName = [...new Set(productSeed.map((product) => product.category))].find((name) => slugify(name) === normalizedIdentifier || name === identifier);

        return categoryName ? buildCategory(categoryName) : null;
    }
};
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

export const categoryService = {
    async list() {
        return [...new Set(productSeed.map((product) => product.category))].map(buildCategory);
    },

    async detail(identifier) {
        const normalizedIdentifier = slugify(identifier);
        const categoryName = [...new Set(productSeed.map((product) => product.category))].find((name) => slugify(name) === normalizedIdentifier || name === identifier);

        return categoryName ? buildCategory(categoryName) : null;
    }
};
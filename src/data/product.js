import { productSeed } from "./products.mock.js";

let warnedDeprecatedProductData = false;

if (import.meta.env.DEV && !warnedDeprecatedProductData) {
    warnedDeprecatedProductData = true;
    console.warn("[deprecated] src/data/product.js is deprecated. Use src/services/productService.js instead.");
}

export const products = productSeed;

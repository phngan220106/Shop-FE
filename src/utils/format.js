const currencyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
});

export const formatVND = (amount = 0) => currencyFormatter.format(Number(amount) || 0);

export const formatDate = (date) => {
    if (!date) {
        return "";
    }

    return new Date(date).toLocaleDateString("vi-VN");
};

export const buildImageUrl = (path) => {
    if (!path) {
        return "/path/to/default-image.jpg";
    }

    if (path.startsWith("http")) {
        return path;
    }

    const baseUrl = "http://127.0.0.1:8000/api";
    return `${baseUrl}${path}`;
};

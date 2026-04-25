import api from "./default.js";

export const ORDER_PAYMENT_METHODS = {
    COD: "cod",
    QR: "qr"
};

const USE_ORDER_API_MOCK = true;
const MOCK_BANK_INFO = {
    bankName: "MB Bank",
    accountName: "DEAR ROSE FASHION",
    accountNumber: "0912345678"
};
const mockOrderStore = new Map();

const sleep = (ms) => new Promise((resolve) => {
    window.setTimeout(resolve, ms);
});

const normalizePaymentMethod = (value) => (
    value === ORDER_PAYMENT_METHODS.COD ? ORDER_PAYMENT_METHODS.COD : ORDER_PAYMENT_METHODS.QR
);

const buildMockQrCodeUrl = ({ amount, transferContent }) => {
    const qrData = [
        `BANK:${MOCK_BANK_INFO.bankName}`,
        `ACC:${MOCK_BANK_INFO.accountNumber}`,
        `NAME:${MOCK_BANK_INFO.accountName}`,
        `AMOUNT:${amount}`,
        `CONTENT:${transferContent}`
    ].join("|");

    return `https://quickchart.io/qr?size=260&text=${encodeURIComponent(qrData)}`;
};

export const normalizeOrderItemPayload = (item) => ({
    productId: Number(item.id),
    productName: item.name,
    image: item.image,
    unitPrice: Number(item.price) || 0,
    quantity: Math.max(1, Number(item.quantity) || 1),
    variant: {
        color: item.color || "",
        size: item.size || ""
    }
});

export const buildCreateOrderPayload = ({
    customer,
    shippingAddress,
    items,
    paymentMethod,
    couponCode,
    note
}) => ({
    customer: {
        fullName: customer.fullName.trim(),
        phone: customer.phone.trim()
    },
    shippingAddress: {
        country: shippingAddress.country,
        city: shippingAddress.city,
        district: shippingAddress.district,
        ward: shippingAddress.ward,
        addressLine: shippingAddress.addressLine.trim()
    },
    note: note?.trim() || "",
    couponCode: couponCode?.trim().toUpperCase() || "",
    paymentMethod: normalizePaymentMethod(paymentMethod),
    items: items.map(normalizeOrderItemPayload)
});

const normalizeBankInfo = (bankInfo) => ({
    bankName: bankInfo?.bankName || "",
    accountName: bankInfo?.accountName || "",
    accountNumber: bankInfo?.accountNumber || ""
});

const normalizePaymentInfo = (paymentInfo) => ({
    qrCodeUrl: paymentInfo?.qrCodeUrl || "",
    transferContent: paymentInfo?.transferContent || "",
    amount: Number(paymentInfo?.amount) || 0,
    bankInfo: normalizeBankInfo(paymentInfo?.bankInfo)
});

export const normalizeCreateOrderResponse = (payload) => ({
    orderCode: payload?.orderCode || "",
    status: payload?.status || "",
    paymentMethod: normalizePaymentMethod(payload?.paymentMethod),
    paymentStatus: payload?.paymentStatus || "",
    totalAmount: Number(payload?.totalAmount) || 0,
    paymentInfo: normalizePaymentInfo(payload?.paymentInfo)
});

export const normalizeConfirmPaymentResponse = (payload) => ({
    orderCode: payload?.orderCode || "",
    status: payload?.status || "",
    paymentStatus: payload?.paymentStatus || ""
});

const createMockOrder = async (payload) => {
    await sleep(700);

    const subtotal = payload.items.reduce(
        (total, item) => total + (Number(item.unitPrice) || 0) * (Number(item.quantity) || 0),
        0
    );
    const shippingFee = 35000;
    const couponDiscount = payload.couponCode === "DEARROSE30" ? 30000 : 0;
    const totalAmount = subtotal + shippingFee - couponDiscount;
    const orderCode = `DR${Date.now().toString().slice(-6)}`;
    const transferContent = `${orderCode} ${payload.customer.fullName.toUpperCase()}`;

    const mockOrder = {
        orderCode,
        status: "pending",
        paymentMethod: normalizePaymentMethod(payload.paymentMethod),
        paymentStatus: payload.paymentMethod === ORDER_PAYMENT_METHODS.COD ? "unpaid" : "pending",
        totalAmount,
        paymentInfo: payload.paymentMethod === ORDER_PAYMENT_METHODS.QR
            ? {
                qrCodeUrl: buildMockQrCodeUrl({
                    amount: totalAmount,
                    transferContent
                }),
                transferContent,
                amount: totalAmount,
                bankInfo: MOCK_BANK_INFO
            }
            : {
                qrCodeUrl: "",
                transferContent: "",
                amount: totalAmount,
                bankInfo: {
                    bankName: "",
                    accountName: "",
                    accountNumber: ""
                }
            }
    };

    mockOrderStore.set(orderCode, mockOrder);
    return normalizeCreateOrderResponse(mockOrder);
};

const confirmMockPayment = async ({ orderCode }) => {
    await sleep(600);

    const mockOrder = mockOrderStore.get(orderCode);

    if (!mockOrder) {
        const error = new Error("Khong tim thay don hang de xac nhan thanh toan.");
        error.response = {
            data: {
                message: "Khong tim thay don hang de xac nhan thanh toan."
            }
        };
        throw error;
    }

    const updatedOrder = {
        ...mockOrder,
        status: "confirmed",
        paymentStatus: "paid"
    };

    mockOrderStore.set(orderCode, updatedOrder);

    return normalizeConfirmPaymentResponse(updatedOrder);
};

export const orderApi = {
    async createOrder(payload) {
        if (USE_ORDER_API_MOCK) {
            return createMockOrder(payload);
        }

        const response = await api.post("/orders", payload);
        return normalizeCreateOrderResponse(response.data?.data ?? response.data);
    },

    async confirmPayment({ orderCode }) {
        if (USE_ORDER_API_MOCK) {
            return confirmMockPayment({ orderCode });
        }

        const response = await api.post(`/orders/${orderCode}/confirm-payment`);
        return normalizeConfirmPaymentResponse(response.data?.data ?? response.data);
    }
};

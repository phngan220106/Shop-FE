import api from "./default.js";

export const ORDER_PAYMENT_METHODS = {
    COD: "cod",
    QR: "qr"
};

const USE_ORDER_API_MOCK = true;
// TODO: Chuyen flag nay ve `false` hoac bo han khi backend orders san sang.
// Hien tai checkout van dang chay mock nen UI co the khac hanh vi API that.
const MOCK_BANK_INFO = {
    bankName: "MB Bank",
    accountName: "DEAR ROSE FASHION",
    accountNumber: "0912345678"
};
const mockOrderStore = new Map();
// TODO: mockOrderStore chi dung de gia lap trong phien frontend hien tai.
// Khi noi backend that, bo toan bo luong luu tam tren client nay.

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
// TODO: Mapper nay dang gui ca thong tin hien thi nhu productName/image/unitPrice.
// Can doi chieu voi contract backend xem chi can `productVariantId`/`sku` hay van can snapshot item.

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
// TODO: Khi backend hoan thien, bo sung cac field bat buoc neu co:
// userId, email, shippingFee, shippingMethod, wardCode/districtCode/cityCode, couponId, source...

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
// TODO: Can canh chinh lai normalizer nay theo response that cua backend.
// Neu backend tra them shippingFee, subtotal, discount, expiresAt, paymentUrl... thi nen map day du.

export const normalizeConfirmPaymentResponse = (payload) => ({
    orderCode: payload?.orderCode || "",
    status: payload?.status || "",
    paymentStatus: payload?.paymentStatus || ""
});
// TODO: Neu backend tra payment transaction detail hoac order timeline,
// co the can map them de UI cap nhat trang thai chi tiet hon.

const createMockOrder = async (payload) => {
    await sleep(700);

    const subtotal = payload.items.reduce(
        (total, item) => total + (Number(item.unitPrice) || 0) * (Number(item.quantity) || 0),
        0
    );
    // TODO: Cac gia tri nay dang tinh local de phuc vu demo.
    // Khi co backend that, frontend khong nen tu tinh tong tien de tranh lech voi pricing server.
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
    // TODO: Flow nay chi la xac nhan gia lap tu frontend.
    // Khi noi cong thanh toan that, trang thai thanh toan nen den tu backend/webhook/provider.

    mockOrderStore.set(orderCode, updatedOrder);

    return normalizeConfirmPaymentResponse(updatedOrder);
};

export const orderApi = {
    async createOrder(payload) {
        if (USE_ORDER_API_MOCK) {
            return createMockOrder(payload);
        }

        // TODO: Xac nhan lai endpoint, auth va shape response thuc te cua backend `/orders`.
        const response = await api.post("/orders", payload);
        return normalizeCreateOrderResponse(response.data?.data ?? response.data);
    },

    async confirmPayment({ orderCode }) {
        if (USE_ORDER_API_MOCK) {
            return confirmMockPayment({ orderCode });
        }

        // TODO: Endpoint confirm-payment nay chi hop ly neu backend cho phep xac nhan thu cong.
        // Neu dung webhook/polling, co the API nay se duoc doi ten hoac bo di.
        const response = await api.post(`/orders/${orderCode}/confirm-payment`);
        return normalizeConfirmPaymentResponse(response.data?.data ?? response.data);
    }
};

import axios from "axios";

const API = "http://127.0.0.1:8000/api";

// Get orders for current user
export const getOrders = async () => {
    return await axios.get(`${API}/user/orders`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

// Get single order by ID
export const getOrder = async (orderId) => {
    return await axios.get(`${API}/user/orders/${orderId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

// Cancel order
export const cancelOrder = async (orderId, reason) => {
    return await axios.post(
        `${API}/user/orders/${orderId}/cancel`,
        { reason },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
};

// Reorder (buy again)
export const reorder = async (orderId) => {
    return await axios.post(
        `${API}/user/orders/${orderId}/reorder`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
};

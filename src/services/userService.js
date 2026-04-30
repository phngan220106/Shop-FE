import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const getProfile = async () => {
    return await axios.get(`${API}/user/profile`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

};
export const updateProfile = (data) => {
    return axios.put(`${API}/user/profile`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};
export const changePassword = (data) => {
    return axios.post(`${API}/user/change-password`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};
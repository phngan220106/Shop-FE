import api from "../apis/default";

export const register = async (data) => {
    const res = await api.post("/auth/register", data);

    // auto login
    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("refresh_token", res.data.refresh_token);

    return res.data;
};

export const login = async (data) => {
    const res = await api.post("/auth/login", data);

    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("refresh_token", res.data.refresh_token);

    return res.data;
};

export const getProfile = async () => {
    const res = await api.get("/auth/profile");
    return res.data;
};

export const logout = () => {
    localStorage.clear();
};
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// ================= REQUEST =================
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ================= RESPONSE =================
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Nếu bị 401 và chưa retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refresh_token");

                // gọi API refresh
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/refresh`,
                    {
                        refresh_token: refreshToken,
                    }
                );

                const newAccessToken = res.data.access_token;

                // lưu lại token mới
                localStorage.setItem("access_token", newAccessToken);

                // gắn token mới vào request cũ
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest); // gọi lại request cũ
            } catch (err) {
                // refresh fail → logout
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;
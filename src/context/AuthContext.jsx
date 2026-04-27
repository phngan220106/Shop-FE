/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useEffect, useState } from "react";
import { getProfile } from "../services/authServices.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const [loading, setLoading] = useState(true);

    const logout = useCallback(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

        setUser(null);
        window.location.href = "/login";
    }, []);

    const fetchProfile = useCallback(async () => {
        try {
            const res = await getProfile();
            setUser(res.user);

            localStorage.setItem("user", JSON.stringify(res.user));
        } catch {
            logout();
        } finally {
            setLoading(false);
        }
    }, [logout]);

    useEffect(() => {
        // nếu có token → lấy profile lại (đảm bảo token còn valid)
        const token = localStorage.getItem("access_token");

        if (token) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [fetchProfile]);

    const loginContext = (data) => {
        const { access_token, refresh_token, user } = data;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                loginContext,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
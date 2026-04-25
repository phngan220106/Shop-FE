import axios from "axios";

const regionApiClient = axios.create({
    baseURL: "https://provinces.open-api.vn/api/v1"
});

export const regionApi = {
    async getProvinces() {
        const response = await regionApiClient.get("/p/");
        return Array.isArray(response.data) ? response.data : [];
    },

    async getDistricts(cityCode) {
        const response = await regionApiClient.get(`/p/${cityCode}?depth=2`);
        return Array.isArray(response.data?.districts) ? response.data.districts : [];
    },

    async getWards(districtCode) {
        const response = await regionApiClient.get(`/d/${districtCode}?depth=2`);
        return Array.isArray(response.data?.wards) ? response.data.wards : [];
    }
};

import { axios, getAccessToken } from "../configs/axiosInstance";

const adminApi02 = {};

adminApi02.actionAllUsers02 = async () => {
    return axios.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
};

adminApi02.actionUpdateRole02 = async (value) => {
    return axios.patch("/api/admin/users", value, {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
    })
}

adminApi02.actionDeleteUser02 = async (id) => {
    return axios.delete(`/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
    })
}

export default adminApi02;
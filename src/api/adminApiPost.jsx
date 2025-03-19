import { axios, getAccessToken } from "../configs/axiosInstance"

const adminApiPost = {}

adminApiPost.actionAllPost = async (page) => {
    return axios.get(`/api/admin/posts?page=${page}`, {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
}

adminApiPost.actionDeletePost = async (id) => {
    return axios.delete(`/api/admin/posts/${id}`, {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
}


export default adminApiPost
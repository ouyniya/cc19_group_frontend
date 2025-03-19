import { create } from "zustand"
import adminApiPost from "../api/adminApiPost"

const useAdminPostStores = create((set, get) => ({
    allPost: null,
    totalPages: null,
    totalPosts: null,
    isLoading: false,
    actionAllPost: async (page) => {
        set({ isLoading: true })
        try {
            const result = await adminApiPost.actionAllPost(page)
            set({ allPost: result.data.result })
            set({ totalPages: result.data.totalPages })
            set({ totalPosts: result.data.totalPosts })
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false })
        }
    },
    actionDeletePost: async (id) => {
        set({ isLoading: true })
        try {
            console.log("actionDeletePost")
            const result = await adminApiPost.actionDeletePost(id)
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false })
        }
    }
}))


export default useAdminPostStores;
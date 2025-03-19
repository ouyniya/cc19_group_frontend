import { create } from "zustand"
import adminApi02 from "../api/adminApiUser"

const useAdminStoresUser = create((set, get) => ({
    allUsers: null,
    isLoading: false,
    actionAllUsers02: async () => {
        set({ isLoading: true })
        try {
            const result = await adminApi02.actionAllUsers02()
            set({ allUsers: result.data.result})
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false })
        }
    },
    actionUpdateRole02: async (value) => {
        set({ isLoading: true })
        try {
            const result = await adminApi02.actionUpdateRole02(value)
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false })
        }
    },
    actionDeleteUser02: async (id) => {
        set({ isLoading: true })
        try {
            const result = await adminApi02.actionDeleteUser02(id)
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false })
        }
    },

}))

export default useAdminStoresUser;
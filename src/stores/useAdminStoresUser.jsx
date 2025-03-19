import { create } from "zustand"
import adminApi02 from "../api/adminApiUser"

const useAdminStoresUser = create((set, get) => ({
    allUsers: null,
    isLoading: false,
    actionAllUsers02: async () => {
        set({ isLoading: true })
        try {
            console.log("actionAllUsers02")
            const result = await adminApi02.actionAllUsers02()
            console.log(result)
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
            console.log("result")
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false })
        }
    },
    actionDeleteUser02: async (id) => {
        set({ isLoading: true })
        try {
            console.log("id actionDeleteUser02")
            console.log(id)
            const result = await adminApi02.actionDeleteUser02(id)
            console.log("result")
            console.log(result)
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false })
        }
    },

}))

export default useAdminStoresUser;
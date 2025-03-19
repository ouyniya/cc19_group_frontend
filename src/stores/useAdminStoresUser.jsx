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
            console.log("value in actionUpdateRole02")
            console.log(value)
            console.log("actionUpdateRole02")
            const result = await adminApi02.actionUpdateRole02(value)
            console.log("result")
            console.log(result)
            // set({ allUsers: result.data.result})
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false })
        }
    },
}))

export default useAdminStoresUser;
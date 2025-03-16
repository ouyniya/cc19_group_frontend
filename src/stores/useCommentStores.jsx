import { create } from "zustand";
import commentApi from "../api/commentApi";

const useCommentStores = create((set, get) => ({
  comments: [],
  isLoading: false,
  getUpdatedComment: () => get().comments, //  ใช้เป็นฟังก์ชันแทนค่าเริ่มต้น
  getComments: async (postId) => {
    set({ isLoading: true });
    try {
      const res = await commentApi.actionGetComments(postId);
      set({ comments: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  addComment: async (body) => {
    const res = await commentApi.actionAddComment(body);
    set({ comments: [...get().comments, res.data] }); // ดึง comments จาก state ก่อนอัปเดต
  },
  updateComment: async (commentId, body) => {
    const res = await commentApi.actionUpdateComment(commentId, body);
    set({
      comments: get().comments.map((comment) =>
        comment.id === commentId ? res.data : comment
      ),
    });
  },
  deleteComment: async (commentId) => {
    try {
      await commentApi.actionDeleteComment(commentId);
      set((state) => ({
        comments: state.comments.filter((comment) => comment.id !== commentId),
      }));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  },
  addReply: async (parentId, body) => {
    const res = await commentApi.actionAddReply(body);
    set({
      comments: get().comments.map(
        (
          comment // ใช้ get() เพื่อดึง comments จาก state ปัจจุบัน
        ) =>
          comment.id === parentId
            ? { ...comment, children: [...(comment.children || []), res.data] }
            : comment
      ),
    });
  },
}));

export default useCommentStores;

import { create } from "zustand";
import axios from "axios";

const useCommentStores = create((set, get) => ({
  comments: [],
  getUpdatedComment: () => get().comments, //  ใช้เป็นฟังก์ชันแทนค่าเริ่มต้น
  getComments: async (postId) => {
    const res = await axios.get(`http://localhost:8899/api/comments/${postId}`);
    set({ comments: res.data });
  },
  addComment: async (body) => {
    const res = await axios.post(`http://localhost:8899/api/comments/`, body);
    set({ comments: [...get().comments, res.data] }); // ดึง comments จาก state ก่อนอัปเดต
  },
  updateComment: async (body) => {
    const res = await axios.post(`http://localhost:8899/api/comments/`, body);
    set({ comments: [...get().comments, res.data] }); 
  },
  addReply: async (parentId, body) => {
    const res = await axios.post(`http://localhost:8899/api/comments/`, body);
    set({
      comments: get().comments.map(comment =>  // ใช้ get() เพื่อดึง comments จาก state ปัจจุบัน
        comment.id === parentId 
          ? { ...comment, children: [...(comment.children || []), res.data] }
          : comment
      )
    });
  }
}));

export default useCommentStores;

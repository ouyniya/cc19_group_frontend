import React, { useEffect, useState } from "react";
import useCommentStores from "../stores/useCommentStores";
import useUserStore from "../stores/userStore";
import { createAlert } from "../utils/createAlert";

const CommentForm = ({ postId, parentId = null, setShowReply }) => {
  const [content, setContent] = useState("");
  const addComment = useCommentStores((state) => state.addComment);
  const getComments = useCommentStores((state) => state.getComments);
  const comments = useCommentStores((state) => state.comments);

  const actionGetMe = useUserStore((state) => state.actionGetMe);
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    if (!user && token) {
      actionGetMe();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return createAlert("info", "Please add some comments.");
    // เช็คก่อนทำงานต่อ

    if (!user?.id)
      return createAlert("info", "Please log in before leaving a comment.");
    // เช็คก่อนทำงานต่อ

    try {
      const newComment = {
        postId: Number(postId),
        parentId,
        content,
        userId: Number(user?.id),
      }; // เปลี่ยนเป็น userId ที่ login อยู่

      const body = newComment;
      await addComment(body);
      await getComments(postId);
      setContent(""); // ค่าข้างในช่อง comment เป็นค่าว่าง
      if (setShowReply) setShowReply(false); //  ป้องกัน error ในกรณี setShowReply ไม่ถูกส่งมา
      
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      createAlert("info", errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="border p-1 mr-[10px] rounded-md w-[80%]"
      />
      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CommentForm;

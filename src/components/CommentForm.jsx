import React, { useState } from "react";
import useCommentStores from "../stores/useCommentStores";

const CommentForm = ({ postId, parentId = null, setShowReply }) => {
  const [content, setContent] = useState("");
  const addComment = useCommentStores((state) => state.addComment);
  const getComments = useCommentStores(state => state.getComments)
  const comments = useCommentStores(state => state.comments)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newComment = {
        postId: Number(postId),
        parentId,
        content,
        userId: 1,
      }; // เปลี่ยนเป็น userId ที่ login อยู่

      const body = newComment;
    //   console.log(body);
      await addComment(body);
      await getComments(postId)
      setContent(""); // ค่าข้างในช่อง comment เป็นค่าว่าง
      setShowReply(false)
    } catch (error) {}
    
    if (!content.trim()) return;
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="input input-primary"
      />
      <button type="submit" className="btn btn-primary">Post</button>
    </form>
  );
};

export default CommentForm;

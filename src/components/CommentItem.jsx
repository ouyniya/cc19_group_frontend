import React, { useState } from "react";
import CommentForm from "./CommentForm";
import useCommentStores from "../stores/useCommentStores";

const CommentItem = ({ comment }) => {
  const [showReply, setShowReply] = useState(false);
  const addReply = useCommentStores((state) => state.addReply);

  //   console.log(comment);

  const handleReply = async (newReply) => {
    addReply(newReply); // อัปเดต global state
  };

  return (
    <div
      className={`mb-[10px]
      ml-${comment.parentId ? "5" : "0"} border-l-2 border-gray-300 pl-2 mb-2`}
    >
      <p>
        <strong>{comment.user.username}</strong>: {comment.content}
      </p>
      <button
        className="btn btn-primary"
        onClick={() => setShowReply(!showReply)}
        hidden={comment.parentId === null ? false : true}
      >
        Reply
      </button>

      {showReply && (
        <CommentForm
          postId={comment.postId}
          parentId={comment.id}
          addComment={handleReply}
          setShowReply={setShowReply}
        />
      )}

      {comment.children &&
        comment.children.map((reply) => (
          <CommentItem key={reply.id} comment={reply} />
        ))}
    </div>
  );
};

export default CommentItem;

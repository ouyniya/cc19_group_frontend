import React, { useEffect } from "react";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import useCommentStores from "../stores/useCommentStores";

const CommentList = ({ postId }) => {
  const comments = useCommentStores((state) => state.comments);
  const getUpdatedComment = useCommentStores(
    (state) => state.getUpdatedComment
  );
  const getComments = useCommentStores((state) => state.getComments);

  useEffect(() => {
    getComments(postId);
  }, [postId]);

  return (
    <div>
      <h3>Comments</h3>
      <CommentForm postId={postId} />
      <div>
        {getUpdatedComment()?.map((comment, index) =>
          !comment || !comment.user ? (
            <p key={index}>Loading...</p>
          ) : (
            <CommentItem key={comment.id} comment={comment} />
          )
        )}
      </div>
    </div>
  );
};

export default CommentList;

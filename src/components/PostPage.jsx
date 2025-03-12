import React from "react";
import CommentList from "./CommentList";

const PostPage = ({ postId }) => {
  return (
    <div>
      <h2>Post Title</h2>
      <p>Post content...</p>
      <CommentList postId={postId} />
    </div>
  );
};

export default PostPage;

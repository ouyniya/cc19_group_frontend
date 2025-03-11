import { useParams } from "react-router";
import PostPage from "../components/PostPage";

function PostAndComment() {
  const { postId } = useParams(); // ดึง postId จาก URL
  return (
    <>
      <PostPage postId={postId} />
    </>
  );
}

export default PostAndComment;

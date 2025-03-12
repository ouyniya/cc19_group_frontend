import { useParams } from "react-router";
import PostPage from "../components/PostPage";
import { getToken } from "../api/trackview";


function PostAndComment() {
  const { postId } = useParams(); // ดึง postId จาก URL

  getToken()

  return (
    <>
      <PostPage postId={postId} />
    </>
  );
}

export default PostAndComment;

import { useParams } from "react-router";
import PostPage from "../components/PostPage";
import { trackView, getToken } from "../api/trackview";
import { useEffect } from "react";

function PostAndComment() {
  const { postId } = useParams(); // ดึง postId จาก URL

  getToken();
  // console.log(getToken())

  const trackViews = async () => {
    await trackView(Number(postId), getToken());
  };

  useEffect(() => {
    trackViews();
  }, []);

  return (
    <>
      <PostPage postId={postId} />
    </>
  );
}

export default PostAndComment;

import React, { useEffect, useState } from "react";
import * as toxicity from "@tensorflow-models/toxicity";
import "@tensorflow/tfjs";
import useCommentStores from "../stores/useCommentStores";
import useUserStore from "../stores/userStore";
import { createAlert } from "../utils/createAlert";

const CommentForm = ({ postId, parentId = null, setShowReply }) => {
  const [content, setContent] = useState("");
  const [loadingModel, setLoadingModel] = useState(true);
  const [model, setModel] = useState(null);

  const addComment = useCommentStores((state) => state.addComment);
  const getComments = useCommentStores((state) => state.getComments);
  const actionGetMeOrGoogleLogin = useUserStore((state) => state.actionGetMeOrGoogleLogin);
  const user = useUserStore((state) => state.user);
  const googleLoginSuccessful = useUserStore((state) => state.googleLoginSuccessful);

  useEffect(() => {
    if (!user && !googleLoginSuccessful) {
      actionGetMeOrGoogleLogin();
    }
  }, []);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await toxicity.load(0.9);
      setModel(loadedModel);
      setLoadingModel(false);
    };
    loadModel();
  }, []);

  const checkToxicity = async (text) => {
    if (!model) return false;
    const predictions = await model.classify([text]);
    return predictions.some((p) => p.results.some((r) => r.match));
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const foundToxic = await checkToxicity(content);
    if (foundToxic) {
      createAlert("error", "❌ พบคำไม่เหมาะสม! กรุณาใช้คำที่เหมาะสม");
      return;
    }
    if (!content.trim()) return createAlert("info", "Please add some comments.");
    if (!user?.id) return createAlert("info", "Please log in before leaving a comment.");

    try {
      const newComment = {
        postId: Number(postId),
        parentId,
        content,
        userId: Number(user?.id),
      };
      await addComment(newComment);
      await getComments(postId);
      setContent("");
      if (setShowReply) setShowReply(false);
      createAlert("success", "✅ Comment posted successfully!");
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      createAlert("info", errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-2 mt-4">
      <input
        type="text"
        value={content}
        onChange={handleContentChange}
        placeholder="Write a comment..."
        className="border p-2 mr-[10px] rounded-md w-[80%]"
      />
      <button type="submit" className="btn btn-info" disabled={loadingModel}>
        {loadingModel ? "🔄" : "Post"}
      </button>
    </form>
  );
};

export default CommentForm;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import CommentForm from "./CommentForm";
import useCommentStores from "../stores/useCommentStores";

const CommentItem = ({ comment }) => {
  const { postId } = useParams(); // ดึง postId จาก URL

  const [showReply, setShowReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const addReply = useCommentStores((state) => state.addReply);
  const updateComment = useCommentStores((state) => state.updateComment);
  const deleteComment = useCommentStores((state) => state.deleteComment);
  const getComments = useCommentStores((state) => state.getComments);

  const handleReply = async (newReply) => {
    await addReply(newReply);
  };

  const handleEdit = async () => {
    try {
      if (editContent.trim()) {
        // console.log(editContent)
        const body = {
          content: editContent,
        };
        await updateComment(comment.id, body);
        await getComments(postId);

        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id);
      await getComments(postId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`ml-${
        comment.parentId ? "5" : "0"
      } border-l-2 border-gray-300 pl-4 py-2 text-gray-900`}
    >
      <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
        <p className="text-sm text-gray-600">
          <strong>{comment.user.username}</strong>
        </p>

        {isEditing ? (
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="border p-1 flex-1 rounded-md"
            />
            <button className="btn btn-success" onClick={handleEdit}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <p className="text-gray-800">{comment.content}</p>
        )}

        <div className="flex gap-2 mt-2">
          <button
            className="btn btn-xs btn-info"
            hidden={comment.parentId === null ? false : true}
            onClick={() => setShowReply(!showReply)}
          >
            Reply
          </button>
          <button
            className="btn btn-xs btn-warning"
            hidden={comment.userId === 1 ? false : true} // แก้ไขเป็น user ของเราเอง
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="btn btn-xs btn-error"
            onClick={handleDelete}
            hidden={comment.userId === 1 ? false : true} // แก้ไขเป็น user ของเราเอง
          >
            Delete
          </button>
        </div>

        {showReply && (
          <CommentForm
            postId={comment.postId}
            parentId={comment.id}
            addComment={handleReply}
            setShowReply={setShowReply}
          />
        )}
      </div>

      <div className="mt-2">
        {comment.children &&
          comment.children.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
      </div>
    </div>
  );
};

export default CommentItem;

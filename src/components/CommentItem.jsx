import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import CommentForm from "./CommentForm";
import { useLocation, useNavigate } from "react-router";
import useCommentStores from "../stores/useCommentStores";
import useUserStore from "../stores/userStore";
import Swal from "sweetalert2";
import { createAlert } from "../utils/createAlert";
import { UserIcon } from "lucide-react";
import moment from "moment";

const CommentItem = ({ comment }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const { postId } = useParams(); // ดึง postId จาก URL

  const [showReply, setShowReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const addReply = useCommentStores((state) => state.addReply);
  const updateComment = useCommentStores((state) => state.updateComment);
  const deleteComment = useCommentStores((state) => state.deleteComment);
  const getComments = useCommentStores((state) => state.getComments);

  const actionGetMeOrGoogleLogin = useUserStore(
    (state) => state.actionGetMeOrGoogleLogin
  );
  const user = useUserStore((state) => state.user);
  const googleLoginSuccessful = useUserStore(
    (state) => state.googleLoginSuccessful
  );

  useEffect(() => {
    if (!user && !googleLoginSuccessful) {
      // the user is not logged in or the user data hasn't been fetched yet
      // the user is authenticated but the data hasn't been fetched
      actionGetMeOrGoogleLogin();
    }
  }, []);

  const hdlProfileLink = (id) => {
    const targetPath = `/user-dashboard/${id}`; // Replace with dynamic user ID
    console.log("Target Path:", targetPath);

    // Only navigate if the current location does not match the target path
    if (location.pathname !== targetPath) {
      navigate(targetPath);
      navigate(0); // This will reload the current page and trigger a re-render
    } else {
      // If already on the target route, force re-navigation
      navigate(targetPath);
    }
  };

  // console.log(comment);

  const handleReply = async (newReply) => {
    try {
      await addReply(newReply);
    } catch (error) {}
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
        createAlert("success", "Comment Edited");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteComment(comment.id);
          await getComments(postId);

          Swal.fire({
            title: "Deleted!",
            text: "Your comment has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(comment)

  return (
    <div
      className={`ml-${
        comment.parentId ? "5" : "0"
      } border-l-2 border-gray-300 pl-4 py-2 text-gray-900`}
    >
      <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
        <div className="flex gap-2 items-center">
          {/* profile Image */}
          <Link onClick={() => hdlProfileLink(comment?.userId)} className="flex gap-2">
            <div className="w-10 h-10 mask mask-squircle bg-gradient-to-r from-blue-300 to-blue-200 flex justify-center items-center">
              {comment?.user?.profileImage && !user?.isGoogleUser ? (
                <img
                  src={comment.user?.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon size={20} color="white" />
              )}
            </div>

          {/* username */}
          <div>
            <p className="text-md text-gray-700">
              <strong>{comment.user.username}</strong>
            </p>
            <p className="text-xs text-gray-500">
              {moment(comment.createdAt).fromNow()}
            </p>
          </div>
          </Link>
        </div>

        {isEditing ? (
          <div className="flex items-center gap-2 mt-3">
            <input
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="border p-1 flex-1 rounded-md"
            />
            <button className="btn btn-outline btn-info" onClick={handleEdit}>
              Save
            </button>
            <button
              className="btn btn-outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <p className="text-gray-800 mt-4 mb-4">{comment.content}</p>
        )}

        <div className="flex gap-2 mt-2">
          <button
            className="btn btn-xs btn-outline"
            hidden={comment.parentId === null ? false : true}
            onClick={() => setShowReply(!showReply)}
          >
            Reply
          </button>
          <button
            className="btn btn-xs btn-outline"
            hidden={Number(comment.userId) === Number(user?.id) ? false : true} // แก้ไขเป็น user ของเราเอง
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="btn btn-xs btn-error btn-outline"
            onClick={handleDelete}
            hidden={comment.userId === user?.id ? false : true} // แก้ไขเป็น user ของเราเอง
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


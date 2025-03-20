import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { Check } from "lucide-react";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router";
import usePostStores from "../stores/usePostStores";

const SuccessPost = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const actionDeleteNewPost = usePostStores(
    (state) => state.actionDeleteNewPost
  );
  const newPost = usePostStores((state) => state.newPost);

  const hdlNewPost = () => {
    try {
      //   console.log(newPost);
      if (newPost.length === 0) {
        return;
      } else {
        navigate(`/post/${newPost?.id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      actionDeleteNewPost();
    }
  };

  return (
    <AnimatePresence>
      {true && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-sky-600 to-sky-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-sky-600 grid place-items-center mx-auto">
                <Check />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">Success!</h3>
              <p className="text-center mb-6">
                Your post has been published successfully. 🎉
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/user-dashboard/${user?.id}`)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => hdlNewPost()}
                  className="bg-white hover:opacity-90 transition-opacity text-sky-600 font-semibold w-full py-2 rounded"
                >
                  View Post
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessPost;

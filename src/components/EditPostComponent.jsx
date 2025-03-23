import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import usePostStores from '../stores/usePostStores';
import { createAlert } from '../utils/createAlert';

function EditPostComponent({ id }) {
  const actionGetEachPost = usePostStores((state) => state.actionGetEachPost);
  const actionUpdatePost = usePostStores((state) => state.actionUpdatePost);
  const currentPost = usePostStores((state) => state.curentPost);

  const [input, setInput] = useState({
    title: currentPost.title || '',
    content: currentPost.content || '',
    budget: currentPost.budget || '',
  });

  useEffect(() => {
    actionGetEachPost(id);
  }, []);

  useEffect(() => {
    setInput({
      title: currentPost.title || '',
      content: currentPost.content || '',
      budget: currentPost.budget || '',
    });
  }, [currentPost]);

  const hdlAddPost = async (e) => {
    e.preventDefault();
    try {
      if (
        input.title.trim() === currentPost.title?.trim() &&
        input.content.trim() === currentPost.content?.trim() &&
        input.budget === currentPost.budget
      ) {
        return createAlert("info", "Nothing changed.");
      }
      await actionUpdatePost(input, id);
      createAlert("success", "Edit successfully!");
    } catch (error) {
      if (error.errors) {
        const errMsg = error.errors.reduce((acc, cur) => {
          acc[cur.path] = cur.message;
          return acc;
        }, {});
        createAlert("info", errMsg.message);
      } else {
        createAlert("error", "An unexpected error occurred");
      }
    } finally {
        window.history.back()
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 } 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <motion.div 
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-gradient-to-br from-[var(--btnMain)] to-sky-600 py-6 px-8">
          <motion.h1 
            className="text-3xl font-bold text-white"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Edit Your Post
          </motion.h1>
          <motion.p 
            className="text-blue-100 mt-2"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Update your post details below
          </motion.p>
        </div>

        <motion.div 
          className="p-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <form onSubmit={hdlAddPost}>
            <motion.div className="mb-6" variants={itemVariants}>
              <label 
                htmlFor="title" 
                className="block text-gray-700 font-semibold mb-2"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter post title"
                value={input.title}
                onChange={(e) => setInput({ ...input, title: e.target.value })}
              />
            </motion.div>

            <motion.div className="mb-6" variants={itemVariants}>
              <label 
                htmlFor="content" 
                className="block text-gray-700 font-semibold mb-2"
              >
                Content
              </label>
              <textarea
                id="content"
                rows="6"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Write your post content here..."
                value={input.content}
                onChange={(e) => setInput({ ...input, content: e.target.value })}
              />
            </motion.div>

            <motion.div className="mb-8" variants={itemVariants}>
              <label 
                htmlFor="budget" 
                className="block text-gray-700 font-semibold mb-2"
              >
                Budget
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">฿</span>
                </div>
                <input
                  id="budget"
                  type="number"
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your budget"
                  value={input.budget}
                  onChange={(e) => setInput({ ...input, budget: e.target.value })}
                />
              </div>
            </motion.div>

            <motion.div className="flex justify-end gap-3" variants={itemVariants}>
              <button
                type="button"
                className="inline-flex items-center px-6 py-2.5 border border-gray-300 shadow-sm rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                className="inline-flex items-center px-6 py-2.5 bg-gradient-to-b from-[var(--btnMain)] to-sky-600 hover:bg-sky-600 text-white font-medium rounded-full shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save Changes
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default EditPostComponent;
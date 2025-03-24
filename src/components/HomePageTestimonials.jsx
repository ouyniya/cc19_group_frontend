import React, { useEffect } from "react";
import useCommentStores from "../stores/useCommentStores";
import { Link } from "react-router";
import { MessageSquareQuote } from "lucide-react";

const HomePageTestimonials = () => {
  const testimonials = [
    {
      quote:
        "Proin sed libero enim sed faucibus turpis. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus. Ut sem nulla pharetra diam sit amet nisl.",
      author: "Celia Almeda",
      title: "CEO Company",
      imageUrl: "https://via.placeholder.com/60", // Replace with actual image URLs
    },
    {
      quote:
        "Proin sed libero enim sed faucibus turpis. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus. Ut sem nulla pharetra diam sit amet nisl.",
      author: "Frank Kinney",
      title: "Financial Director",
      imageUrl: "https://via.placeholder.com/60", // Replace with actual image URLs
    },
    {
      quote:
        "Another insightful testimonial from a satisfied customer. Their experience speaks volumes about our commitment.",
      author: "Jane Doe",
      title: "Marketing Manager",
      imageUrl: "https://via.placeholder.com/60", // Replace with actual image URLs
    },
  ];

  const comments = useCommentStores((state) => state.comments);
  const getUpdatedComment = useCommentStores(
    (state) => state.getUpdatedComment
  );
  const getComments = useCommentStores((state) => state.getComments);

  useEffect(() => {
    getComments(87);
  }, []);

  // console.log(comments);

  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8 text-slate-600">
          Read what our members comment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {comments?.slice(0, 3)?.map((comment, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between items-center"
            >
              <div className="text-4xl text-slate-400 mt-5 mb-8">
                <MessageSquareQuote />
              </div>
              <p className="text-gray-700 mb-4">{comment.content}</p>
              <div className="flex items-center mt-4">
                <img
                  src={comment.user.profileImage}
                  alt={comment.user.username}
                  className="rounded-full w-12 h-12 mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-slate-700">
                    {comment.user.username}
                  </h3>
                  <p className="text-sm text-gray-500">{comment.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link to="/filter-page">
          <button className="mt-10 inline-flex items-center px-6 py-2.5 bg-gradient-to-b from-[var(--btnMain)] to-sky-600 hover:bg-sky-600 text-white font-medium rounded-full shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300">
            View More
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HomePageTestimonials;

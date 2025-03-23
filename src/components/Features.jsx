import React from "react";

function Features() {
  return (
    <section className="max-w-7xl mx-auto mt-24 px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-sky-800 mb-12">
        Discover What Voyager Offers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Heatmap Feature */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-all duration-300">
          <img
            src="/icons/heatmap.png"
            alt="Heatmap Feature"
            className="h-20 w-20 mx-auto mb-4 object-contain"
          />
          <h3 className="text-sky-700 font-semibold text-lg mb-2">
            Popular Places Heatmap
          </h3>
          <p className="text-gray-600 text-sm">
            Visualize the hottest travel spots based on real-time user interest.
          </p>
        </div>

        {/* AI Planner Feature */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-all duration-300">
          <img
            src="/icons/ai-plan.png"
            alt="AI Trip Planner"
            className="h-20 w-20 mx-auto mb-4 object-contain"
          />
          <h3 className="text-sky-700 font-semibold text-lg mb-2">
            AI Trip Planner
          </h3>
          <p className="text-gray-600 text-sm">
            Instantly generate your personalized travel plan with our smart AI.
          </p>
        </div>

        {/* Reviews Feature */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-all duration-300">
          <img
            src="/icons/reviews.png"
            alt="User Reviews"
            className="h-20 w-20 mx-auto mb-4 object-contain"
          />
          <h3 className="text-sky-700 font-semibold text-lg mb-2">
            Real User Reviews
          </h3>
          <p className="text-gray-600 text-sm">
            Explore honest experiences from fellow travelers before your trip.
          </p>
        </div>

        {/* Wishlist Feature */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-all duration-300">
          <img
            src="/icons/wishlist.png"
            alt="Wishlist Feature"
            className="h-20 w-20 mx-auto mb-4 object-contain"
          />
          <h3 className="text-sky-700 font-semibold text-lg mb-2">
            Save to Wishlist
          </h3>
          <p className="text-gray-600 text-sm">
            Keep track of places you love and revisit them anytime.
          </p>
        </div>
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/register")}
          className="mt-10 inline-flex items-center px-6 py-2.5 bg-gradient-to-b from-[var(--btnMain)] to-sky-600 hover:bg-sky-600 text-white font-medium rounded-full shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300">
          Sign up for free and start exploring
        </button>
      </div>
    </section>
  );
}

export default Features;

// app/components/Blogs.jsx
'use client';
import React from 'react';

const Blogs = () => {
  // Mock data — replace with actual blog data when available
  const blogsData = [];
  const popularPosts = [];
  const topTags = [];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="text-center p-2 sm:px-8 lg:px-12">
        <h1 className="relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight text-gray-200">
          Technical Blog
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
          Sharing insights, tutorials, and best practices in web development, programming, and technology.
        </p>
        <span className="block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400"></span>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-4 items-stretch">
        {/* Main Blog List */}
        <div className="w-full lg:w-2/3 space-y-4 order-2 lg:order-1">
          {blogsData.length > 0 ? (
            blogsData.map((blog, index) => (
              <div
                key={index}
                className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm flex flex-col h-full group hover:border-gray-600/50 transition-colors duration-300"
              >
                <div className="flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-200 group-hover:text-blue-300 transition-colors">
                      {blog.title}
                    </h3>
                    {blog.isDraft && (
                      <span className="px-2 py-1 text-xs font-semibold bg-yellow-500/20 text-yellow-300 rounded-full">
                        Draft
                      </span>
                    )}
                  </div>

                  <p className="text-sm md:text-base mb-4 text-gray-300 line-clamp-3">
                    {blog.excerpt || blog.content.substring(0, 160) + '...'}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between text-sm text-gray-400">
                    <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    <span>{blog.readTime} min read</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm flex flex-col items-center justify-center h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-600 mb-4"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
              <p className="text-md text-center font-medium text-gray-400">
                No blog posts available yet. Stay tuned!
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/3 space-y-4 order-1 lg:order-2">
          {/* Top Categories */}
          <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold tracking-tight text-gray-200">Top Categories</h3>
            </div>
            {topTags.length > 0 ? (
              <div className="space-y-2">
                {topTags.map((tag, i) => (
                  <div key={i} className="flex justify-between text-gray-300">
                    <span>{tag.name}</span>
                    <span className="text-gray-500">({tag.count})</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No categories yet.</p>
            )}
          </div>

          {/* Popular Posts */}
          <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold tracking-tight text-gray-200">Popular Posts</h3>
            </div>
            {popularPosts.length > 0 ? (
              <div className="space-y-3">
                {popularPosts.map((post, i) => (
                  <a
                    key={i}
                    href={post.slug}
                    className="block p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-200 text-sm line-clamp-2">{post.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{post.views} views</p>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No popular posts yet.</p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Blogs;
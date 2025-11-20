// app/components/Blogs.jsx
'use client';
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const Blogs = () => {
  const { theme } = useTheme();
  // Mock data — replace with actual blog data when available
  const blogsData = [];
  const popularPosts = [];
  const topTags = [];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="text-center p-2 sm:px-8 lg:px-12">
        <h1 className={`relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          Technical Blog
        </h1>
        <p className={`max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
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
                className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300/50'} p-4 lg:p-6 shadow-sm flex flex-col h-full group hover:border-gray-600/50 transition-colors duration-300`}
              >
                <div className="flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className={`text-xl lg:text-2xl font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'} ${theme === 'dark' ? 'group-hover:text-blue-300' : 'group-hover:text-blue-600'} transition-colors`}>
                      {blog.title}
                    </h3>
                    {blog.isDraft && (
                      <span className={`px-2 py-1 text-xs font-semibold ${theme === 'dark' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-500/30 text-yellow-700'} rounded-full`}>
                        Draft
                      </span>
                    )}
                  </div>

                  <p className={`text-sm md:text-base mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} line-clamp-3`}>
                    {blog.excerpt || blog.content.substring(0, 160) + '...'}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-gray-200 text-gray-600 border border-gray-300'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={`mt-auto flex items-center justify-between text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    <span>{blog.readTime} min read</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300/50'} p-4 lg:p-6 shadow-sm flex flex-col items-center justify-center h-full`}>
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
                className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} mb-4`}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
              <p className={`text-md text-center font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                No blog posts available yet. Stay tuned!
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/3 space-y-4 order-1 lg:order-2">
          {/* Top Categories */}
          <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300/50'} p-4 lg:p-6 shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Top Categories</h3>
            </div>
            {topTags.length > 0 ? (
              <div className="space-y-2">
                {topTags.map((tag, i) => (
                  <div key={i} className={`flex justify-between ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span>{tag.name}</span>
                    <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>({tag.count})</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No categories yet.</p>
            )}
          </div>

          {/* Popular Posts */}
          <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300/50'} p-4 lg:p-6 shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Popular Posts</h3>
            </div>
            {popularPosts.length > 0 ? (
              <div className="space-y-3">
                {popularPosts.map((post, i) => (
                  <a
                    key={i}
                    href={post.slug}
                    className={`block p-3 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200/50'} transition-colors`}
                  >
                    <h4 className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'} text-sm line-clamp-2`}>{post.title}</h4>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{post.views} views</p>
                  </a>
                ))}
              </div>
            ) : (
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No popular posts yet.</p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Blogs;
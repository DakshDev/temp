import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, User, Clock, ArrowRight } from "lucide-react";

const BlogListing = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_BACKEND_URL;

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backend}/api/blog/all`);
      setBlogs(res.data.data);
      setFilteredBlogs(res.data.data);
    } catch (e) {
      console.log("Failed to load blog articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(
        (blog) =>
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (blog.authorName || blog.authorId?.name || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchQuery, blogs]);

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, "");
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const truncateText = (text, maxLength = 150) => {
    const plainText = text.replace(/<[^>]*>/g, "");
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div lang="en" dir="ltr" className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#AABD05] to-[#0CBF95] text-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight">
            Stories of Intentional Growth
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-50 max-w-3xl">
            Insights and stories that help you reflect, choose better, and grow - one step at a time.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 md:-mt-8">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6">
          <div className="relative">
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-green-500 focus:outline-none transition text-base md:text-lg"
            />
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12 md:py-20">
            <p className="text-lg md:text-xl text-gray-500">
              {searchQuery ? "No articles found matching your search." : "No articles published yet."}
            </p>
          </div>
        ) : (
          <>
            {/* Featured Blog (First one) */}
            {filteredBlogs.length > 0 && (
              <div
                onClick={() => navigate(`/blog/${filteredBlogs[0].slug}`)}
                className="cursor-pointer mb-8 md:mb-12 group"
              >
                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0 md:gap-6">
                    {filteredBlogs[0].coverImage && (
                      <div className="h-48 sm:h-64 md:h-full overflow-hidden">
                        <img
                          src={filteredBlogs[0].coverImage}
                          alt={filteredBlogs[0].title}
                          className="w-full h-full object-cover md:object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className={`p-5 sm:p-6 md:p-8 flex flex-col justify-center ${!filteredBlogs[0].coverImage ? 'md:col-span-2' : ''}`}>
                      <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4 w-fit">
                        Featured Article
                      </span>
                      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900 group-hover:text-[#0CBF95] transition">
                        {filteredBlogs[0].title}
                      </h2>
                      <p className="text-gray-600 text-sm md:text-lg mb-4 md:mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">
                        {truncateText(filteredBlogs[0].content, 200)}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4 md:mb-6">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <User size={14} className="hidden sm:block" />
                          <span className="font-medium">{filteredBlogs[0].authorName || filteredBlogs[0].authorId?.name || 'Nawaya Team'}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Calendar size={14} className="hidden sm:block" />
                          <span>{new Date(filteredBlogs[0].publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Clock size={14} className="hidden sm:block" />
                          <span>{getReadingTime(filteredBlogs[0].content)}</span>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 text-[#0CBF95] font-semibold group-hover:gap-3 transition-all cursor-pointer text-sm md:text-base">
                        Read Article <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rest of the Blogs */}
            <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.slice(1).map((blog) => (
                <div
                  key={blog._id}
                  onClick={() => navigate(`/blog/${blog.slug}`)}
                  className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {blog.coverImage && (
                    <div className="h-40 sm:h-48 overflow-hidden">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                      <h2 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-900 group-hover:text-[#0CBF95] transition line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {truncateText(blog.content, 120)}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{blog.authorName || blog.authorId?.name || 'Nawaya Team'}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{getReadingTime(blog.content)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-green-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read More <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogListing;

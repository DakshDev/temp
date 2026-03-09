import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, User, Share2, ArrowLeft, Facebook, Linkedin, Link as LinkIcon } from "lucide-react";
import { toast } from "react-toastify";
import {FaXTwitter} from "react-icons/fa6";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [readingProgress, setReadingProgress] = useState(0);
  const backend = import.meta.env.VITE_BACKEND_URL;

  const loadBlog = async () => {
    try {
      const res = await axios.get(`${backend}/api/blog/${slug}`);
      setBlog(res.data.data);
      loadRelatedBlogs();
    } catch (e) {
      toast.error("Blog not found");
    }
  };

  const loadRelatedBlogs = async () => {
    try {
      const res = await axios.get(`${backend}/api/blog/all`);
      const allBlogs = res.data.data;
      const filtered = allBlogs.filter(b => b.slug !== slug).slice(0, 3);
      setRelatedBlogs(filtered);
    } catch (e) {
      console.log("Failed to load related blogs");
    }
  };

  useEffect(() => {
    loadBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, "");
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const shareOnTwitter = () => {
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(blog.title)}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div lang="en" dir="ltr" className="min-h-screen bg-gray-50">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#AABD05] to-[#0CBF95] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 md:pt-8">
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition mb-4 md:mb-6 cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span className="font-medium text-sm md:text-base">Back to Articles</span>
        </button>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-8 md:pb-12">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 lg:p-12 mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-4 md:mb-6">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-600 mb-6 md:mb-8 pb-6 md:pb-8 border-b">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#AABD05] to-[#0CBF95] rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg">
                {(blog.authorName || blog.authorId?.name || "N").charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm md:text-base">{blog.authorName || blog.authorId?.name || 'Nawaya Team'}</p>
                <p className="text-xs md:text-sm text-gray-500">Author</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base">
              <Calendar size={16} className="md:w-[18px] md:h-[18px]" />
              <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base">
              <Clock size={16} className="md:w-[18px] md:h-[18px]" />
              <span>{getReadingTime(blog.content)}</span>
            </div>
          </div>

          {/* Cover Image */}
          {blog.coverImage && (
            <div className="mb-6 md:mb-8 -mx-5 sm:-mx-6 md:-mx-8 lg:-mx-12">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-auto max-h-[200px] md:max-h-[250px] object-contain rounded-lg md:rounded-2xl mx-auto shadow-sm"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-base max-w-none mx-auto
    prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
    prose-h1:text-2xl prose-h1:mt-8 prose-h1:mb-4
    prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3
    prose-h3:text-lg prose-h3:mt-5 prose-h3:mb-2
    prose-p:text-gray-700 prose-p:leading-7 prose-p:text-base prose-p:my-4
    prose-a:text-green-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
    prose-strong:text-gray-900 prose-strong:font-semibold
    prose-img:rounded-xl prose-img:shadow-sm prose-img:my-6
    prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-green-50 prose-blockquote:text-gray-600 prose-blockquote:italic prose-blockquote:pl-4 prose-blockquote:pr-4 prose-blockquote:py-3 prose-blockquote:my-6 prose-blockquote:rounded-r-lg
    prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4
    prose-li:my-1 prose-li:text-gray-700
    prose-code:px-1.5 prose-code:py-0.5 prose-code:bg-gray-100 prose-code:text-green-700 prose-code:rounded prose-code:text-sm prose-code:font-mono
    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:my-6 prose-pre:text-sm
    prose-hr:my-8 prose-hr:border-gray-200"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Share Section */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Share2 size={18} className="md:w-5 md:h-5" />
                <span className="font-semibold text-sm md:text-base">Share this article:</span>
              </div>
              <div className="flex gap-2 md:gap-3">
                <button
                  onClick={shareOnTwitter}
                  className="p-2.5 md:p-3 rounded-full bg-gray-800 hover:bg-gray-900 text-white transition cursor-pointer"
                  title="Share on Twitter"
                >
                  <FaXTwitter size={16} className="md:w-[18px] md:h-[18px]" />
                </button>
                <button
                  onClick={shareOnFacebook}
                  className="p-2.5 md:p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer"
                  title="Share on Facebook"
                >
                  <Facebook size={16} className="md:w-[18px] md:h-[18px]" />
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="p-2.5 md:p-3 rounded-full bg-blue-700 hover:bg-blue-800 text-white transition cursor-pointer"
                  title="Share on LinkedIn"
                >
                  <Linkedin size={16} className="md:w-[18px] md:h-[18px]" />
                </button>
                <button
                  onClick={copyLink}
                  className="p-2.5 md:p-3 rounded-full bg-gray-600 hover:bg-gray-700 text-white transition cursor-pointer"
                  title="Copy Link"
                >
                  <LinkIcon size={16} className="md:w-[18px] md:h-[18px]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Author Bio Section */}
        <div className="bg-gradient-to-r from-[#F7FAF3] to-[#F0FFF6] rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl flex-shrink-0">
              {(blog.authorName || blog.authorId?.name || "N").charAt(0)}
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                Written by {blog.authorName || blog.authorId?.name || 'Nawaya Team'}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Contributing author at Nawaya, sharing insights and expertise in sustainable agriculture and farming practices.
              </p>
            </div>
          </div>
        </div>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <div
                  key={relatedBlog._id}
                  onClick={() => navigate(`/blog/${relatedBlog.slug}`)}
                  className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group"
                >
                  {relatedBlog.coverImage && (
                    <div className="h-32 sm:h-40 overflow-hidden">
                      <img
                        src={relatedBlog.coverImage}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-base md:text-lg mb-2 text-gray-900 group-hover:text-green-600 transition line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500">
                      {new Date(relatedBlog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogDetail;

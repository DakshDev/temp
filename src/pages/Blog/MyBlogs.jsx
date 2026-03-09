import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Send, FileText, Filter } from "lucide-react";
import { AppContext } from "../../context/AppContext";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const backend = import.meta.env.VITE_BACKEND_URL;

  const loadBlogs = async () => {
    try {
      if (!token) {
        toast.error("Please login first");
        return;
      }
      const res = await axios.get(`${backend}/api/blog/my-blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data.data);
      setFilteredBlogs(res.data.data);
    } catch (e) {
      toast.error("Failed to load blog articles");
    }
  };

  useEffect(() => {
    loadBlogs();
  }, [token]);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter((b) => b.status === statusFilter));
    }
  }, [statusFilter, blogs]);

  const handleEdit = (blog) => {
    navigate("/author/write", { state: { blog } });
  };

  const handleResubmit = async (blogId) => {
    try {
      await axios.patch(
        `${backend}/api/blog/submit/${blogId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Article resubmitted for review!");
      loadBlogs();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resubmit");
    }
  };

  const getBadgeStyle = (status) => {
    const styles = {
      draft: "bg-gray-100 text-gray-700 border-gray-300",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
      published: "bg-green-100 text-green-700 border-green-300",
      rejected: "bg-red-100 text-red-700 border-red-300",
    };
    return styles[status];
  };

  const getStatusIcon = (status) => {
    return status === "draft" ? "📝" : status === "pending" ? "⏳" : status === "published" ? "✅" : "❌";
  };

  const truncateContent = (html, maxLength = 100) => {
    const text = html.replace(/<[^>]*>/g, "");
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div lang="en" dir="ltr">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">My Articles</h1>
              <p className="text-gray-600 mt-2">Manage and track your articles</p>
            </div>
            <button
              onClick={() => navigate("/author/write")}
              className="px-6 py-3 bg-gradient-to-r from-[#AABD05] to-[#0CBF95] text-white rounded-lg font-semibold transition flex items-center gap-2 cursor-pointer hover:opacity-90"
            >
              <FileText size={18} />
              Write New Article
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
            <Filter size={18} className="text-gray-500" />
            <span className="font-semibold text-gray-700">Filter:</span>
            {["all", "draft", "pending", "published", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${statusFilter === status
                  ? "bg-gradient-to-r from-[#AABD05] to-[#0CBF95] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Article Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm mb-1">Total Articles</p>
            <p className="text-3xl font-bold text-gray-900">{blogs.length}</p>
          </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm mb-1">Published</p>
            <p className="text-3xl font-bold text-[#0CBF95]">
              {blogs.filter((b) => b.status === "published").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">
              {blogs.filter((b) => b.status === "pending").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm mb-1">Drafts</p>
            <p className="text-3xl font-bold text-gray-600">
              {blogs.filter((b) => b.status === "draft").length}
            </p>
          </div>
        </div>

        {/* Blog List */}
        <div className="space-y-4">
          {filteredBlogs.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {statusFilter === "all" ? "No articles yet" : `No ${statusFilter} articles`}
              </h3>
              <p className="text-gray-600 mb-6">
                {statusFilter === "all"
                  ? "Start writing your first article!"
                  : `You don't have any ${statusFilter} articles at the moment.`}
              </p>
              {statusFilter === "all" && (
                <button
                  onClick={() => navigate("/author/write")}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition inline-flex items-center gap-2 cursor-pointer"
                >
                  <FileText size={18} />
                  Write Your First Article
                </button>
              )}
            </div>
          ) : (
            filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6"
              >
                <div className="flex gap-6">
                  {/* Cover Image */}
                  {blog.coverImage && (
                    <div className="flex-shrink-0">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-32 h-32 object-contain rounded-lg"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{blog.title}</h2>
                        <p className="text-gray-600 text-sm mb-2">{truncateContent(blog.content)}</p>
                        <p className="text-xs text-gray-400">
                          Last updated: {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-4 py-2 rounded-lg text-sm font-semibold border ${getBadgeStyle(blog.status)}`}>
                          {getStatusIcon(blog.status)} {blog.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-4">
                      {(blog.status === "draft" || blog.status === "rejected") && (
                        <>
                          <button
                            onClick={() => handleEdit(blog)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition cursor-pointer"
                          >
                            <Edit size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleResubmit(blog._id)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#AABD05] to-[#0CBF95] text-white rounded-lg font-medium transition cursor-pointer hover:opacity-90"
                          >
                            <Send size={16} />
                            {blog.status === "rejected" ? "Resubmit" : "Submit for Review"}
                          </button>
                        </>
                      )}
                      {blog.status === "published" && (
                        <button
                          onClick={() => navigate(`/blog/${blog.slug}`)}
                          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition cursor-pointer"
                        >
                          View Published
                        </button>
                      )}
                      {blog.status === "pending" && (
                        <div className="text-sm text-yellow-700 font-medium bg-yellow-50 px-4 py-2 rounded-lg">
                          ⏳ Awaiting admin approval
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>


        
      </div>
    </div>
  );
};

export default MyBlogs;

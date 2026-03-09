import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Eye, CheckCircle, XCircle, Clock, FileText, Trash2, Pencil, Send } from 'lucide-react';
import ConfirmModal from './ConfirmModal';
import AdminBlogUpload from './adminBlogUpload';
import AuthorEditModal from './AuthorEditModal';

const BlogManagement = ({ adminToken }) => {
  const [adminBlog, setAdminBlog] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('pending'); // 'all', 'draft', 'pending', 'published', 'rejected'
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [deletingBlogId, setDeletingBlogId] = useState(null);
  const [pendingDeleteBlogId, setPendingDeleteBlogId] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  
  // Author edit modal state
  const [authorEditBlog, setAuthorEditBlog] = useState(null);
  
  // Publishing state
  const [publishingBlogId, setPublishingBlogId] = useState(null);

  const backend = import.meta.env.VITE_BACKEND_URL;

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      // Fetch all blogs (including pending, rejected, drafts) via admin endpoint
      const res = await axios.get(`${backend}/api/blog/admin/all`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });

      setBlogs(res.data.data || []);
    } catch (e) {
      console.error("Failed to load blogs", e);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const approveBlog = async (blogId) => {
    try {
      setApproving(true);
      const res = await axios.patch(
        `${backend}/api/blog/approve/${blogId}`,
        {},
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      if (res.data.status === 'success') {
        toast.success('Blog approved and published!');
        fetchBlogs();
        setSelectedBlog(null);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to approve blog');
    } finally {
      setApproving(false);
    }
  };

  const rejectBlog = async (blogId) => {
    if (!feedback.trim()) {
      toast.error('Please provide feedback for rejection');
      return;
    }

    try {
      setRejecting(true);
      const res = await axios.patch(
        `${backend}/api/blog/reject/${blogId}`,
        { feedback },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      if (res.data.status === 'success') {
        toast.success('Blog rejected with feedback sent to author');
        fetchBlogs();
        setSelectedBlog(null);
        setFeedback('');
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to reject blog');
    } finally {
      setRejecting(false);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      setDeletingBlogId(blogId);
      const res = await axios.delete(`${backend}/api/admin/blog/${blogId}`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });

      if (res.data?.status === 'success') {
        toast.success(res.data.message || 'Blog deleted successfully');
        fetchBlogs();
        setSelectedBlog(null);
        setPendingDeleteBlogId(null);
      } else {
        toast.error(res.data?.message || 'Failed to delete blog');
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to delete blog');
    } finally {
      setDeletingBlogId(null);
    }
  };

  const publishBlog = async (blogId) => {
    // Find the blog to get its existing cover image
    const blog = blogs.find(b => b._id === blogId);
    
    try {
      setPublishingBlogId(blogId);
      const formData = new FormData();
      formData.append('status', 'published');
      
      // Include existing cover image to prevent deletion
      if (blog?.coverImage) {
        formData.append('existingCoverImage', blog.coverImage);
      }
      
      const res = await axios.patch(
        `${backend}/api/admin/update-blog/${blogId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.data?.status === 'success') {
        toast.success('Blog published successfully!');
        fetchBlogs();
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to publish blog');
    } finally {
      setPublishingBlogId(null);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    if (filter === 'all') return true;
    return blog.status === filter;
  });

  const getStatusBadge = (status) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-700 border-gray-300',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      published: 'bg-green-100 text-green-700 border-green-300',
      rejected: 'bg-red-100 text-red-700 border-red-300',
    };
    return styles[status] || styles.draft;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'published': return <CheckCircle size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return <FileText size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white p-3 sm:p-4 rounded-lg shadow-sm mb-4 sm:mb-6">
        <span className="font-bold text-gray-700 text-sm sm:text-base">Filter:</span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 -mx-1 px-1">
          {['all', 'draft', 'pending', 'published', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition cursor-pointer text-xs sm:text-sm whitespace-nowrap ${filter === status
                ? 'bg-[#94BD1C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'all' && (
                <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-white/30 rounded-full text-xs">
                  {blogs.filter(b => b.status === status).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <button onClick={() => { setEditingBlog(null); setAdminBlog(prev => !prev); }} className='sm:ml-auto mt-2 sm:mt-0'>
          {adminBlog ? <p className='px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white rounded-md text-sm'>Cancel</p> : <p className='px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500 text-white rounded-md text-sm'>Write Article</p>}
        </button>
      </div>

          {adminBlog ? <AdminBlogUpload setAdminBlog={setAdminBlog} blogToEdit={editingBlog} onSaved={fetchBlogs} /> : null}
      {/* Article Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-xs sm:text-sm mb-1">Total Articles</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{blogs.length}</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-xs sm:text-sm mb-1">Drafts</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-600">
            {blogs.filter(b => b.status === 'draft').length}
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-xs sm:text-sm mb-1">Pending</p>
          <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
            {blogs.filter(b => b.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-xs sm:text-sm mb-1">Published</p>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            {blogs.filter(b => b.status === 'published').length}
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm col-span-2 sm:col-span-1">
          <p className="text-gray-500 text-xs sm:text-sm mb-1">Rejected</p>
          <p className="text-2xl sm:text-3xl font-bold text-red-600">
            {blogs.filter(b => b.status === 'rejected').length}
          </p>
        </div>
      </div>

      {/* Blog List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {filteredBlogs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FileText size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-semibold">No {filter === 'all' ? '' : filter} blog articles found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">
                    Blog Article Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-widest">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {blog.coverImage && (
                          <img
                            src={blog.coverImage}
                            alt=""
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <p className="font-bold text-gray-900 line-clamp-1">{blog.title}</p>
                          <p className="text-xs text-gray-500">{blog.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-700">{blog.authorName || blog.authorId?.name || 'Admin'}</p>
                        <button
                          onClick={() => setAuthorEditBlog(blog)}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition cursor-pointer"
                          title="Edit author name"
                        >
                          <Pencil size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border ${getStatusBadge(blog.status)}`}>
                        {getStatusIcon(blog.status)}
                        {blog.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 justify-end">
                        <button
                          onClick={() => setSelectedBlog(blog)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-xs transition cursor-pointer"
                          title="Review"
                        >
                          <Eye size={14} />
                          <span className="hidden sm:inline">Review</span>
                        </button>
                        <button
                          onClick={() => { setEditingBlog(blog); setAdminBlog(true); }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-xs transition cursor-pointer"
                          title="Edit"
                        >
                          <Pencil size={14} />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        {blog.status === 'draft' && (
                          <button
                            onClick={() => publishBlog(blog._id)}
                            disabled={publishingBlogId === blog._id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-xs transition cursor-pointer disabled:opacity-50"
                            title="Publish"
                          >
                            <Send size={14} />
                            <span className="hidden sm:inline">{publishingBlogId === blog._id ? 'Publishing...' : 'Publish'}</span>
                          </button>
                        )}
                        <button
                          onClick={() => setPendingDeleteBlogId(blog._id)}
                          disabled={deletingBlogId === blog._id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-xs transition cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                          <span className="hidden sm:inline">{deletingBlogId === blog._id ? 'Deleting...' : 'Delete'}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Blog Preview Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900 line-clamp-2">{selectedBlog.title}</h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  By {selectedBlog.authorName || selectedBlog.authorId?.name || 'Admin'} • {new Date(selectedBlog.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <button
                  onClick={() => setPendingDeleteBlogId(selectedBlog._id)}
                  disabled={deletingBlogId === selectedBlog._id}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-xs sm:text-sm transition cursor-pointer"
                >
                  <Trash2 size={14} className="inline-block mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">{deletingBlogId === selectedBlog._id ? 'Deleting...' : 'Delete'}</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedBlog(null);
                    setFeedback('');
                  }}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition cursor-pointer text-sm"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {selectedBlog.coverImage && (
                <img
                  src={selectedBlog.coverImage}
                  alt={selectedBlog.title}
                  className="w-full h-auto max-h-48 sm:max-h-64 object-contain rounded-lg sm:rounded-xl mb-4 sm:mb-6"
                />
              )}
              <div
                className="prose prose-sm sm:prose-base max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
              />
            </div>

            {/* Actions */}
            {selectedBlog.status === 'pending' && (
              <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
                <div className="mb-3 sm:mb-4">
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                    Feedback (for rejection only)
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide constructive feedback if rejecting..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-sm"
                    rows="2"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => approveBlog(selectedBlog._id)}
                    disabled={approving || rejecting}
                    className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base"
                  >
                    {approving ? 'Approving...' : '✅ Approve & Publish'}
                  </button>
                  <button
                    onClick={() => rejectBlog(selectedBlog._id)}
                    disabled={approving || rejecting}
                    className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base"
                  >
                    {rejecting ? 'Rejecting...' : '❌ Reject'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!pendingDeleteBlogId}
        title="Confirm Delete"
        message="Are you sure you want to permanently delete this blog article? This action cannot be undone."
        cancelLabel="Cancel"
        confirmLabel="Delete"
        confirmLoading={deletingBlogId === pendingDeleteBlogId}
        onCancel={() => setPendingDeleteBlogId(null)}
        onConfirm={() => {
          const id = pendingDeleteBlogId;
          setPendingDeleteBlogId(null);
          deleteBlog(id);
        }}
      />

      {/* Author Edit Modal */}
      <AuthorEditModal
        blog={authorEditBlog}
        adminToken={adminToken}
        onClose={() => setAuthorEditBlog(null)}
        onSaved={fetchBlogs}
      />
    </div>
  );
};

export default BlogManagement;

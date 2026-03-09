import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthorEditModal = ({ blog, adminToken, onClose, onSaved }) => {
  const [authorName, setAuthorName] = useState('');
  const [saving, setSaving] = useState(false);
  
  const backend = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (blog) {
      setAuthorName(blog.authorName || blog.authorId?.name || '');
    }
  }, [blog]);

  const handleSave = async () => {
    if (!authorName.trim()) {
      toast.error('Please enter an author name');
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append('authorName', authorName.trim());
      
      // IMPORTANT: Include existing cover image to prevent it from being deleted
      if (blog.coverImage) {
        formData.append('existingCoverImage', blog.coverImage);
      }
      
      const res = await axios.patch(
        `${backend}/api/admin/update-blog/${blog._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.data?.status === 'success') {
        toast.success('Author name updated!');
        onSaved();
        onClose();
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to update author');
    } finally {
      setSaving(false);
    }
  };

  if (!blog) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Edit Author Name</h3>
        <p className="text-sm text-gray-600 mb-4">
          Blog: <span className="font-medium line-clamp-1">{blog.title}</span>
        </p>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Enter author name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4"
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition cursor-pointer disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorEditModal;

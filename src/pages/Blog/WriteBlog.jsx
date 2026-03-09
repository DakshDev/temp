import React, { useState, useEffect, useContext } from "react";
import BlogEditor from "../../components/BlogEditor";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { Save, Send, Eye, EyeOff, Image as ImageIcon, X } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import { set } from "zod";

const WriteBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backend = import.meta.env.VITE_BACKEND_URL;
  const { token } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [blogId, setBlogId] = useState(null);
  const [savingDraft, setSavingDraft] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Check if editing existing blog
    if (location.state?.blog) {
      const blog = location.state.blog;
      setTitle(blog.title);
      setCoverImageUrl(blog.coverImage || "");
      setContent(blog.content);
      setEditMode(true);
      setBlogId(blog._id);
    }
  }, [location]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (title.trim() && content.trim()) {
        if (blogId) {
          // Update existing draft
          axios.patch(
            `${backend}/api/blog/update/${blogId}`,
            { title, coverImage: coverImageUrl, content },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else if (!editMode) {
          saveDraftSilently();
        }
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [title, content, editMode, blogId, coverImageUrl, token]);

  const saveDraftSilently = async () => {
    try {
      if (blogId) {
        await axios.patch(
          `${backend}/api/blog/update/${blogId}`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        const res = await axios.post(
          `${backend}/api/blog/create`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBlogId(res.data.data._id);
        setEditMode(true);
      }
    } catch (err) {
      // Silent save, no toast
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ["image/png", "image/jpeg", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Only PNG, JPEG and WEBP images are allowed.");
      return;
    }

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const uploadCoverIfNeeded = async () => {
    if (!coverFile) return coverImageUrl;

    const formData = new FormData();
    formData.append("image", coverFile);

    const res = await axios.post(
      `${backend}/api/blog/upload-image`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setCoverImageUrl(res.data.url);
    setCoverFile(null);
    return res.data.url;
  };

  const saveDraft = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please add title and content");
      return;
    }

    setSavingDraft(true);
    try {

      const imageUrl = await uploadCoverIfNeeded();

      if (blogId) {
        await axios.patch(
          `${backend}/api/blog/update/${blogId}`,
          { title, coverImage: imageUrl, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Article updated");
        // After editing, redirect back to My Articles
        navigate("/author/blog-articles");
      } else {
        const res = await axios.post(
          `${backend}/api/blog/create`,
          { title, coverImage: imageUrl, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Draft saved");
        setBlogId(res.data.data._id);
        setEditMode(true);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save draft");
    } finally {
      setSavingDraft(false);
    }
  };

  const submitForReview = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please add title and content");
      return;
    }

    setSubmitting(true);
    try {

      const imageUrl = await uploadCoverIfNeeded();

      let currentBlogId = blogId;
      if (!currentBlogId) {
        // Create new blog if no draft exists
        const createRes = await axios.post(
          `${backend}/api/blog/create`,
          { title, coverImage: imageUrl, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        currentBlogId = createRes.data?.data?._id;
        setBlogId(currentBlogId);
        setEditMode(true);
      } else {
        // Always update before submit
        await axios.patch(
          `${backend}/api/blog/update/${currentBlogId}`,
          { title, coverImage: imageUrl, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      await axios.patch(
        `${backend}/api/blog/submit/${currentBlogId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Article submitted for review!");
      navigate("/author/blog-articles");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div lang="en" dir="ltr">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {editMode ? "Edit Article" : "Write New Article"}
            </h1>
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
            >
              {isPreview ? <EyeOff size={18} /> : <Eye size={18} />}
              <span>{isPreview ? "Edit" : "Preview"}</span>
            </button>
          </div>

          {!isPreview ? (
            <>
              {/* Title Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full border-2 border-gray-200 rounded-lg p-4 text-xl font-semibold focus:border-green-500 focus:outline-none transition"
                  placeholder="Enter an engaging title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Cover Image */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Image
                </label>
                {(coverPreview || coverImageUrl) ? (
                  <div className="relative">
                    <img
                      src={coverPreview || coverImageUrl}
                      alt="Cover"
                      className="w-full h-auto max-h-64 object-contain rounded-lg"
                    />

                    <button
                      onClick={() => {
                        setCoverFile(null);
                        setCoverPreview("");
                        setCoverImageUrl("");
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition cursor-pointer"
                      title="Remove cover image"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="mb-2 text-sm text-gray-600">
                        <span className="font-semibold">Click to upload</span> cover image
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 1600px)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleCoverChange}
                      disabled={uploading}
                    />
                  </label>
                )}
                {uploading && (
                  <p className="text-sm text-green-600 mt-2">Uploading...</p>
                )}
              </div>

              {/* Content Editor */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content <span className="text-red-500">*</span>
                </label>

                <BlogEditor content={content} setContent={setContent} />
              </div>
            </>
          ) : (
            /* Preview Mode */
            <div className="prose prose-base max-w-none mx-auto
    prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
    prose-h1:text-2xl prose-h1:mt-8 prose-h1:mb-4
    prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3
    prose-h3:text-lg prose-h3:mt-5 prose-h3:mb-2
    prose-p:text-gray-700 prose-p:leading-7 prose-p:text-base prose-p:my-4
    prose-a:text-green-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
    prose-strong:text-gray-900 prose-strong:font-semibold
    prose-img:rounded-xl prose-img:shadow-sm prose-img:my-6 prose-img:w-full prose-img:h-auto
    prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-green-50 prose-blockquote:text-gray-600 prose-blockquote:italic prose-blockquote:pl-4 prose-blockquote:pr-4 prose-blockquote:py-3 prose-blockquote:my-6 prose-blockquote:rounded-r-lg
    prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4
    prose-li:my-1 prose-li:text-gray-700
    prose-code:px-1.5 prose-code:py-0.5 prose-code:bg-gray-100 prose-code:text-green-700 prose-code:rounded prose-code:text-sm prose-code:font-mono
    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:my-6 prose-pre:text-sm
    prose-hr:my-8 prose-hr:border-gray-200">
              {(coverPreview || coverImageUrl) && (
                <img
                  src={coverPreview || coverImageUrl}
                  alt="Cover"
                  className="w-full h-auto max-h-96 object-contain rounded-xl mb-6"
                />
              )}
              <h1 className="text-2xl font-bold mb-4">{title || "Untitled Blog"}</h1>
              <div dangerouslySetInnerHTML={{ __html: content || "<p>No content yet...</p>" }} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t mt-6">
            <button
              onClick={() => navigate("/author/blog-articles")}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 font-semibold hover:bg-gray-50 transition cursor-pointer text-sm sm:text-base order-3 sm:order-1"
              disabled={savingDraft || submitting}
            >
              Cancel
            </button>
            <button
              onClick={saveDraft}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base order-2"
              disabled={savingDraft || submitting}
            >
              <Save size={18} />
              {savingDraft ? "Saving..." : editMode ? "Update Draft" : "Save Draft"}
            </button>
            <button
              onClick={submitForReview}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-[#AABD05] to-[#0CBF95] text-white font-semibold transition sm:ml-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 text-sm sm:text-base order-1 sm:order-3"
              disabled={savingDraft || submitting}
            >
              <Send size={18} />
              {submitting ? "Submitting..." : "Submit For Review"}
            </button>
          </div>
        </div>

        {/* Writing Tips */}
        <div className="bg-gradient-to-r from-[#F7FAF3] to-[#F0FFF6] rounded-xl p-6">
          <h3 className="font-bold text-lg text-gray-900 mb-3">Writing Tips 💡</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Use headings to structure your content and improve readability</li>
            <li>• Add images to make your blog visually appealing</li>
            <li>• Keep paragraphs short and concise</li>
            <li>• Your work is auto-saved every 30 seconds</li>
            <li>• Use the preview mode to see how your blog will look to readers</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;
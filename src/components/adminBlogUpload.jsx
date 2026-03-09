import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BlogEditor from "./BlogEditor";
import { ImageIcon, Send, X } from "lucide-react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const AdminBlogUpload = ({ setAdminBlog, blogToEdit = null, onSaved }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const backend = import.meta.env.VITE_BACKEND_URL;
    const { adminToken } = useContext(AppContext);

    const [title, setTitle] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [content, setContent] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [isPreview, setIsPreview] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [blogId, setBlogId] = useState(null);
    const [savingDraft, setSavingDraft] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState("published");
    const [originalStatus, setOriginalStatus] = useState(null);

    const [coverFile, setCoverFile] = useState(null);
    const [coverPreview, setCoverPreview] = useState("");

    useEffect(() => {
        // Check if editing existing blog via route state or prop
        const blog = location.state?.blog || blogToEdit;
        if (blog) {
            setTitle(blog.title || "");
            setCoverImage(blog.coverImage || "");
            setContent(blog.content || "");
            setAuthorName(blog.authorName || "");
            setStatus(blog.status || "published");
            setOriginalStatus(blog.status || "published");
            setEditMode(true);
            setBlogId(blog._id);
            // Show existing cover image in preview when editing
            if (blog.coverImage) {
                setCoverPreview(blog.coverImage);
            }
        }
    }, [location, blogToEdit]);

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

            // Validate allowed image types
            const allowed = ["image/png", "image/jpeg", "image/webp"];
            if (!allowed.includes(file.type)) {
                toast.error("Only PNG, JPEG and WEBP images are allowed.");
                return;
            }

            setCoverPreview(URL.createObjectURL(file));
            setCoverFile(file);
    };


    const submitHandler = async () => {
        if (!title.trim() || !content.trim()) {
            toast.error("Please add title and content");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        
        // Only send status for new blogs OR drafts/published blogs
        // Pending/rejected blogs should keep their status (handled via approve/reject flow)
        const canChangeStatus = !editMode || originalStatus === "draft" || originalStatus === "published";
        if (canChangeStatus) {
            formData.append("status", status);
        }
        
        if (authorName.trim()) {
            formData.append("authorName", authorName);
        }

        // If a new file was selected, send it as 'coverImage' (file field for multer)
        // Otherwise, send the existing URL in 'existingCoverImage' so backend knows to keep it
        if (coverFile) {
            formData.append("coverImage", coverFile);
        } else if (coverImage) {
            // No new file, but we have an existing image URL - tell backend to keep it
            formData.append("existingCoverImage", coverImage);
        }

        try {
            setSubmitting(true);

            if (editMode && blogId) {

                await axios.patch(
                    `${backend}/api/admin/update-blog/${blogId}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${adminToken}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                toast.success("Article updated successfully!");
            } else {

                await axios.post(
                    `${backend}/api/admin/create-blog`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${adminToken}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                toast.success("Article created successfully!");
            }

            // reset and notify parent
            setCoverPreview("");
            setCoverFile(null);
            setTitle("");
            setContent("");
            setAuthorName("");
            setStatus("published");
            setOriginalStatus(null);
            setEditMode(false);
            setBlogId(null);
            setAdminBlog(false);
            if (typeof onSaved === "function") onSaved();

        } catch (err) {
            console.error(err);
            toast.error("Failed to submit");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Article Title <span className="text-red-500">*</span>
                </label>
                <input
                    className="w-full border-2 border-gray-200 rounded-lg p-4 text-xl font-semibold focus:border-green-500 focus:outline-none transition bg-white"
                    placeholder="Enter an engaging title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* Author Name */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Author Name
                </label>
                <input
                    className="w-full border-2 border-gray-200 rounded-lg p-4 focus:border-green-500 focus:outline-none transition bg-white"
                    placeholder="Enter author name (optional, defaults to admin)"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                />
            </div>

            {/* Status Toggle - only show for new blogs or draft/published blogs */}
            {(!editMode || originalStatus === "draft" || originalStatus === "published") ? (
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Status
                    </label>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setStatus("draft")}
                            className={`px-5 py-2.5 rounded-lg font-medium transition cursor-pointer ${
                                status === "draft"
                                    ? "bg-gray-700 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            📝 Save as Draft
                        </button>
                        <button
                            type="button"
                            onClick={() => setStatus("published")}
                            className={`px-5 py-2.5 rounded-lg font-medium transition cursor-pointer ${
                                status === "published"
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            🚀 Publish
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Status
                    </label>
                    <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium ${
                        originalStatus === "pending" 
                            ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                            : "bg-red-100 text-red-700 border border-red-300"
                    }`}>
                        {originalStatus === "pending" ? "⏳ Pending Review" : "❌ Rejected"}
                        <span className="text-xs opacity-75">(use approve/reject to change)</span>
                    </div>
                </div>
            )}

            {/* Cover Image */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cover Image
                </label>
                {coverPreview ? (
                    <div className="mt-3 relative">
                        <img
                            src={coverPreview}
                            alt="Cover Preview"
                            className="w-full h-auto max-h-64 object-contain rounded-lg"
                        />
                        <button onClick={() => {
                            setCoverPreview("");
                            setCoverFile(null);
                            setCoverImage(""); // Clear existing image URL too (will delete from cloudinary on save)
                        }}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition cursor-pointer"
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

            <button
                onClick={submitHandler}
                className={`flex mb-10 items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition ml-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                    (originalStatus === "pending" || originalStatus === "rejected")
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : status === "draft" 
                            ? "bg-gray-700 hover:bg-gray-800" 
                            : "bg-green-600 hover:bg-green-700"
                }`}
                disabled={savingDraft || submitting}
            >
                <Send size={18} />
                {submitting
                    ? "Saving..."
                    : editMode
                        ? (originalStatus === "pending" || originalStatus === "rejected")
                            ? "Save Changes"
                            : status === "draft"
                                ? "Save Draft"
                                : "Update & Publish"
                        : status === "draft"
                            ? "Save as Draft"
                            : "Publish Article"
                }
            </button>
        </>
    )
};



export default AdminBlogUpload;
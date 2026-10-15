import React, { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, Edit, Trash2, Plus, X, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import adminService from '../../services/adminService.js';

const emptyForm = { title: '', excerpt: '', postUrl: '', imageUrl: '', publishedDate: '', isPublished: true };

// Mirrors AdminAssessmentManager's manage-table + modal pattern. There's no "upload" tab here
// since a blog post card is just a handful of fields the admin fills in directly — the post
// content itself lives on Blogger, this only manages the card that links out to it.
const AdminBlogManager = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [editingPost, setEditingPost] = useState(null); // null = closed, {} = new, {...} = editing
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            setLoading(true);
            const data = await adminService.getAllBlogPosts();
            setPosts(data.data || []);
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Failed to load blog posts');
        } finally {
            setLoading(false);
        }
    };

    const toDateInputValue = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (Number.isNaN(d.getTime())) return '';
        return d.toISOString().slice(0, 10);
    };

    const openNew = () => {
        setEditingPost({});
        setForm({ ...emptyForm, publishedDate: toDateInputValue(new Date()) });
    };

    const openEdit = (post) => {
        setEditingPost(post);
        setForm({
            title: post.title || '',
            excerpt: post.excerpt || '',
            postUrl: post.postUrl || '',
            imageUrl: post.imageUrl || '',
            publishedDate: toDateInputValue(post.publishedDate),
            isPublished: post.isPublished !== false
        });
    };

    const closeModal = () => {
        setEditingPost(null);
        setForm(emptyForm);
    };

    const handleSave = async () => {
        if (!form.title.trim() || !form.postUrl.trim()) {
            setError('Title and the blog post URL are both required');
            return;
        }
        try {
            setSaving(true);
            setError('');
            const payload = {
                title: form.title.trim(),
                excerpt: form.excerpt.trim(),
                postUrl: form.postUrl.trim(),
                imageUrl: form.imageUrl.trim(),
                publishedDate: form.publishedDate || undefined,
                isPublished: form.isPublished
            };
            if (editingPost?._id) {
                await adminService.updateBlogPost(editingPost._id, payload);
                setSuccess('Blog post updated successfully');
            } else {
                await adminService.createBlogPost(payload);
                setSuccess('Blog post added successfully');
            }
            closeModal();
            loadPosts();
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Failed to save blog post');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (post) => {
        if (!window.confirm(`Delete "${post.title}"? This only removes the card — nothing on Blogger is affected.`)) {
            return;
        }
        try {
            await adminService.deleteBlogPost(post._id);
            setSuccess('Blog post deleted successfully');
            loadPosts();
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Failed to delete blog post');
        }
    };

    return (
        <div className="bg-transparent text-[var(--text-main)]">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Blog Posts</h2>
                    <p className="text-slate-500 font-medium">Add a card for each post you publish on Blogger — it links straight out to it.</p>
                </div>
                <button
                    onClick={openNew}
                    className="btn bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add Post</span>
                </button>
            </div>

            {success && (
                <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center text-emerald-600 animate-in fade-in slide-in-from-top-2">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>{success}</span>
                    <button onClick={() => setSuccess('')} className="ml-auto hover:text-slate-900">×</button>
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center text-red-500 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{error}</span>
                    <button onClick={() => setError('')} className="ml-auto hover:text-slate-900">×</button>
                </div>
            )}

            {/* List */}
            <div className="bg-white/80 backdrop-blur-md rounded-xl border border-[var(--card-border)] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-slate-600">
                        <thead className="bg-slate-50/80 text-slate-900 uppercase text-[10px] font-black tracking-widest">
                            <tr>
                                <th className="px-6 py-5">Title</th>
                                <th className="px-6 py-4">Published</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                                        <p className="text-slate-500">Loading blog posts...</p>
                                    </td>
                                </tr>
                            ) : posts.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                                        <Newspaper className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                        <p>No blog posts yet</p>
                                        <button
                                            onClick={openNew}
                                            className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
                                        >
                                            Add your first post
                                        </button>
                                    </td>
                                </tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{post.title}</div>
                                            <div className="text-xs text-slate-500 mt-1 truncate max-w-[280px] font-medium">{post.excerpt}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString() : '—'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.isPublished
                                                ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                                                : 'bg-slate-200/60 text-slate-500 border border-slate-300'
                                                }`}>
                                                {post.isPublished ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <a
                                                    href={post.postUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                    title="Open post on Blogger"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                                <button
                                                    onClick={() => openEdit(post)}
                                                    className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit modal */}
            {editingPost && (
                <div className="fixed inset-0 z-[100] bg-slate-900/55 backdrop-blur-sm flex items-center justify-center px-4" onClick={closeModal}>
                    <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-base font-black text-slate-900">
                                {editingPost?._id ? 'Edit Blog Post' : 'Add Blog Post'}
                            </h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
                        </div>

                        <label className="text-[11px] font-black uppercase tracking-wide text-slate-400 mb-1.5 block">Title *</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                            placeholder="How We Cut Prompt Costs by 40%"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 mb-4"
                        />

                        <label className="text-[11px] font-black uppercase tracking-wide text-slate-400 mb-1.5 block">Blog Post URL *</label>
                        <input
                            type="url"
                            value={form.postUrl}
                            onChange={e => setForm(f => ({ ...f, postUrl: e.target.value }))}
                            placeholder="https://yourblog.blogspot.com/2026/10/your-post.html"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 mb-4"
                        />
                        <p className="text-[11px] text-slate-400 font-medium -mt-3 mb-4">
                            The full link to the published post — this is what the card on /blog opens.
                        </p>

                        <label className="text-[11px] font-black uppercase tracking-wide text-slate-400 mb-1.5 block">Excerpt</label>
                        <textarea
                            value={form.excerpt}
                            onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                            rows={2}
                            maxLength={400}
                            placeholder="A short teaser shown on the card"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 mb-4 resize-none"
                        />

                        <label className="text-[11px] font-black uppercase tracking-wide text-slate-400 mb-1.5 block">Image URL</label>
                        <input
                            type="text"
                            value={form.imageUrl}
                            onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                            placeholder="https://..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 mb-4"
                        />
                        {form.imageUrl && (
                            <img
                                src={form.imageUrl}
                                alt="Preview"
                                className="w-full h-28 object-cover rounded-lg mb-4 border border-slate-200"
                                onError={e => { e.target.style.display = 'none'; }}
                            />
                        )}

                        <label className="text-[11px] font-black uppercase tracking-wide text-slate-400 mb-1.5 block">Published Date</label>
                        <input
                            type="date"
                            value={form.publishedDate}
                            onChange={e => setForm(f => ({ ...f, publishedDate: e.target.value }))}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 mb-4"
                        />

                        <label className="flex items-center gap-2 mb-5 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.isPublished}
                                onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))}
                                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400"
                            />
                            <span className="text-sm font-semibold text-slate-700">Published (visible on the public Blog page)</span>
                        </label>

                        <div className="flex gap-2">
                            <button
                                onClick={closeModal}
                                className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving || !form.title.trim() || !form.postUrl.trim()}
                                className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition-colors flex items-center justify-center gap-1.5"
                            >
                                {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                                {editingPost?._id ? 'Save Changes' : 'Add Post'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBlogManager;

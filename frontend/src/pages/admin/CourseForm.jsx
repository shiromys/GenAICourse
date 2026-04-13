import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adminService from '../../services/adminService.js';
import { toast } from 'react-toastify';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

const CourseForm = ({ isEditing = false }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        level: 'Beginner',
        thumbnail: '',
        price: 0,
        isPublished: false,
        whatYoullLearn: [''],
        requirements: [''],
        tags: ['']
    });

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(isEditing);

    useEffect(() => {
        if (isEditing && id) {
            fetchCourse();
        }
    }, [isEditing, id]);

    const fetchCourse = async () => {
        try {
            const response = await adminService.getCourse(id);
            const course = response.data;
            setFormData({
                title: course.title || '',
                description: course.description || '',
                category: course.category || '',
                level: course.level || 'Beginner',
                thumbnail: course.thumbnail || '',
                price: course.price || 0,
                isPublished: course.isPublished || false,
                whatYoullLearn: course.whatYoullLearn?.length > 0 ? course.whatYoullLearn : [''],
                requirements: course.requirements?.length > 0 ? course.requirements : [''],
                tags: course.tags?.length > 0 ? course.tags : ['']
            });

        } catch (error) {
            toast.error('Failed to load course data');
            navigate('/admin/dashboard');
        } finally {
            setFetchLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleArrayChange = (field, index, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    const addArrayItem = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const removeArrayItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const cleanedData = {
                ...formData,
                whatYoullLearn: formData.whatYoullLearn.filter(item => item.trim()),
                requirements: formData.requirements.filter(item => item.trim()),
                tags: formData.tags.filter(item => item.trim())
            };

            if (isEditing) {
                await adminService.updateCourse(id, cleanedData);
                toast.success('Course updated successfully');
            } else {
                await adminService.createCourse(cleanedData);
                toast.success('Course created successfully');
            }

            navigate('/admin/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save course');
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="section min-h-screen flex items-center justify-center theme-beige bg-[var(--bg-main)] text-[var(--text-main)]">
                <div className="loading w-12 h-12" />
            </div>
        );
    }

    return (
        <div className="section min-h-screen theme-beige bg-[var(--bg-main)] text-[var(--text-main)]">
            <div className="container max-w-4xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2 font-bold text-slate-700"
                        >
                            <FaArrowLeft className="text-slate-600" /> Back to Dashboard
                        </button>
                        <h1 className="text-3xl font-black text-slate-900 font-heading">
                            {isEditing ? 'Edit Course' : 'Create New Course'}
                        </h1>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-[var(--card-border)] shadow-sm p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2 font-heading">
                                Course Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-white border border-slate-200 rounded-lg py-3 px-4 text-slate-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                                placeholder="Enter course title"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2 font-heading">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full bg-white border border-slate-200 rounded-lg py-3 px-4 text-slate-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                                placeholder="Enter course description"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 font-heading">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-white border border-slate-200 rounded-lg py-3 px-4 text-slate-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="AI/ML">AI & Machine Learning</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Cloud Computing">Cloud Computing</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Level */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 font-heading">
                                Difficulty Level *
                            </label>
                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                className="w-full bg-white border border-slate-200 rounded-lg py-3 px-4 text-slate-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                                required
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>

                        {/* Thumbnail URL */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2 font-heading">
                                Thumbnail URL
                            </label>
                            <input
                                type="text"
                                name="thumbnail"
                                value={formData.thumbnail}
                                onChange={handleChange}
                                className="w-full bg-white border border-slate-200 rounded-lg py-3 px-4 text-slate-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                                placeholder="/images/courses/my-course.jpg or https://example.com/image.jpg"
                            />
                            {formData.thumbnail && (
                                <img
                                    src={formData.thumbnail}
                                    alt="Thumbnail preview"
                                    className="mt-3 h-40 w-full object-cover rounded-lg border border-slate-200"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            )}
                            <p className="mt-1 text-xs text-slate-500">
                                Use a relative path like <code className="text-amber-600 font-bold">/images/courses/filename.jpg</code> for images stored in the app, or paste any public image URL.
                            </p>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 font-heading">
                                Price (USD)
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                className="w-full bg-white border border-slate-200 rounded-lg py-3 px-4 text-slate-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                                placeholder="0.00"
                            />
                        </div>

                        {/* What You'll Learn */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2 font-heading">
                                What You'll Learn
                            </label>
                            {formData.whatYoullLearn.map((item, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => handleArrayChange('whatYoullLearn', index, e.target.value)}
                                        className="flex-1 bg-white border border-slate-200 rounded-lg py-2 px-3 text-slate-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                                        placeholder="Learning objective"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('whatYoullLearn', index)}
                                        className="text-red-500 hover:text-red-700 px-2 font-bold"
                                        disabled={formData.whatYoullLearn.length === 1}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem('whatYoullLearn')}
                                className="text-amber-600 hover:text-amber-700 font-bold text-sm transition-colors"
                            >
                                + Add learning objective
                            </button>
                        </div>

                        {/* Requirements */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2 font-heading">
                                Requirements
                            </label>
                            {formData.requirements.map((item, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                                        className="flex-1 bg-white border border-slate-200 rounded-lg py-2 px-3 text-slate-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                                        placeholder="Course requirement"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('requirements', index)}
                                        className="text-red-500 hover:text-red-700 px-2 font-bold"
                                        disabled={formData.requirements.length === 1}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem('requirements')}
                                className="text-amber-600 hover:text-amber-700 font-bold text-sm transition-colors"
                            >
                                + Add requirement
                            </button>
                        </div>

                        {/* Tags */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2 font-heading">
                                Tags
                            </label>
                            {formData.tags.map((tag, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={tag}
                                        onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                                        className="flex-1 bg-white border border-slate-200 rounded-lg py-2 px-3 text-slate-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                                        placeholder="course-tag"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('tags', index)}
                                        className="text-red-500 hover:text-red-700 px-2 font-bold"
                                        disabled={formData.tags.length === 1}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem('tags')}
                                className="text-amber-600 hover:text-amber-700 font-bold text-sm transition-colors"
                            >
                                + Add tag
                            </button>
                        </div>

                        {/* Published Status */}
                        <div className="md:col-span-2">
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="isPublished"
                                    checked={formData.isPublished}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-amber-600 bg-white border-slate-300 rounded focus:ring-amber-500 focus:ring-2 transition-colors cursor-pointer"
                                />
                                <span className="text-sm font-bold text-slate-700">
                                    Publish course (make it visible to users)
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/dashboard')}
                            className="btn bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold px-6 py-2.5 rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
                            disabled={loading}
                        >
                            {loading ? <div className="loading w-4 h-4" /> : <FaSave />}
                            {isEditing ? 'Update Course' : 'Create Course'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseForm;
import React, { useState, useEffect } from 'react';
import { Upload, FileText, Download, AlertCircle, CheckCircle, Eye, Edit, Trash2, Plus, X, Loader2, UserPlus } from 'lucide-react';
import assessmentUploadService from '../../services/assessmentUploadService.js';
import adminService from '../../services/adminService.js';

const AdminAssessmentManager = () => {
    const [activeTab, setActiveTab] = useState('manage');
    const [assessments, setAssessments] = useState([]);
    const [template, setTemplate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [jsonInput, setJsonInput] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [courses, setCourses] = useState([]);

    // ── View modal: full quiz detail + per-user attempt-grant control ──────
    // The Eye/Edit/Delete row actions used to be Eye+Edit with no onClick at
    // all (Delete was the only one wired up) — clicking them visibly did
    // nothing. This state backs the two modals that make them real.
    const [viewingAssessment, setViewingAssessment] = useState(null); // merged summary + full quiz detail
    const [viewLoading, setViewLoading] = useState(false);
    const [enrolledUsers, setEnrolledUsers] = useState([]);
    const [grantUserId, setGrantUserId] = useState('');
    const [grantReason, setGrantReason] = useState('');
    const [granting, setGranting] = useState(false);

    // ── Edit modal: quiz settings (title/description/timing/attempts/pass/status) ──
    const [editingAssessment, setEditingAssessment] = useState(null);
    const [editForm, setEditForm] = useState({ title: '', description: '', timeLimit: 60, maxAttempts: 3, passingScore: 80, isActive: true });
    const [savingEdit, setSavingEdit] = useState(false);

    useEffect(() => {
        loadAssessments();
        loadTemplate();
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            const data = await adminService.getAllCourses();
            setCourses(data.data || []);
        } catch (error) {
            console.error('Failed to load courses:', error);
        }
    };

    const loadAssessments = async () => {
        try {
            setLoading(true);
            const data = await assessmentUploadService.getInstructorAssessments();
            setAssessments(data.assessments);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const loadTemplate = async () => {
        try {
            const data = await assessmentUploadService.getTemplate();
            setTemplate(data.template);
        } catch (error) {
            console.error('Failed to load template:', error);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setError('');
        }
    };

    const handleFileImport = async () => {
        if (!selectedFile) {
            setError('Please select a file to import');
            return;
        }

        try {
            setUploading(true);
            setError('');

            const result = await assessmentUploadService.importFromFile(selectedFile, selectedCourse);
            setSuccess('Assessment imported successfully!');
            setSelectedFile(null);
            loadAssessments();
            setActiveTab('manage');

            // Reset file input
            const fileInput = document.getElementById('fileInput');
            if (fileInput) fileInput.value = '';
        } catch (error) {
            setError(error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleJsonUpload = async () => {
        if (!jsonInput.trim()) {
            setError('Please enter assessment JSON data');
            return;
        }

        try {
            const assessmentData = JSON.parse(jsonInput);
            setUploading(true);
            setError('');

            const result = await assessmentUploadService.uploadAssessment(assessmentData, selectedCourse);
            setSuccess('Assessment uploaded successfully!');
            setJsonInput('');
            loadAssessments();
            setActiveTab('manage');
        } catch (error) {
            if (error instanceof SyntaxError) {
                setError('Invalid JSON format. Please check your data.');
            } else {
                setError(error.message);
            }
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteAssessment = async (assessmentId) => {
        if (!window.confirm('Are you sure you want to delete this assessment?')) {
            return;
        }

        try {
            await assessmentUploadService.deleteAssessment(assessmentId);
            setSuccess('Assessment deleted successfully');
            loadAssessments();
        } catch (error) {
            setError(error.message);
        }
    };

    // ── View ─────────────────────────────────────────────────────────────
    const handleView = async (assessment) => {
        setViewingAssessment({ ...assessment, questions: null });
        setViewLoading(true);
        setEnrolledUsers([]);
        setGrantUserId('');
        setGrantReason('');
        try {
            const quizRes = await adminService.getQuiz(assessment.id);
            setViewingAssessment(prev => (prev ? { ...prev, ...quizRes.data } : prev));
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Failed to load assessment details');
        } finally {
            setViewLoading(false);
        }

        // The grant-attempt control only makes sense once we know who's enrolled —
        // quizAttemptGrants lives on each learner's UserProgress for this course.
        if (assessment.courseId) {
            try {
                const enrollRes = await adminService.getCourseEnrollments(assessment.courseId);
                setEnrolledUsers((enrollRes.data || []).filter(e => e.userId));
            } catch (error) {
                console.error('Failed to load course enrollments:', error);
            }
        }
    };

    const closeView = () => {
        setViewingAssessment(null);
        setEnrolledUsers([]);
        setGrantUserId('');
        setGrantReason('');
    };

    const handleGrantAttempt = async () => {
        if (!grantUserId || !viewingAssessment?.courseId) return;
        const courseIdValue = typeof viewingAssessment.courseId === 'object' ? viewingAssessment.courseId._id : viewingAssessment.courseId;
        try {
            setGranting(true);
            const res = await adminService.grantQuizAttempt(grantUserId, courseIdValue, grantReason);
            setSuccess(res.message);
            setGrantUserId('');
            setGrantReason('');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to grant attempt');
        } finally {
            setGranting(false);
        }
    };

    // ── Edit ─────────────────────────────────────────────────────────────
    const handleEdit = (assessment) => {
        setEditingAssessment(assessment);
        setEditForm({
            title: assessment.title || '',
            description: assessment.description || '',
            timeLimit: assessment.timeLimit || 60,
            maxAttempts: assessment.maxAttempts || 3,
            passingScore: assessment.passingScore || 80,
            isActive: assessment.isActive !== false
        });
    };

    const closeEdit = () => setEditingAssessment(null);

    const handleSaveEdit = async () => {
        if (!editingAssessment) return;
        try {
            setSavingEdit(true);
            await assessmentUploadService.updateAssessment(editingAssessment.id, {
                title: editForm.title,
                description: editForm.description,
                timeLimit: Number(editForm.timeLimit),
                maxAttempts: Number(editForm.maxAttempts),
                passingScore: Number(editForm.passingScore),
                isPublished: editForm.isActive
            });
            setSuccess('Assessment updated successfully');
            closeEdit();
            loadAssessments();
        } catch (error) {
            setError(error.message || 'Failed to update assessment');
        } finally {
            setSavingEdit(false);
        }
    };

    const downloadTemplate = () => {
        if (template) {
            const dataStr = JSON.stringify(template, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

            const exportFileDefaultName = 'assessment-template.json';

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        }
    };

    const downloadCSVTemplate = () => {
        const csvTemplate = `Question,Option1,Option2,Option3,Option4,CorrectAnswer,Points,Explanation
"What is React?","A library","A framework","A database","An OS","A library","5","React is a JavaScript library for building user interfaces"
"What is Node.js?","Runtime","Language","Database","Browser","Runtime","5","Node.js is a JavaScript runtime built on Chrome's V8 engine"`;

        const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvTemplate);
        const exportFileDefaultName = 'assessment-template.csv';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    return (
        <div className="bg-transparent text-[var(--text-main)]">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Assessments</h2>
                    <p className="text-slate-500 font-medium">Manage and upload course assessments</p>
                </div>
                {activeTab === 'manage' && (
                    <button
                        onClick={() => setActiveTab('upload')}
                        className="btn bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Upload New</span>
                    </button>
                )}
                {activeTab === 'upload' && (
                    <button
                        onClick={() => setActiveTab('manage')}
                        className="btn bg-slate-700 hover:bg-slate-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                    >
                        <span>Cancel</span>
                    </button>
                )}
            </div>

            {/* Success/Error Messages */}
            {success && (
                <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center text-emerald-400 animate-in fade-in slide-in-from-top-2">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>{success}</span>
                    <button onClick={() => setSuccess('')} className="ml-auto hover:text-white">×</button>
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center text-red-400 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{error}</span>
                    <button onClick={() => setError('')} className="ml-auto hover:text-white">×</button>
                </div>
            )}

            {/* Tabs Content */}
            {activeTab === 'upload' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">

                    {/* Course Selection */}
                    <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-[var(--card-border)] shadow-sm">
                        <label className="block text-sm font-bold text-slate-700 mb-2 font-heading">
                            Select Course (Optional)
                        </label>
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        >
                            <option value="">-- Don't link to a course yet --</option>
                            {courses.map(course => (
                                <option key={course._id || course.id} value={course._id || course.id}>
                                    {course.title}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-slate-500 mt-2">
                            If selected, the assessment will be automatically linked to this course.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Wrapper for two columns */}

                        {/* File Upload Column */}
                        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-[var(--card-border)] shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center font-heading">
                                <Upload className="mr-2 h-5 w-5 text-blue-600" />
                                File Upload
                            </h3>
                            <div className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-lg p-8 text-center transition-colors bg-slate-50/50">
                                <Upload className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                                <div className="mb-4">
                                    <label htmlFor="fileInput" className="cursor-pointer block">
                                        <span className="text-blue-400 hover:text-blue-300 font-medium">Click to upload</span>
                                        <span className="text-slate-400"> or drag and drop</span>
                                    </label>
                                    <p className="text-xs text-slate-500 mt-1">JSON or CSV files up to 5MB</p>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        className="hidden"
                                        accept=".json,.csv"
                                        onChange={handleFileUpload}
                                    />
                                </div>

                                {selectedFile && (
                                    <div className="mb-4 p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FileText className="h-5 w-5 text-blue-600 mr-2" />
                                            <span className="text-sm text-slate-700 font-medium">{selectedFile.name}</span>
                                        </div>
                                        <button onClick={() => setSelectedFile(null)} className="text-slate-400 hover:text-slate-900 transition-colors">×</button>
                                    </div>
                                )}

                                <button
                                    onClick={handleFileImport}
                                    disabled={!selectedFile || uploading}
                                    className={`w-full py-2 rounded-lg font-medium transition-colors ${!selectedFile || uploading
                                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }`}
                                >
                                    {uploading ? 'Importing...' : 'Import File'}
                                </button>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-700">
                                <h4 className="text-sm font-semibold text-slate-300 mb-3">Download Templates</h4>
                                <div className="flex gap-3">
                                    <button
                                        onClick={downloadTemplate}
                                        className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white flex items-center justify-center gap-2 transition-colors border border-slate-600"
                                    >
                                        <Download className="h-4 w-4" /> JSON
                                    </button>
                                    <button
                                        onClick={downloadCSVTemplate}
                                        className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white flex items-center justify-center gap-2 transition-colors border border-slate-600"
                                    >
                                        <Download className="h-4 w-4" /> CSV
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* JSON Input Column */}
                        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-[var(--card-border)] shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center font-heading">
                                <FileText className="mr-2 h-5 w-5 text-blue-600" />
                                Paste JSON
                            </h3>
                            <div className="relative">
                                <textarea
                                    value={jsonInput}
                                    onChange={(e) => setJsonInput(e.target.value)}
                                    placeholder={`{
  "title": "My Assessment",
  "questions": [...]
}`}
                                    className="w-full h-[320px] bg-white border border-slate-200 rounded-lg p-4 font-mono text-sm text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none transition-all"
                                />
                                <div className="absolute bottom-4 right-4">
                                    <button
                                        onClick={handleJsonUpload}
                                        disabled={!jsonInput.trim() || uploading}
                                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${!jsonInput.trim() || uploading
                                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20'
                                            }`}
                                    >
                                        {uploading ? 'Uploading...' : 'Upload JSON'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'manage' && (
                <div className="bg-white/80 backdrop-blur-md rounded-xl border border-[var(--card-border)] overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-slate-600">
                            <thead className="bg-slate-50/80 text-slate-900 uppercase text-[10px] font-black tracking-widest">
                                <tr>
                                    <th className="px-6 py-5">Title</th>
                                    <th className="px-6 py-4">Course</th>
                                    <th className="px-6 py-4">Stats</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                                            <p className="text-slate-500">Loading assessments...</p>
                                        </td>
                                    </tr>
                                ) : assessments.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                            <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                            <p>No assessments found</p>
                                            <button
                                                onClick={() => setActiveTab('upload')}
                                                className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium"
                                            >
                                                Upload your first assessment
                                            </button>
                                        </td>
                                    </tr>
                                ) : (
                                    assessments.map((assessment) => (
                                        <tr key={assessment.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{assessment.title}</div>
                                                <div className="text-xs text-slate-500 mt-1 truncate max-w-[200px] font-medium">{assessment.description}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {assessment.courseTitle ? (
                                                    <span className="text-blue-600 font-bold">{assessment.courseTitle}</span>
                                                ) : (
                                                    <span className="text-slate-400 italic">Not linked</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex flex-col gap-1">
                                                    <span className="flex items-center gap-2">
                                                        <FileText className="w-3 h-3" /> {assessment.questionCount} Qs
                                                    </span>
                                                    <span className="text-slate-500">
                                                        {assessment.timeLimit} mins • {assessment.passingScore}% pass
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${assessment.isActive
                                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                    : 'bg-slate-600/30 text-slate-400 border border-slate-600'
                                                    }`}>
                                                    {assessment.isActive ? 'Active' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleView(assessment)}
                                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                        title="View"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(assessment)}
                                                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteAssessment(assessment.id)}
                                                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
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
            )}

            {/* ── View modal ───────────────────────────────────────────── */}
            {viewingAssessment && (
                <div className="fixed inset-0 z-[100] bg-slate-900/55 backdrop-blur-sm flex items-center justify-center px-4" onClick={closeView}>
                    <div
                        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl border border-slate-200 shadow-2xl p-6"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between mb-1">
                            <h3 className="text-lg font-black text-slate-900">{viewingAssessment.title}</h3>
                            <button onClick={closeView} className="text-slate-400 hover:text-slate-600 flex-shrink-0"><X size={18} /></button>
                        </div>
                        <p className="text-sm text-slate-500 font-medium mb-5">{viewingAssessment.description || 'No description'}</p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                            <div className="bg-slate-50 rounded-xl p-3 text-center">
                                <div className="text-lg font-black text-slate-900">{viewingAssessment.questionCount ?? viewingAssessment.questions?.length ?? '—'}</div>
                                <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Questions</div>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-3 text-center">
                                <div className="text-lg font-black text-slate-900">{viewingAssessment.timeLimit}m</div>
                                <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Time Limit</div>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-3 text-center">
                                <div className="text-lg font-black text-slate-900">{viewingAssessment.passingScore}%</div>
                                <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">To Pass</div>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-3 text-center">
                                <div className="text-lg font-black text-slate-900">{viewingAssessment.maxAttempts}</div>
                                <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Max Attempts</div>
                            </div>
                        </div>

                        {/* Questions */}
                        <div className="mb-6">
                            <h4 className="text-xs font-black uppercase tracking-wide text-slate-400 mb-3">Questions</h4>
                            {viewLoading ? (
                                <div className="flex items-center gap-2 text-slate-400 text-sm py-4"><Loader2 className="h-4 w-4 animate-spin" /> Loading questions…</div>
                            ) : viewingAssessment.questions?.length ? (
                                <div className="space-y-3">
                                    {viewingAssessment.questions.map((q, i) => (
                                        <div key={q._id || i} className="border border-slate-100 rounded-xl p-3">
                                            <p className="text-sm font-bold text-slate-800 mb-2">{i + 1}. {q.question}</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {q.options?.map((opt, oi) => {
                                                    const text = typeof opt === 'string' ? opt : opt.text;
                                                    const isCorrect = typeof opt === 'object'
                                                        ? opt.isCorrect
                                                        : text === q.correctAnswer;
                                                    return (
                                                        <span
                                                            key={oi}
                                                            className={`text-xs px-2.5 py-1 rounded-lg font-semibold ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}
                                                        >
                                                            {text}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-400">No question detail available.</p>
                            )}
                        </div>

                        {/* Grant an extra attempt — same action as the Users panel's access-grant
                            modal, surfaced here too since this is where an admin naturally looks
                            when a specific assessment's attempt limit comes up. */}
                        <div className="pt-5 border-t border-slate-100">
                            <h4 className="text-xs font-black uppercase tracking-wide text-slate-400 mb-1.5 flex items-center gap-1.5">
                                <UserPlus className="h-3.5 w-3.5" /> Grant a learner +1 attempt
                            </h4>
                            {!viewingAssessment.courseId ? (
                                <p className="text-xs font-semibold text-amber-600">This assessment isn't linked to a course yet — link it from Courses first.</p>
                            ) : (
                                <>
                                    <p className="text-xs text-slate-500 font-medium mb-3">
                                        Once a learner has used all {viewingAssessment.maxAttempts} attempts, they're blocked from starting another — grant one extra here. Each grant is logged with your admin account, today's date, and an optional reason.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-2 mb-2">
                                        <select
                                            value={grantUserId}
                                            onChange={e => setGrantUserId(e.target.value)}
                                            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400"
                                        >
                                            <option value="">
                                                {enrolledUsers.length === 0 ? 'No enrolled learners found' : 'Select a learner…'}
                                            </option>
                                            {enrolledUsers.map(e => (
                                                <option key={e.userId?._id || e._id} value={e.userId?._id}>
                                                    {e.userId?.name} ({e.userId?.email}){e.quizAttemptGrants?.length ? ` — ${e.quizAttemptGrants.length} grant${e.quizAttemptGrants.length === 1 ? '' : 's'} so far` : ''}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            disabled={!grantUserId || granting}
                                            onClick={handleGrantAttempt}
                                            className="btn bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex-shrink-0 flex items-center justify-center gap-1.5"
                                        >
                                            {granting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                                            Grant +1 attempt
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        value={grantReason}
                                        onChange={e => setGrantReason(e.target.value)}
                                        placeholder="Reason (optional) — e.g. internet dropped mid-quiz"
                                        maxLength={300}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-amber-400"
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Edit modal ───────────────────────────────────────────── */}
            {editingAssessment && (
                <div className="fixed inset-0 z-[100] bg-slate-900/55 backdrop-blur-sm flex items-center justify-center px-4" onClick={closeEdit}>
                    <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-base font-black text-slate-900">Edit Assessment</h3>
                            <button onClick={closeEdit} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
                        </div>

                        <label className="text-[11px] font-black uppercase tracking-wide text-slate-400 mb-1.5 block">Title</label>
                        <input
                            type="text"
                            value={editForm.title}
                            onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 mb-4"
                        />

                        <label className="text-[11px] font-black uppercase tracking-wide text-slate-400 mb-1.5 block">Description</label>
                        <textarea
                            value={editForm.description}
                            onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                            rows={2}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 mb-4 resize-none"
                        />

                        <div className="grid grid-cols-3 gap-3 mb-4">
                            <div>
                                <label className="text-[11px] font-black uppercase tracking-wide text-slate-400 mb-1.5 block">Time (min)</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={180}
                                    value={editForm.timeLimit}
                                    onChange={e => setEditForm(f => ({ ...f, timeLimit: e.target.value }))}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black uppercase tracking-wide text-slate-400 mb-1.5 block">Max Attempts</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={editForm.maxAttempts}
                                    onChange={e => setEditForm(f => ({ ...f, maxAttempts: e.target.value }))}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black uppercase tracking-wide text-slate-400 mb-1.5 block">Pass %</label>
                                <input
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={editForm.passingScore}
                                    onChange={e => setEditForm(f => ({ ...f, passingScore: e.target.value }))}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400"
                                />
                            </div>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium mb-4">
                            This is the base attempt limit for every learner on this assessment. To give one specific learner an extra attempt without changing it for everyone, use "Grant a learner +1 attempt" from the View screen instead.
                        </p>

                        <label className="flex items-center gap-2 mb-5 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={editForm.isActive}
                                onChange={e => setEditForm(f => ({ ...f, isActive: e.target.checked }))}
                                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400"
                            />
                            <span className="text-sm font-semibold text-slate-700">Active (visible to learners)</span>
                        </label>

                        <div className="flex gap-2">
                            <button
                                onClick={closeEdit}
                                className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                disabled={savingEdit || !editForm.title.trim()}
                                className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition-colors flex items-center justify-center gap-1.5"
                            >
                                {savingEdit && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAssessmentManager;

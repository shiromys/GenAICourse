import React, { useState, useEffect } from 'react';
import { Download, Share2, Eye, Calendar, Award, BookOpen, ExternalLink, ShieldCheck, X } from 'lucide-react';
import certificateService from '../../services/certificateService';

const CertificateViewer = ({ certificateId, onClose }) => {
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    loadCertificate();
  }, [certificateId]);

  const loadCertificate = async () => {
    try {
      setLoading(true);
      const response = await certificateService.getCertificateDetails(certificateId);
      setCertificate(response.data || response);
    } catch (error) {
      console.error('Failed to load certificate:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await certificateService.downloadCertificate(certificateId);
    } catch (error) {
      console.error('Failed to download certificate:', error);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>
      </div>
    );
  }

  if (!certificate) return null;

  return (
    <div className="max-w-5xl mx-auto bg-[#FDFDFD] rounded-xl shadow-2xl overflow-hidden border border-slate-200">
      {/* Designer Header: Premium Navy/Gold Bar */}
      <div className="bg-slate-900 text-white px-8 py-5 flex justify-between items-center border-b-4 border-[#B4975A]">
        <div>
          <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-[#B4975A]">Official Credential</h2>
          <p className="text-xs text-slate-400">GENAICOURSE.IO • GLOBAL LEARNING SYSTEMS</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Certificate Content Area */}
      <div className="p-12 relative">
        {/* Subtle Architectural Borders */}
        <div className="absolute inset-8 border border-slate-100 pointer-events-none" />
        <div className="absolute inset-10 border-2 border-slate-50 pointer-events-none" />

        <div className="text-center space-y-8 relative z-10">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-[#B4975A] rounded-full flex items-center justify-center shadow-lg">
                <Award className="h-12 w-12 text-white" />
              </div>
              {/* Animated Ring */}
              <div className="absolute inset-0 border-4 border-[#B4975A]/20 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-slate-400 italic font-serif text-lg">This acknowledges that</span>
            <h3 className="text-6xl font-serif font-medium text-slate-900 tracking-tight">
              {certificate.userName}
            </h3>
          </div>

          <div className="space-y-4">
            <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
              has demonstrated exceptional mastery and successfully completed the professional course
            </p>
            <div className="inline-block border-y-2 border-[#B4975A] py-4 px-12">
              <h4 className="text-3xl font-bold text-slate-900 uppercase tracking-wider">
                {certificate.courseTitle}
              </h4>
            </div>
          </div>

          {/* Justified Metrics Section */}
          <div className="grid grid-cols-3 gap-12 pt-10 max-w-3xl mx-auto">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1">Success Grade</p>
              <p className="text-2xl font-serif font-bold text-slate-800">{certificate.grade}</p>
            </div>
            <div className="text-center border-x border-slate-100">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1">Final Score</p>
              <p className="text-2xl font-serif font-bold text-slate-800">{certificate.score}%</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1">Issue Date</p>
              <p className="text-2xl font-serif font-bold text-slate-800">
                {new Date(certificate.completionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Justified Footer: Verification & ID Block */}
      <div className="bg-slate-50 px-12 py-8 flex justify-between items-end border-t border-slate-200">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-slate-500">
            <ShieldCheck className="h-5 w-5 text-[#B4975A]" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Credential Authenticity Verified</span>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] text-slate-400">CREDENTIAL ID: <span className="text-slate-700 font-mono">{certificate.certificateId}</span></p>
            <p className="text-[11px] text-slate-400">INSTRUCTOR: <span className="text-slate-700 uppercase tracking-tighter">{certificate.instructorName}</span></p>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-4">
          <a
            href={`/verify/${certificate.certificateId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs font-bold text-slate-800 hover:text-[#B4975A] transition-colors"
          >
            VERIFY RECORD ONLINE
            <ExternalLink className="h-3 w-3 ml-2" />
          </a>

          <div className="flex space-x-3">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-900 text-[#B4975A] rounded-lg hover:bg-slate-800 transition-all font-bold text-xs uppercase tracking-widest shadow-lg"
            >
              <Download className="h-4 w-4" />
              <span>{downloading ? 'Processing...' : 'Download PDF'}</span>
            </button>
            <button
              onClick={() => setPreviewMode(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-bold text-xs uppercase tracking-widest"
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modern Modal Overlay for Preview */}
      {previewMode && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-6 z-[100]">
          <div className="bg-white rounded-xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Document Rendering Preview</h3>
              <button onClick={() => setPreviewMode(false)} className="p-2 hover:bg-slate-200 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            <iframe
              src={`/api/certificates/${certificateId}/preview`}
              className="flex-1 w-full border-none"
              title="Aesthetic Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateViewer;
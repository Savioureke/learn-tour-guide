import React, { useState } from 'react';
import { Award, CheckCircle, Download, ShieldCheck, Star, X } from 'lucide-react';

export default function CertificateModal({
  isOpen,
  onClose,
  guideName = 'Certified Tour Guide'
}) {
  if (!isOpen) return null;

  const [paid, setPaid] = useState(false);
  const [processing, setProcessing] = useState(false);
  const serialNumber = 'LTG-CERT-2026-' + Math.floor(100000 + Math.random() * 900000);
  const issueDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const handlePayCertification = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaid(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-dark/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative border border-gray-100 flex flex-col max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-secondary hover:text-dark flex items-center justify-center transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Display Area */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 space-y-6 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            Module 10 Completed · Official Credential
          </div>

          <h2 className="font-cursive text-dark text-3xl sm:text-4xl font-bold">
            Certificate of Tour Guiding Mastery
          </h2>
          <p className="text-secondary text-sm max-w-lg mx-auto font-medium">
            Awarded for demonstrating proficiency in storytelling, crowd psychology, group safety, and field directorship across all 10 curriculum modules.
          </p>

          {/* Certificate Frame */}
          <div className="bg-[#FFFDF9] border-4 border-double border-[#F1A501]/60 rounded-3xl p-6 sm:p-8 relative shadow-card text-left space-y-4 max-w-lg mx-auto">
            <div className="flex justify-between items-start border-b border-[#F1A501]/30 pb-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#181E4B]">
                  Official Academy Credential
                </div>
                <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                  ID: {serialNumber}
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>

            <div className="py-2 text-center">
              <div className="text-xs text-secondary uppercase tracking-wider font-semibold">
                This is to certify that
              </div>
              <div className="font-cursive text-2xl sm:text-3xl font-bold text-dark my-2">
                {guideName}
              </div>
              <div className="text-xs text-secondary leading-relaxed max-w-md mx-auto">
                has successfully completed all 10 accredited theoretical and field instruction modules, passing all comprehension quizzes and safety assessments.
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-[#F1A501]/30 pt-4 text-[11px] text-secondary">
              <div>
                <span className="font-semibold block text-dark">Date Issued</span>
                <span>{issueDate}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold block text-dark">Verification Status</span>
                <span className="text-success font-bold flex items-center gap-1 justify-end">
                  <CheckCircle className="w-3.5 h-3.5" /> Verified Licensed Trainee
                </span>
              </div>
            </div>
          </div>

          {/* Fee & Claim section */}
          {paid ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-success/15 border border-success/30 text-success text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Certificate fee paid ($20). Your official high-res digital credential is ready!</span>
              </div>
              <button
                onClick={() => window.print()}
                className="px-8 py-3.5 rounded-xl bg-dark text-white font-semibold text-sm hover:bg-primary transition-all inline-flex items-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download / Print Official Certificate (PDF)</span>
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <div className="text-xs text-secondary font-medium">Official Certification Issuance Fee:</div>
                <div className="text-2xl font-bold font-cursive text-dark">
                  $20 <span className="text-xs font-normal text-gray-500 font-sans">(One-time fee)</span>
                </div>
              </div>

              <button
                onClick={handlePayCertification}
                disabled={processing}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-hover shadow-primary-btn transition-all"
              >
                {processing ? 'Processing...' : 'Claim & Issue Certificate ($20)'}
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

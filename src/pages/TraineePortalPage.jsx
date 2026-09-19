import React, { useState } from 'react';
import { TOUR_GUIDE_TUTORIALS } from '../data/tutorials';
import UpgradeModal from '../components/UpgradeModal';
import CertificateModal from '../components/CertificateModal';
import { Award, CheckCircle, CheckCircle2, Play, Sparkles, AlertCircle, HelpCircle, DollarSign, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export default function TraineePortalPage({
  currentStudent,
  onNavigate,
  onOpenSignUp
}) {
  const [activeModule, setActiveModule] = useState(TOUR_GUIDE_TUTORIALS[0]);
  const [completedModules, setCompletedModules] = useState(['tutorial-1']); // default starts with module 1 progress
  const [isActiveGuide, setIsActiveGuide] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);

  // Modals state
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [currentUpgradePromptModule, setCurrentUpgradePromptModule] = useState(1);

  // Quiz state for active module
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  const studentName = currentStudent?.name || 'Trainee Tour Guide';

  const handleSelectModule = (mod) => {
    setActiveModule(mod);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleAnswerSelect = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    const quiz = activeModule.quiz || [];
    if (Object.keys(selectedAnswers).length < quiz.length) {
      alert('Please answer all questions before submitting the comprehension quiz.');
      return;
    }

    let correctCount = 0;
    quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const passed = correctCount === quiz.length;
    setQuizScore({ score: correctCount, total: quiz.length, passed });
    setQuizSubmitted(true);

    if (passed) {
      if (!completedModules.includes(activeModule.id)) {
        const updated = [...completedModules, activeModule.id];
        setCompletedModules(updated);
      }

      // Check for upgrade prompt: After Module 1 or subsequent modules if not yet upgraded
      const modNum = parseInt(activeModule.number, 10);
      if (!isActiveGuide && modNum >= 1) {
        setCurrentUpgradePromptModule(modNum);
        setTimeout(() => {
          setUpgradeModalOpen(true);
        }, 800);
      }

      // If finished Module 10 and completed all 10
      if (modNum === 10) {
        setTimeout(() => {
          setCertificateModalOpen(true);
        }, 1000);
      }
    }
  };

  const handleConfirmUpgrade = (amount) => {
    setIsActiveGuide(true);
    setWalletBalance(prev => prev + amount);
  };

  const completedCount = completedModules.length;
  const progressPercent = Math.round((completedCount / TOUR_GUIDE_TUTORIALS.length) * 100);

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#F8FAFC]">
      
      {/* Top Banner */}
      <section className="bg-gradient-to-r from-dark via-[#22293F] to-dark text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tour Guide Training Track &middot; Free 10-Module Academy</span>
            </div>
            <h1 className="font-cursive text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Trainee Academy Portal
            </h1>
            <p className="text-gray-300 text-sm max-w-xl font-normal mt-2">
              Welcome, <strong className="text-white">{studentName}</strong>. Master all 10 accredited modules, pass module comprehension quizzes, upgrade your public listing, and earn your verified certification.
            </p>
          </div>

          {/* Guide Status & Wallet Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 w-full md:w-auto shrink-0 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-gray-300 font-medium">Marketplace Status:</span>
              {isActiveGuide ? (
                <span className="px-3 py-1 rounded-full bg-success/20 text-success text-xs font-bold flex items-center gap-1 border border-success/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Active Listed Guide</span>
                </span>
              ) : (
                <button
                  onClick={() => {
                    setCurrentUpgradePromptModule(parseInt(activeModule.number, 10));
                    setUpgradeModalOpen(true);
                  }}
                  className="px-3 py-1 rounded-full bg-primary/20 text-primary hover:bg-primary/30 text-xs font-bold flex items-center gap-1 transition-all border border-primary/40"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Upgrade to Active ($10)</span>
                </button>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/10 text-xs">
              <span className="text-gray-300 font-medium">Guide Wallet Balance:</span>
              <span className="text-lg font-bold text-primary font-cursive">${walletBalance}.00</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-gray-400 text-right">
              {completedCount} of 10 Modules Passed ({progressPercent}%)
            </div>
          </div>
        </div>
      </section>

      {/* Main Learning Hub */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">

        {/* Upgrade Callout Banner if not active */}
        {!isActiveGuide && (
          <div className="bg-gradient-to-r from-[#FFF5EC] to-white rounded-3xl p-6 sm:p-8 border border-primary/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-cursive text-dark text-xl font-bold">
                  Publish Your Profile on the Booking Marketplace
                </h3>
                <p className="text-secondary text-xs sm:text-sm font-medium mt-1 max-w-xl leading-relaxed">
                  Upgrade your account for a $10 minimum wallet funding fee to be listed in the public guide directory where tourists book private excursions. You can continue taking all remaining training modules!
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentUpgradePromptModule(parseInt(activeModule.number, 10));
                setUpgradeModalOpen(true);
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm hover:bg-primary-hover shadow-primary-btn transition-all shrink-0"
            >
              Upgrade &amp; Fund Wallet ($10)
            </button>
          </div>
        )}

        {/* Certificate Completion Banner if all 10 finished */}
        {completedCount >= 10 && (
          <div className="bg-gradient-to-r from-success/15 via-white to-success/10 rounded-3xl p-6 sm:p-8 border border-success/30 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6 animate-fadeIn">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-success text-white flex items-center justify-center shrink-0 shadow-md">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-cursive text-dark text-xl font-bold">
                  All 10 Modules Passed · Capstone Completed!
                </h3>
                <p className="text-secondary text-xs sm:text-sm font-medium mt-1 max-w-xl leading-relaxed">
                  Congratulations! You are officially eligible for your Tour Guide Certificate of Completion. Claim and download your credential with verification serial number for a $20 issuance fee.
                </p>
              </div>
            </div>

            <button
              onClick={() => setCertificateModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-success text-white font-bold text-xs sm:text-sm hover:bg-green-600 shadow-md transition-all shrink-0"
            >
              Claim Certificate ($20)
            </button>
          </div>
        )}

        {/* ACTIVE MODULE CONTAINER */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-gray-100 space-y-8">
          
          {/* Module Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-danger uppercase tracking-wider mb-1">
                <span>Module {activeModule.number}</span>
                <span>&middot;</span>
                <span className="text-secondary">{activeModule.duration}</span>
                <span>&middot;</span>
                <span className="bg-gray-100 text-dark px-2 py-0.5 rounded">{activeModule.level}</span>
              </div>
              <h2 className="font-cursive text-dark text-2xl sm:text-3xl font-bold">
                {activeModule.title}
              </h2>
              <p className="text-secondary text-sm font-medium mt-0.5">{activeModule.subtitle}</p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              {completedModules.includes(activeModule.id) ? (
                <span className="px-4 py-2 rounded-xl bg-success/15 text-success text-xs font-bold flex items-center gap-1.5 border border-success/30">
                  <CheckCircle className="w-4 h-4" />
                  <span>Module Completed</span>
                </span>
              ) : (
                <span className="px-4 py-2 rounded-xl bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200">
                  Pass Quiz Below to Complete
                </span>
              )}
            </div>
          </div>

          {/* Video Lesson Player */}
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeModule.videoId}?rel=0`}
              title={activeModule.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Lesson Overview & Key Takeaways */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100">
            <div className="md:col-span-7">
              <h4 className="text-xs font-bold uppercase tracking-wider text-dark mb-2">Lesson Overview</h4>
              <p className="text-secondary text-sm leading-relaxed font-medium">{activeModule.summary}</p>
            </div>
            <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-6 pt-4 md:pt-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-dark mb-2">Core Field Takeaways</h4>
              <ul className="space-y-2 text-xs text-secondary font-medium">
                {activeModule.keyTakeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COMPREHENSION QUIZ SECTION */}
          <div className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border-2 border-primary/20 space-y-6">
            <div className="flex items-center justify-between border-b border-primary/20 pb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h3 className="font-cursive text-dark text-xl font-bold">
                  Module {activeModule.number} Comprehension Quiz
                </h3>
              </div>
              <span className="text-xs font-semibold text-secondary">
                Mandatory Assessment
              </span>
            </div>

            {/* Quiz Questions */}
            <div className="space-y-6">
              {(activeModule.quiz || []).map((q, qIdx) => (
                <div key={qIdx} className="space-y-3">
                  <p className="text-sm font-bold text-dark">
                    {qIdx + 1}. {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[qIdx] === optIdx;
                      let optionClasses = 'p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-start gap-2 ';
                      
                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          optionClasses += 'border-success bg-success/15 text-success font-bold';
                        } else if (isSelected && optIdx !== q.correctIndex) {
                          optionClasses += 'border-danger bg-danger/10 text-danger';
                        } else {
                          optionClasses += 'border-gray-200 text-gray-400';
                        }
                      } else {
                        if (isSelected) {
                          optionClasses += 'border-primary bg-primary/10 text-dark font-semibold shadow-xs';
                        } else {
                          optionClasses += 'border-gray-200 bg-white hover:border-gray-300 text-secondary';
                        }
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleAnswerSelect(qIdx, optIdx)}
                          className={optionClasses}
                        >
                          <span className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <p className="text-[11px] text-gray-500 italic mt-1">
                      Explanation: {q.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Quiz Result Feedback & Submit Button */}
            <div className="pt-4 border-t border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                {quizSubmitted && quizScore && (
                  <div className={`text-xs font-bold ${quizScore.passed ? 'text-success' : 'text-danger'}`}>
                    {quizScore.passed ? (
                      <span>🎉 Perfect Score! ({quizScore.score}/{quizScore.total}). Module marked as completed.</span>
                    ) : (
                      <span>Need {quizScore.total}/{quizScore.total} to pass. Please review takeaways and retry.</span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {quizSubmitted && !quizScore?.passed && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuizSubmitted(false);
                      setSelectedAnswers({});
                    }}
                    className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-dark hover:bg-gray-50"
                  >
                    Retry Quiz
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm hover:bg-primary-hover shadow-primary-btn transition-all"
                >
                  Submit Comprehension Quiz
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* ALL 10 MODULES GRID */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-cursive text-dark text-2xl sm:text-3xl font-bold">
                Accredited 10-Module Training Path
              </h3>
              <p className="text-secondary text-sm font-medium">
                Click any module below to watch the masterclass and take the comprehension quiz.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/15 text-primary">
              10 Complete Modules
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOUR_GUIDE_TUTORIALS.map((mod) => {
              const isCurrent = activeModule.id === mod.id;
              const isDone = completedModules.includes(mod.id);

              return (
                <div
                  key={mod.id}
                  onClick={() => handleSelectModule(mod)}
                  className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between group hover:shadow-lg ${
                    isCurrent
                      ? 'border-primary ring-2 ring-primary/20 shadow-md'
                      : 'border-gray-200/80 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-danger uppercase tracking-wider">
                        Module {mod.number}
                      </span>
                      {isDone ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-success bg-success/15 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Passed
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-gray-400">
                          {mod.duration}
                        </span>
                      )}
                    </div>

                    <h4 className="font-cursive text-dark text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {mod.title}
                    </h4>
                    <p className="text-secondary text-xs line-clamp-2 mt-1.5 font-medium">
                      {mod.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-primary">
                    <span>{isCurrent ? 'Now Viewing' : 'Start Module'}</span>
                    <Play className="w-3.5 h-3.5 fill-primary text-primary" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Upgrade Modal Prompt */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        onConfirmUpgrade={handleConfirmUpgrade}
        moduleNumber={currentUpgradePromptModule}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={certificateModalOpen}
        onClose={() => setCertificateModalOpen(false)}
        guideName={studentName}
      />

    </div>
  );
}

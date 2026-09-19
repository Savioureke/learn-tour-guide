import React, { useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';
import { TOUR_GUIDE_TUTORIALS } from '../data/tutorials';
import UpgradeModal from './UpgradeModal';
import CertificateModal from './CertificateModal';
import { updateCompletedTutorials, updateStudentMentor, fetchTourGuides } from '../lib/supabase';
import { Award, CheckCircle, CheckCircle2, Play, Sparkles, HelpCircle, DollarSign, ShieldCheck, User } from 'lucide-react';

export default function StudentDashboard({ student, onLogout, onBackToHome, onUpdateStudent }) {
  const [activeTutorial, setActiveTutorial] = useState(TOUR_GUIDE_TUTORIALS[0]);
  const [completedList, setCompletedList] = useState(student.completed_tutorials || ['tutorial-1']);
  const [mentors, setMentors] = useState([]);
  const [loadingMentors, setLoadingMentors] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  
  // Guide status & wallet
  const [isActiveGuide, setIsActiveGuide] = useState(student.is_active_guide || false);
  const [walletBalance, setWalletBalance] = useState(student.wallet_balance || 0);

  // Modals
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [upgradePromptModule, setUpgradePromptModule] = useState(1);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  useEffect(() => {
    async function loadBackendMentors() {
      try {
        setLoadingMentors(true);
        const data = await fetchTourGuides();
        setMentors(data);
      } catch (err) {
        console.error('Failed to load mentors:', err);
      } finally {
        setLoadingMentors(false);
      }
    }
    loadBackendMentors();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleSelectTutorial = (tut) => {
    setActiveTutorial(tut);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const handleAnswerSelect = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = async () => {
    const quiz = activeTutorial.quiz || [];
    if (Object.keys(selectedAnswers).length < quiz.length) {
      alert('Please answer all questions before submitting the comprehension quiz.');
      return;
    }

    let correct = 0;
    quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct += 1;
      }
    });

    const passed = correct === quiz.length;
    setQuizScore({ score: correct, total: quiz.length, passed });
    setQuizSubmitted(true);

    if (passed) {
      if (!completedList.includes(activeTutorial.id)) {
        const updated = [...completedList, activeTutorial.id];
        setCompletedList(updated);
        try {
          await updateCompletedTutorials(student.id, updated);
          onUpdateStudent({ ...student, completed_tutorials: updated });
        } catch (e) {
          console.warn('Could not sync to cloud:', e);
        }
        showToast('🎉 Quiz passed! Progress saved to Supabase.');
      }

      const modNum = parseInt(activeTutorial.number, 10);
      if (!isActiveGuide && modNum >= 1) {
        setUpgradePromptModule(modNum);
        setTimeout(() => setUpgradeModalOpen(true), 700);
      }

      if (modNum === 10) {
        setTimeout(() => setCertificateModalOpen(true), 900);
      }
    }
  };

  const handleConfirmUpgrade = (amount) => {
    setIsActiveGuide(true);
    setWalletBalance(prev => prev + amount);
    onUpdateStudent({
      ...student,
      is_active_guide: true,
      wallet_balance: (student.wallet_balance || 0) + amount
    });
    showToast('🚀 Account upgraded! Your profile is now active on the Booking Marketplace.');
  };

  const completedCount = completedList.length;
  const progressPercent = Math.round((completedCount / TOUR_GUIDE_TUTORIALS.length) * 100);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-secondary pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-dark text-white px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-medium flex items-center gap-3 animate-fadeIn border border-white/10">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Student Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 group text-left focus:outline-none"
              title="Return to main marketplace"
            >
              <BrandLogo badge="Trainee Portal" />
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:block text-right">
              <div className="text-xs font-bold text-dark">{student.name}</div>
              <div className="text-[11px] text-gray-500">{student.email}</div>
            </div>

            <button
              onClick={onBackToHome}
              className="px-4 py-2 rounded-xl text-xs font-medium text-dark hover:bg-gray-100 transition-colors border border-gray-200"
            >
              Booking Marketplace
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl text-xs font-medium bg-red-50 text-danger hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Welcome & Progress Overview Banner */}
        <div className="bg-gradient-to-r from-[#181E4B] via-[#212832] to-[#2E3650] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/20 px-3 py-1 rounded-full">
                Accredited 10-Module Guide Track
              </span>
              <h1 className="font-cursive text-2xl sm:text-4xl font-bold mt-3 mb-2 text-white">
                Welcome, {student.name}!
              </h1>
              <p className="text-gray-300 text-sm max-w-xl font-normal">
                Complete all 10 modules, pass each comprehension quiz, and upgrade to an active listing on the Booking marketplace.
              </p>
            </div>

            {/* Quick Metrics & Wallet */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-xs text-gray-300 font-medium">Completed Modules</div>
                <div className="text-2xl sm:text-3xl font-bold text-primary mt-1">
                  {completedCount} <span className="text-sm font-normal text-gray-400">/ {TOUR_GUIDE_TUTORIALS.length}</span>
                </div>
                <div className="w-full bg-white/20 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-gray-300 font-medium">Marketplace Status</div>
                  <div className="text-sm font-bold mt-1 text-white truncate">
                    {isActiveGuide ? 'Active Listed Guide' : 'In Free Training'}
                  </div>
                </div>

                {isActiveGuide ? (
                  <span className="text-xs text-success font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Published Online
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setUpgradePromptModule(parseInt(activeTutorial.number, 10));
                      setUpgradeModalOpen(true);
                    }}
                    className="text-xs text-primary font-bold hover:underline text-left mt-2"
                  >
                    Upgrade to Active ($10) &rarr;
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Upgrade Milestone Banner if not yet active */}
        {!isActiveGuide && (
          <div className="bg-gradient-to-r from-[#FFF5EC] to-white rounded-3xl p-6 border border-primary/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h4 className="font-cursive text-dark text-lg font-bold">
                  Publish Your Guide Profile to Travelers
                </h4>
                <p className="text-secondary text-xs font-medium mt-0.5">
                  Deposit a $10 minimum wallet funding fee to be featured on the Booking Marketplace. You can continue free modules anytime!
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setUpgradePromptModule(parseInt(activeTutorial.number, 10));
                setUpgradeModalOpen(true);
              }}
              className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-primary-btn shrink-0"
            >
              Upgrade for $10
            </button>
          </div>
        )}

        {/* SECTION 1: Active Video Tutorial Player */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-gray-100 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-danger uppercase tracking-wider mb-1">
                <span>Module {activeTutorial.number}</span>
                <span>&middot;</span>
                <span className="text-secondary">{activeTutorial.duration}</span>
                <span>&middot;</span>
                <span className="bg-gray-100 text-dark px-2 py-0.5 rounded">{activeTutorial.level}</span>
              </div>
              <h2 className="font-cursive text-dark text-xl sm:text-2xl font-bold">
                {activeTutorial.title}
              </h2>
              <p className="text-secondary text-sm font-medium">{activeTutorial.subtitle}</p>
            </div>

            <div>
              {completedList.includes(activeTutorial.id) ? (
                <span className="px-4 py-2 rounded-xl bg-success/15 text-success text-xs font-bold flex items-center gap-1.5 border border-success/30">
                  <CheckCircle className="w-4 h-4" />
                  <span>Module Completed</span>
                </span>
              ) : (
                <span className="px-4 py-2 rounded-xl bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200">
                  Quiz Required Below
                </span>
              )}
            </div>
          </div>

          {/* Video Embed */}
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeTutorial.videoId}?rel=0`}
              title={activeTutorial.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Tutorial Notes & Takeaways */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
            <div className="md:col-span-7">
              <h4 className="text-xs font-bold uppercase tracking-wider text-dark mb-2">Lesson Overview</h4>
              <p className="text-secondary text-sm leading-relaxed">{activeTutorial.summary}</p>
            </div>
            <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-6 pt-4 md:pt-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-dark mb-2">Core Field Takeaways</h4>
              <ul className="space-y-1.5 text-xs text-secondary">
                {activeTutorial.keyTakeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-success font-bold">&radic;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COMPREHENSION QUIZ */}
          <div className="bg-[#FFFDF9] rounded-2xl p-6 border-2 border-primary/20 space-y-6">
            <div className="flex items-center justify-between border-b border-primary/20 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h3 className="font-cursive text-dark text-lg font-bold">
                  Module {activeTutorial.number} Comprehension Assessment
                </h3>
              </div>
              <span className="text-xs font-semibold text-secondary">Mandatory Quiz</span>
            </div>

            <div className="space-y-5">
              {(activeTutorial.quiz || []).map((q, qIdx) => (
                <div key={qIdx} className="space-y-2.5">
                  <p className="text-xs sm:text-sm font-bold text-dark">
                    {qIdx + 1}. {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[qIdx] === optIdx;
                      let cls = 'p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-start gap-2 ';
                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) cls += 'border-success bg-success/15 text-success font-bold';
                        else if (isSelected) cls += 'border-danger bg-danger/10 text-danger';
                        else cls += 'border-gray-200 text-gray-400';
                      } else {
                        if (isSelected) cls += 'border-primary bg-primary/10 text-dark font-semibold';
                        else cls += 'border-gray-200 bg-white hover:border-gray-300 text-secondary';
                      }

                      return (
                        <div key={optIdx} onClick={() => handleAnswerSelect(qIdx, optIdx)} className={cls}>
                          <span className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <p className="text-[11px] text-gray-500 italic">Explanation: {q.explanation}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                {quizSubmitted && quizScore && (
                  <div className={`text-xs font-bold ${quizScore.passed ? 'text-success' : 'text-danger'}`}>
                    {quizScore.passed ? '🎉 Perfect Score! Module completed.' : 'Please retry to earn 100% and complete module.'}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {quizSubmitted && !quizScore?.passed && (
                  <button
                    onClick={() => { setQuizSubmitted(false); setSelectedAnswers({}); }}
                    className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold"
                  >
                    Retry
                  </button>
                )}
                <button
                  onClick={handleSubmitQuiz}
                  className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-hover shadow-primary-btn"
                >
                  Submit Quiz
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: All 10 Modules Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-cursive text-dark text-2xl font-bold">
                10-Module Training Curriculum
              </h3>
              <p className="text-secondary text-sm font-medium">
                Click any module below to study and take its assessment.
              </p>
            </div>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              10 Modules
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOUR_GUIDE_TUTORIALS.map((tut) => {
              const isCurrent = activeTutorial.id === tut.id;
              const isDone = completedList.includes(tut.id);

              return (
                <div
                  key={tut.id}
                  onClick={() => handleSelectTutorial(tut)}
                  className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between group hover:shadow-md ${
                    isCurrent
                      ? 'border-primary ring-2 ring-primary/20 shadow-md'
                      : 'border-gray-200/80 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-danger uppercase tracking-wider">
                        Module {tut.number}
                      </span>
                      {isDone ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-success bg-success/15 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Passed
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-gray-400">{tut.duration}</span>
                      )}
                    </div>

                    <h4 className="font-cursive text-dark text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {tut.title}
                    </h4>
                    <p className="text-secondary text-xs line-clamp-2 mt-1 font-medium">{tut.summary}</p>
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

      </main>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        onConfirmUpgrade={handleConfirmUpgrade}
        moduleNumber={upgradePromptModule}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={certificateModalOpen}
        onClose={() => setCertificateModalOpen(false)}
        guideName={student.name}
      />

    </div>
  );
}

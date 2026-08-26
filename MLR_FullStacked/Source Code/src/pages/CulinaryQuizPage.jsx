import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, XCircle, RotateCcw, Sparkles, Trophy, Lightbulb } from 'lucide-react';
import { getQuizScore, saveQuizScore } from '../utils/db';
import { soundSynth } from '../utils/sound';
import confetti from 'canvas-confetti';

export const CulinaryQuizPage = ({ quizData }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userBadges, setUserBadges] = useState([]);

  useEffect(() => {
    const saved = getQuizScore();
    setUserBadges(saved.badges || []);
  }, []);

  const currentQ = quizData[currentIdx];

  const handleOptionSelect = (optionIdx) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);
    setShowExplanation(true);

    if (optionIdx === currentQ.answer) {
      setScore((prev) => prev + 1);
      soundSynth.playClick();
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);

    if (currentIdx + 1 < quizData.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      const earnedBadge = score + 1 >= 5 ? 'Master Chef Trivia Badge 🏆' : null;
      saveQuizScore(score, earnedBadge);
      
      try {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 }, colors: ['#ff1a55', '#fbbf24', '#ffffff'] });
      } catch (e) {}
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-20 animate-fadeIn pt-10">
      
      {/* Header */}
      <div className="text-center space-y-4 pt-6">
        <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/20">
          Interactive Masterclass
        </span>
        <h1 className="text-4xl md:text-5xl font-black font-display text-white">
          The <span className="text-amber-400">Culinary</span> Exam
        </h1>
        <p className="text-sm md:text-base text-emerald-100/70 max-w-2xl mx-auto">
          Prove your expertise. Test your knowledge of advanced culinary terminology, food science, and classical techniques.
        </p>
      </div>

      {!quizFinished ? (
        <div className="p-8 md:p-12 rounded-[2.5rem] glass-card border border-rose-500/20 space-y-8 shadow-2xl relative overflow-hidden bg-[#120508]/80">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-amber-100/50 border-b border-rose-500/10 pb-4 relative z-10">
            <span className="uppercase tracking-widest font-bold">Question {currentIdx + 1} of {quizData.length}</span>
            <span className="font-bold text-rose-400 text-sm bg-rose-500/10 px-3 py-1 rounded-lg">Score: {score}</span>
          </div>

          {/* Question Text */}
          <h2 className="text-2xl md:text-3xl font-black text-white font-display leading-tight relative z-10">
            {currentQ.question}
          </h2>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            {currentQ.options.map((opt, idx) => {
              let btnClass = 'glass-panel border-white/5 text-amber-50/90 hover:border-amber-400/40 hover:bg-white/5';
              if (selectedOption !== null) {
                if (idx === currentQ.answer) {
                  btnClass = 'bg-rose-500/20 border-rose-500 text-rose-400 font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)]';
                } else if (idx === selectedOption) {
                  btnClass = 'bg-rose-500/20 border-rose-500 text-rose-400 font-bold';
                } else {
                  btnClass = 'opacity-40 border-transparent';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full p-5 md:p-6 rounded-2xl border text-left text-sm md:text-base transition-all duration-300 flex items-center justify-between group ${btnClass}`}
                >
                  <span>{opt}</span>
                  {selectedOption !== null && idx === currentQ.answer && <CheckCircle className="w-6 h-6 text-rose-400 shrink-0 ml-4" />}
                  {selectedOption !== null && idx === selectedOption && idx !== currentQ.answer && <XCircle className="w-6 h-6 text-rose-400 shrink-0 ml-4" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-50/80 space-y-3 animate-fadeIn relative z-10 mt-6">
              <div className="flex items-center space-x-2 text-amber-400 font-bold">
                <Lightbulb className="w-5 h-5" />
                <span>Chef's Explanation</span>
              </div>
              <p className="leading-relaxed text-base">{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {selectedOption !== null && (
            <button
              onClick={handleNext}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 text-white font-black text-lg shadow-[0_10px_40px_rgba(16,185,129,0.3)] hover:brightness-110 hover:shadow-[0_10px_40px_rgba(16,185,129,0.5)] transition-all transform hover:scale-[1.01] active:scale-[0.99] relative z-10 mt-8"
            >
              {currentIdx + 1 < quizData.length ? 'Next Question →' : 'View Final Results 🏆'}
            </button>
          )}

        </div>
      ) : (
        <div className="p-12 text-center glass-panel rounded-[3rem] border border-rose-500/40 space-y-8 shadow-2xl bg-[#120508]/90">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-amber-400 blur-3xl opacity-20 rounded-full"></div>
            <Trophy className="w-24 h-24 text-amber-400 mx-auto relative z-10 animate-bounce" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white font-display">Exam Complete!</h2>
            <p className="text-lg text-emerald-100/70">
              You scored <strong className="text-amber-400 font-black text-3xl mx-2">{score}</strong> out of {quizData.length}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="px-10 py-4 rounded-full bg-rose-500 hover:bg-rose-400 text-white font-bold text-lg flex items-center justify-center space-x-3 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all transform hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Retake Exam</span>
          </button>
        </div>
      )}

    </div>
  );
};

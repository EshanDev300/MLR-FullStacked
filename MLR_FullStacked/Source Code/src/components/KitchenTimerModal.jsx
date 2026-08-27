import React, { useState, useEffect } from 'react';
import { X, Timer, Play, Pause, RotateCcw, Bell, Calculator, ArrowRightLeft } from 'lucide-react';
import { soundSynth } from '../utils/sound';

export const KitchenTimerModal = ({ isOpen, onClose }) => {
  const [secondsLeft, setSecondsLeft] = useState(300); // Default 5 mins
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('timer'); // 'timer' or 'converter'

  // Unit Converter State
  const [inputValue, setInputValue] = useState(1);
  const [convertType, setConvertType] = useState('cups-ml');
  const [convertResult, setConvertResult] = useState('236.5 ml');

  useEffect(() => {
    let interval = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      soundSynth.playTimerAlarm();
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  useEffect(() => {
    // Unit Conversion Calculations
    const val = parseFloat(inputValue) || 0;
    if (convertType === 'cups-ml') {
      setConvertResult(`${(val * 236.588).toFixed(1)} ml`);
    } else if (convertType === 'tbsp-ml') {
      setConvertResult(`${(val * 14.787).toFixed(1)} ml`);
    } else if (convertType === 'oz-g') {
      setConvertResult(`${(val * 28.3495).toFixed(1)} g`);
    } else if (convertType === 'f-c') {
      setConvertResult(`${(((val - 32) * 5) / 9).toFixed(1)} °C`);
    }
  }, [inputValue, convertType]);

  if (!isOpen) return null;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    soundSynth.playClick();
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    soundSynth.playClick();
    setIsRunning(false);
    setSecondsLeft(300);
  };

  const addTime = (mins) => {
    soundSynth.playClick();
    setSecondsLeft((prev) => prev + mins * 60);
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl animate-fadeIn overflow-y-auto overscroll-contain"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div 
        className="relative w-full max-w-lg glass-panel-glow border border-amber-500/40 rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl my-auto max-h-[92vh] overflow-y-auto custom-scrollbar overscroll-contain bg-[#140406]/98"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">Kitchen Assistant</h3>
              <p className="text-xs text-slate-400">Timer & Unit Converter</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-white/5 p-1">
          <button
            onClick={() => setActiveTab('timer')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'timer' ? 'bg-amber-500 text-dark-900 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>Kitchen Timer</span>
          </button>
          <button
            onClick={() => setActiveTab('converter')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'converter' ? 'bg-amber-500 text-dark-900 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Unit Converter</span>
          </button>
        </div>

        {/* Tab 1: Kitchen Timer */}
        {activeTab === 'timer' && (
          <div className="space-y-6 text-center">
            
            {/* Display Ring */}
            <div className="relative w-48 h-48 mx-auto rounded-full glass-card border-2 border-amber-500/40 flex flex-col items-center justify-center shadow-2xl shadow-amber-500/10">
              <span className="text-4xl font-black font-mono tracking-widest text-amber-400">
                {formatTime(secondsLeft)}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">
                {isRunning ? 'Cooking in Progress...' : secondsLeft === 0 ? '🔔 Time is Up!' : 'Paused'}
              </span>
            </div>

            {/* Quick Mins Add Buttons */}
            <div className="flex justify-center space-x-2">
              {[1, 5, 10, 15].map((m) => (
                <button
                  key={m}
                  onClick={() => addTime(m)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:text-amber-400 hover:border-amber-500/40"
                >
                  +{m}m
                </button>
              ))}
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handleStartPause}
                className={`px-6 py-3 rounded-xl font-black text-sm flex items-center space-x-2 shadow-lg transition-all ${
                  isRunning 
                    ? 'bg-rose-500 text-white shadow-rose-500/20' 
                    : 'bg-amber-500 text-dark-900 shadow-amber-500/20 hover:brightness-110'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isRunning ? 'Pause Timer' : 'Start Timer'}</span>
              </button>

              <button
                onClick={handleReset}
                className="p-3 rounded-xl glass-card text-slate-300 hover:text-white hover:border-white/30"
                title="Reset Timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

          </div>
        )}

        {/* Tab 2: Unit Converter */}
        {activeTab === 'converter' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                Conversion Type
              </label>
              <select
                value={convertType}
                onChange={(e) => setConvertType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="cups-ml">US Cups ➔ Milliliters (ml)</option>
                <option value="tbsp-ml">Tablespoons (tbsp) ➔ Milliliters (ml)</option>
                <option value="oz-g">Ounces (oz) ➔ Grams (g)</option>
                <option value="f-c">Fahrenheit (°F) ➔ Celsius (°C)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                Value to Convert
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="p-4 rounded-2xl glass-card border border-rose-500/30 text-center space-y-1">
              <span className="block text-[11px] font-bold uppercase text-slate-400">Equivalent Result</span>
              <span className="text-2xl font-black text-rose-400 font-mono">{convertResult}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

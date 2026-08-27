import React, { useEffect, useState } from 'react';
import { Sparkles, X, Send, Bot } from 'lucide-react';
import { answerChefQuestion, detectLanguage, generateAIRecipe, isChefQuestion, isGreeting, getChefGreeting } from '../utils/aiEngine';
import { soundSynth } from '../utils/sound';

export const TypingText = ({ text }) => {
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    setVisibleText('');
    let position = 0;
    const timer = window.setInterval(() => {
      position += 2;
      setVisibleText(text.slice(0, position));
      if (position >= text.length) window.clearInterval(timer);
    }, 18);
    return () => window.clearInterval(timer);
  }, [text]);

  return <>{visibleText}{visibleText.length < text.length && <span className="ai-typing-caret" aria-hidden="true" />}</>;
};

export const FloatingAIWidget = ({ onSelectRecipe }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: 'Greetings! I am your AI Chef Agent. Tell me what ingredients you have in your kitchen or what dish you want to cook!'
    }
  ]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setChatHistory((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);
    soundSynth.playClick();

    const detectedLanguage = detectLanguage(userText);

    // Handle Greetings / Casual Chat
    if (isGreeting(userText)) {
      const greetingMsg = getChefGreeting(userText, detectedLanguage);
      setLoading(false);
      setChatHistory((prev) => [...prev, { sender: 'ai', text: greetingMsg }]);
      return;
    }

    // Handle Cooking Questions
    if (isChefQuestion(userText)) {
      const answer = await answerChefQuestion({ question: userText, language: detectedLanguage });
      setLoading(false);
      setChatHistory((prev) => [...prev, { sender: 'ai', text: answer }]);
      return;
    }

    const recipe = await generateAIRecipe({
      ingredients: userText,
      category: 'dinner',
      diet: 'none',
      maxTime: 25,
      language: detectedLanguage
    });

    const responseText = {
      es: `He creado un plato único para ti: "${recipe.title}". He usado tu petición para equilibrar sabor, textura y preparación.`,
      fr: `J'ai créé un plat unique pour vous : "${recipe.title}". Votre demande a guidé les saveurs, la texture et la préparation.`,
      de: `Ich habe ein einzigartiges Gericht für Sie kreiert: "${recipe.title}". Ihre Anfrage bestimmt Geschmack, Textur und Zubereitung.`,
      it: `Ho creato un piatto unico per te: "${recipe.title}". La tua richiesta ha guidato sapore, consistenza e preparazione.`,
      zh: `我为你创作了一道独特料理：“${recipe.title}”。我根据你的需求调整了风味、口感和做法。`,
      ja: `あなたのために「${recipe.title}」という料理を考えました。ご希望に合わせて味、食感、調理法を整えています。`,
      ar: `أعددت لك طبقاً مميزاً: "${recipe.title}". استخدمت طلبك لموازنة النكهة والقوام وطريقة التحضير.`,
      hi: `मैंने आपके लिए एक अनोखी डिश बनाई है: "${recipe.title}"। आपके अनुरोध के अनुसार स्वाद और विधि तैयार की गई है।`,
      ur: `میں نے آپ کے لیے ایک منفرد ڈش تیار کی ہے: "${recipe.title}"۔ آپ کی درخواست کے مطابق ذائقہ اور طریقہ بنایا گیا ہے۔`,
      roman_ur: `Maine aap ke liye aik behtareen aur lazeez recipe banayi hai: "${recipe.title}". Mukammal tareeqa aur ingredients dekhne ke liye neechay button par click karein!`
    }[detectedLanguage] || `I crafted a unique dish for you: "${recipe.title}". I used your request to shape the flavor, texture, and cooking approach for this answer.`;

    setLoading(false);
    setChatHistory((prev) => [
      ...prev,
      {
        sender: 'ai',
        text: responseText,
        recipe: recipe
      }
    ]);
  };

  return (
    <>
      {/* Floating Action Button - Fix Issue 5 (Sentence/Title case, no uppercase) & Fix Issue 12 (AI Chef Agent naming) */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          soundSynth.playClick();
        }}
        className="shine-surface ai-agent-float fixed bottom-6 right-6 z-[70] pointer-events-auto p-3.5 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-amber-500 text-white font-extrabold shadow-2xl shadow-rose-600/50 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 border border-amber-400/40"
        title="Open AI Chef Agent"
      >
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">AI Chef Agent</span>
      </button>

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="ai-agent-drawer fixed bottom-24 right-4 sm:right-6 z-[70] w-[calc(100vw-2rem)] max-w-sm glass-panel-glow border-2 border-amber-500/40 rounded-3xl p-5 shadow-2xl space-y-4 animate-fadeIn">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-display">AI Chef Agent</h4>
                <span className="text-xs text-amber-400 font-semibold">● Multilingual Intelligence</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto space-y-3 p-1 custom-scrollbar text-xs">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white font-semibold rounded-tr-none shadow-md'
                      : 'glass-card border border-white/15 text-amber-100 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed">{msg.sender === 'ai' && idx > 0 ? <TypingText text={msg.text} /> : msg.text}</p>
                  
                  {msg.recipe && (
                    <button
                      onClick={() => {
                        onSelectRecipe(msg.recipe);
                        setIsOpen(false);
                      }}
                      className="w-full py-1.5 px-3 rounded-lg bg-amber-400 text-dark-900 font-extrabold text-xs hover:brightness-110 transition-all text-center"
                    >
                      View Recipe Details ➔
                    </button>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-xs text-amber-400 font-semibold animate-pulse">
                AI Chef Agent is analyzing flavor profile...
              </div>
            )}
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your ingredients..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-3.5 py-2.5 rounded-xl bg-amber-500 text-dark-900 font-black text-xs hover:brightness-110 transition-all flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};

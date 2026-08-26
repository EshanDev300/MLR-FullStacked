import React, { useEffect, useRef, useState } from 'react';
import categoriesData from './data/categories.json';
import tipsData from './data/tips.json';
import quizData from './data/quiz.json';
import InteractiveGridBackground from './components/InteractiveGridBackground';
import TargetCursor from './components/TargetCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AddRecipeModal } from './components/AddRecipeModal';
import { KitchenTimerModal } from './components/KitchenTimerModal';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { UserPreferenceModal } from './components/UserPreferenceModal';
import { PageScrollAnimator } from './components/PageScrollAnimator';
import ClickSpark from './components/ClickSpark';
import { FloatingAIWidget } from './components/FloatingAIWidget';
import { soundSynth } from './utils/sound';
import { getInitialRecipes } from './utils/db';

// ══════ IMPORT PAGES USING NAMED IMPORTS ══════
import { Home } from './pages/Home';
import { Recipes } from './pages/Recipes';
import { CategoriesPage } from './pages/CategoriesPage';
import { MealPlannerPage } from './pages/MealPlannerPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { AIAgentPage } from './pages/AIAgentPage';
import { CookingTipsPage } from './pages/CookingTipsPage';
import { ShoppingListPage } from './pages/ShoppingListPage';
import { CulinaryQuizPage } from './pages/CulinaryQuizPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactPage } from './pages/ContactPage';
import { DashboardPage } from './pages/DashboardPage';
import { MasterclassPage } from './pages/MasterclassPage';
import { PlansPage } from './pages/PlansPage';

export function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [recipes, setRecipes] = useState(getInitialRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [timerOpen, setTimerOpen] = useState(false);
  const [addRecipeOpen, setAddRecipeOpen] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);
  const transitionTimerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    const refreshRecipes = () => setRecipes(getInitialRecipes());
    window.addEventListener('cooksmart_recipes_changed', refreshRecipes);
    return () => window.removeEventListener('cooksmart_recipes_changed', refreshRecipes);
  }, []);

  const navigateTab = (tab) => {
    if (tab === activeTab) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
    setActiveTab(tab);
    setTransitionKey((currentKey) => currentKey + 1);
    soundSynth.playClick();
    window.clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = window.setTimeout(() => setTransitionKey(0), 720);
  };

  const handleRecipeAdded = (recipe) => {
    setRecipes((currentRecipes) => [...currentRecipes, recipe]);
    setAddRecipeOpen(false);
  };

  return (
    <ClickSpark sparkColor="#ffd166" sparkSize={9} sparkRadius={18} sparkCount={8} duration={420}>
      <div className="relative min-h-screen bg-[#060102] text-amber-50 flex flex-col font-sans overflow-x-hidden selection:bg-rose-600 selection:text-white">

      <TargetCursor 
        spinDuration={3}
        hideDefaultCursor={true}
        parallaxOn={true}
        hoverDuration={0.25}
        cursorColor="#ffcc00"
        cursorColorOnTarget="#ff1a55"
        targetSelector="button, a, .cursor-target, input, select"
      />

      <Navbar
        activeTab={activeTab}
        setActiveTab={navigateTab}
        onOpenTimer={() => setTimerOpen(true)}
        onOpenAddRecipe={() => setAddRecipeOpen(true)}
      />

      <main className="flex-1 relative z-10 w-full mt-24">
        <InteractiveGridBackground
          gridSize={56}
          gridColor="rgba(245, 158, 11, 0.16)"
          effectColor="rgba(225, 29, 72, 0.95)"
          trailLength={8}
          idleSpeed={0.14}
          glow
          glowRadius={28}
          idleRandomCount={3}
          className="min-h-screen"
        >
          <div className="pt-6 pb-20">
        {activeTab === 'home' && (
          <Home
            recipes={recipes}
            categories={categoriesData}
            tips={tipsData}
            onSelectRecipe={setSelectedRecipe}
            setActiveTab={navigateTab}
          />
        )}

        {activeTab !== 'home' && (
          <div className="w-full text-amber-50">
            {activeTab === 'dashboard' && <DashboardPage />}
            {activeTab === 'recipes' && <Recipes recipes={recipes} onSelectRecipe={setSelectedRecipe} />}
            {activeTab === 'categories' && <CategoriesPage categories={categoriesData} recipes={recipes} onSelectRecipe={setSelectedRecipe} />}
            {activeTab === 'meal-planner' && <MealPlannerPage recipes={recipes} onSelectRecipe={setSelectedRecipe} setActiveTab={navigateTab} />}
            {activeTab === 'favourites' && <FavouritesPage recipes={recipes} onSelectRecipe={setSelectedRecipe} setActiveTab={navigateTab} />}
            {activeTab === 'ai-chef' && <AIAgentPage onSelectRecipe={setSelectedRecipe} />}
            {activeTab === 'tips' && <CookingTipsPage tips={tipsData} />}
            {activeTab === 'shopping-list' && <ShoppingListPage />}
            {activeTab === 'quiz' && <CulinaryQuizPage quizData={quizData} />}
            {activeTab === 'about' && <AboutUsPage />}
            {activeTab === 'contact' && <ContactPage />}
            {activeTab === 'masterclass' && <MasterclassPage setActiveTab={navigateTab} />}
            {activeTab === 'plans' && <PlansPage setActiveTab={navigateTab} />}

            {/* DEBUG FALLBACK: Shows if the Navbar button sends a tab ID we didn't account for */}
            {!['home', 'dashboard', 'recipes', 'categories', 'meal-planner', 'favourites', 'ai-chef', 'tips', 'shopping-list', 'quiz', 'about', 'contact', 'masterclass', 'plans'].includes(activeTab) && (
              <div className="py-12 text-center">
                <h3 className="text-2xl font-bold text-rose-400 mb-2">Unrecognized Tab ID: "{activeTab}"</h3>
                <p className="text-amber-200/70">
                  The navigation button is passing an ID that doesn't match our router keys. Check what string your Navbar is sending for this tab!
                </p>
              </div>
            )}
          </div>
        )}
          </div>
        </InteractiveGridBackground>
      </main>
      <PageScrollAnimator activeTab={activeTab} />

      <div key={transitionKey} className={transitionKey ? 'curtain-transition' : ''} aria-hidden="true">
        <span className="curtain-panel curtain-panel-left" />
        <span className="curtain-panel curtain-panel-right" />
      </div>
      <Footer setActiveTab={navigateTab} />
      <FloatingAIWidget onSelectRecipe={setSelectedRecipe} />
      <RecipeDetailModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onOpenPlanner={() => {
          setSelectedRecipe(null);
          navigateTab('meal-planner');
        }}
      />
      <KitchenTimerModal isOpen={timerOpen} onClose={() => setTimerOpen(false)} />
      <AddRecipeModal isOpen={addRecipeOpen} onClose={() => setAddRecipeOpen(false)} onRecipeAdded={handleRecipeAdded} />
      </div>
    </ClickSpark>
  );
}

export default App;
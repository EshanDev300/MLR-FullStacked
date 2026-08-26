import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ChefHat, 
  TrendingUp, 
  Zap,
  Flame,
  Star,
  Clock,
  Play
} from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';
import AccordionGallery from '../components/AccordionGallery';
import CardSwap, { Card } from '../components/CardSwap';

/* ─── Hero Showcase Slides ─── */
const heroSlides = [
  {
    title: 'Truffle Butter Glazed Salmon',
    category: 'Seafood Special',
    prepTime: '25 min',
    calories: '480 kcal',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=80',
    description: 'Wild-caught Atlantic salmon pan-seared in rich truffle herb butter and microgreens.',
    label: 'Glazed Salmon'
  },
  {
    title: 'Artisanal Truffle Steak',
    category: 'Grill Master',
    prepTime: '35 min',
    calories: '650 kcal',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1400&q=80',
    description: 'Aged Wagyu beef ribeye charred to perfection with garlic rosemary infusions.',
    label: 'Truffle Steak'
  },
  {
    title: 'Creamy Tagliatelle Supreme',
    category: 'Italian Heritage',
    prepTime: '20 min',
    calories: '520 kcal',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1400&q=80',
    description: 'Handcrafted egg pasta tossed in aged Parmigiano Reggiano and crushed black pepper.',
    label: 'Tagliatelle'
  },
  {
    title: 'Gourmet Truffle Burger',
    category: 'Gourmet Fast',
    prepTime: '25 min',
    calories: '850 kcal',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=80',
    description: 'Premium beef patty with black truffle mayo, caramelized onions on brioche.',
    label: 'Truffle Burger'
  },
  {
    title: 'Decadent Chocolate Lava',
    category: 'Dessert',
    prepTime: '30 min',
    calories: '550 kcal',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=1400&q=80',
    description: 'Molten chocolate cake with a rich liquid center, dusted with cocoa.',
    label: 'Lava Cake'
  }
];

const fallbackTipImage = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80';
const secondaryTipImage = 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80';
const firstCardNewImage = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80';

const useScrollReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

export const Home = ({ recipes = [], categories = [], tips = [], onSelectRecipe, setActiveTab }) => {
  const [quickSearch, setQuickSearch] = useState('');
  const [carouselIdx, setCarouselIdx] = useState(0);

  const featuredRecipes = recipes.filter((r) => r.featured);
  const popularRecipes = recipes.filter((r) => r.popular);

  const [heroRef, heroVisible] = useScrollReveal();
  const [carouselRef, carouselVisible] = useScrollReveal();
  const [catRef, catVisible] = useScrollReveal();
  const [popRef, popVisible] = useScrollReveal();
  const [statsRef, statsVisible] = useScrollReveal();

  const handleQuickSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) setActiveTab('recipes');
  };

  return (
    <div className="space-y-16 pb-16">

      {/* ═══════ FULL BLEED EDGE-TO-EDGE HERO SECTION ═══════ */}
      <section
        ref={heroRef}
        className={`w-full relative transition-all duration-700 ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="home-hero-surface w-full bg-[#0a0204]/60 border-y border-amber-500/20 py-10 px-4 sm:px-8 lg:px-12 shadow-2xl relative overflow-hidden">

          <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-6 text-left z-10">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Next-Gen Interactive Culinary AI</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight leading-[1.1] text-white">
                Master Gourmet <br />
                <span className="text-gradient-crimson">Cooking</span> with{' '}
                <span className="text-gradient-fire">AI Precision</span>
              </h1>

              <p className="text-base text-amber-100/70 max-w-xl leading-relaxed">
                Unlock 5-star recipes, automated meal scheduling, and real-time cooking intelligence crafted for food lovers.
              </p>

              {/* Quick Search Widget */}
              <div className="max-w-xl rounded-2xl glass-panel border border-amber-500/30 p-3 space-y-3 shadow-2xl">
                <form onSubmit={handleQuickSearchSubmit} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-amber-400" />
                    <input
                      type="text"
                      value={quickSearch}
                      onChange={(e) => setQuickSearch(e.target.value)}
                      placeholder="Search recipes, ingredients..."
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-dark-900/90 border border-white/10 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <button type="submit" className="btn-secondary px-5 py-3 text-xs font-bold">
                      Search
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('ai-chef')}
                      className="btn-primary px-5 py-3 text-xs font-bold whitespace-nowrap"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>AI Chef Agent</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Accordion Gallery replacing the old MorphSlider */}
            <div className="lg:col-span-7 z-10 h-[420px] sm:h-[480px]">
              <AccordionGallery
                items={heroSlides.map((slide) => ({ 
                  image: slide.image, 
                  label: slide.label, 
                  alt: slide.title,
                  link: '#'
                }))}
                defaultIndex={2}
                expandRatio={0.52}
                trigger="hover"
                accentColor="#F59E0B"
                overlayColor="#0A0203"
                textColor="#ffffff"
                height={480}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl glass-card border border-amber-500/20">
            <div className="text-2xl sm:text-3xl font-bold font-display text-white">200+</div>
            <div className="text-xs text-amber-200/70">Gourmet Recipes</div>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-amber-500/20">
            <div className="text-2xl sm:text-3xl font-bold font-display text-white">10+</div>
            <div className="text-xs text-amber-200/70">Languages</div>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-amber-500/20">
            <div className="text-2xl sm:text-3xl font-bold font-display text-white">AI</div>
            <div className="text-xs text-amber-200/70">Smart Chef Agent</div>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-amber-500/20">
            <div className="text-2xl sm:text-3xl font-bold font-display text-white">3D</div>
            <div className="text-xs text-amber-200/70">Interactive Portal</div>
          </div>
        </div>
      </section>

      {/* Featured Creations */}
      <section
        ref={carouselRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 transition-all duration-700 ${
          carouselVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <TrendingUp className="w-4 h-4" />
              <span>Five-Star Chef Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
              Featured <span className="text-gradient-gold">Gourmet</span> Creations
            </h2>
          </div>

          <button onClick={() => setActiveTab('recipes')} className="btn-secondary">
            <span>View All Recipes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {featuredRecipes.length > 0 && (
          <div className="relative rounded-3xl glass-panel-glow border border-amber-500/30 p-6 sm:p-8 overflow-hidden shadow-2xl space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center space-x-3 flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white">
                    {featuredRecipes[carouselIdx].category}
                  </span>
                  <span className="flex items-center space-x-1 text-xs font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{featuredRecipes[carouselIdx].rating}</span>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-bold text-white font-display leading-tight">
                  {featuredRecipes[carouselIdx].title}
                </h3>

                <p className="text-xs sm:text-sm text-amber-100/70 leading-relaxed line-clamp-3">
                  {featuredRecipes[carouselIdx].description}
                </p>

                <button onClick={() => onSelectRecipe(featuredRecipes[carouselIdx])} className="btn-primary mt-2">
                  <span>View Recipe Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="lg:col-span-6 flex justify-center">
                <CardSwap
                  width={340}
                  height={250}
                  cardDistance={28}
                  verticalDistance={22}
                  delay={4200}
                  onCardClick={(index) => setCarouselIdx(index)}
                >
                  {featuredRecipes.slice(0, 3).map((recipe) => (
                    <Card key={recipe.id} className="border border-amber-400/30 shadow-2xl">
                      <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-10">
                        <p className="text-sm font-bold text-white">{recipe.title}</p>
                        <p className="text-xs text-amber-300">{recipe.category}</p>
                      </div>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Categories */}
      <section
        ref={catRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 transition-all duration-700 ${
          catVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Explore by Taste</span>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
            Gourmet Recipe <span className="text-gradient-crimson">Categories</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveTab('categories')}
              className="p-6 rounded-2xl glass-card border border-white/10 hover:border-amber-400/40 cursor-pointer space-y-4 group bg-dark-900/60"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl bg-white/10 ${cat.accent}`}>
                  <ChefHat className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-amber-200">
                  {cat.count} Recipes
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-amber-100/70 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Recipes */}
      <section
        ref={popRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 transition-all duration-700 ${
          popVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Popular Trending Dishes</span>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
            Top Rated <span className="text-gradient-gold">Creations</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRecipes.slice(0, 6).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onSelectRecipe={onSelectRecipe} />
          ))}
        </div>
      </section>

      {/* Cooking Tips */}
      {tips.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Culinary Masterclasses</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">Cook Smarter Every Day</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tips.slice(0, 3).map((tip) => (
              <article key={tip.id} className="glass-card rounded-2xl overflow-hidden border border-white/10">
                <div className={`grid h-40 ${tip.id === 'tip-1' ? 'grid-cols-2 gap-1 bg-dark-900' : 'grid-cols-1'}`}>
                  <img
                    src={tip.id === 'tip-1' ? firstCardNewImage : tip.image}
                    alt={tip.title}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = fallbackTipImage;
                    }}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {tip.id === 'tip-1' && (
                    <img
                      src={secondaryTipImage}
                      alt="Fresh ingredients prepared for cooking"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">{tip.category}</span>
                  <h3 className="text-base font-bold font-display text-white">{tip.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{tip.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
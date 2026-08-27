// Multilingual AI Chef Recipe Suggestion & Culinary Intelligence Engine

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'roman_ur', name: 'Roman Urdu / Hindi' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ur', name: 'اردو' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' }
];

export function detectLanguage(text = '') {
  if (!text || typeof text !== 'string') return 'en';
  const val = text.trim();
  const lower = val.toLowerCase();

  // Arabic / Urdu script
  if (/[\u0600-\u06ff]/.test(val)) {
    if (/\b(hai|kya|kaise|karna|chahiye|mein|ka|ki|banaun|shukriya|gosh|chawal)\b/i.test(val) || /[\u0679\u0686\u0698\u06af\u06ba\u06d2]/.test(val)) {
      return 'ur';
    }
    return 'ar';
  }
  if (/[\u0900-\u097f]/.test(val)) return 'hi';
  if (/[\u3040-\u30ff]/.test(val)) return 'ja';
  if (/[\u4e00-\u9fff]/.test(val)) return 'zh';

  // Roman Urdu / Hindi Detection (Latin script words)
  const romanUrduKeywords = [
    'mujhe', 'kya', 'kaise', 'batao', 'banao', 'banana', 'banaye', 'banani', 'chahiye',
    'karen', 'karo', 'karna', 'tariqa', 'tariqe', 'recipe', 'swaad', 'namak', 'mirch',
    'tel', 'pani', 'masala', 'roti', 'sabzi', 'gosht', 'chawal', 'pyaaz', 'pyaz',
    'tamatar', 'lehsan', 'lahsun', 'adrak', 'dahi', 'karahi', 'korma', 'biryani',
    'pulao', 'nihari', 'haleem', 'tikka', 'shukriya', 'wala', 'wali', 'kuch', 'accha',
    'lazeez', 'lajawab', 'boti', 'seekh', 'daal', 'paneer', 'paratha', 'chai'
  ];

  const words = lower.split(/\s+/);
  const matchCount = words.filter(w => romanUrduKeywords.includes(w.replace(/[^a-z]/g, ''))).length;
  if (matchCount >= 1 || /\b(mujhe|kaise|batao|banana hai|banani hai|chahiye|karna hai|ki recipe)\b/i.test(lower)) {
    return 'roman_ur';
  }

  // European languages keyword detection
  if (/\b(que|como|para|cocinar|receta|pollo|pescado|ajo|cebolla|horno|aceite|delicioso|gracias)\b/i.test(lower)) return 'es';
  if (/\b(comment|pourquoi|recette|cuire|faire|poulet|poisson|ail|oignon|huile|delicieux|merci)\b/i.test(lower)) return 'fr';
  if (/\b(wie|warum|was|rezept|kochen|backen|hähnchen|knoblauch|zwiebel|öl|lecker|danke)\b/i.test(lower)) return 'de';
  if (/\b(come|perché|cosa|ricetta|cucinare|pollo|pesce|aglio|cipolla|olio|delizioso|grazie)\b/i.test(lower)) return 'it';

  return 'en';
}

export function isChefQuestion(input = '') {
  const text = typeof input === 'object' && input !== null ? (input.question || input.text || '') : String(input || '');
  if (!text) return false;
  const qWords = [
    'how', 'what', 'why', 'when', 'where', 'can', 'should', 'is', 'are', 'do', 'does', 'which', 'tell', 'help', 'substitute', 'replace',
    'kya', 'kaise', 'kyun', 'kab', 'kahan', 'batao', 'tareeqa', 'tariqa', 'bataiye',
    'cómo', 'como', 'qué', 'que', 'por qué', 'cuánto',
    'comment', 'pourquoi',
    'wie', 'was', 'warum',
    'come', 'cosa', 'perché',
    'ما', 'كيف', 'لماذا',
    '怎么', '如何', '什么',
    'どう', 'なぜ', '何'
  ];
  const lower = text.toLowerCase().trim();
  return /[?؟]/.test(text) || qWords.some(w => lower.startsWith(w) || lower.includes(` ${w} `));
}

// Extract the actual recipe concept or dish name from user prompt
function extractCulinaryDish(prompt = '') {
  const raw = String(prompt || '').trim();
  const lower = raw.toLowerCase();

  // Strip conversation fillers
  const cleanStr = lower
    .replace(/\b(i have|i want to make|i want to cook|give me a recipe for|recipe of|recipe for|how to make|how to cook|can you make|tell me recipe|dish with)\b/gi, '')
    .replace(/\b(mujhe|banana hai|banani hai|banayein|banao|batao|chahiye|ki recipe|ka tariqa|ka tareeqa|kaise banayein|bana sakti ho|bana sakte ho|mere paas)\b/gi, '')
    .replace(/\b(quiero hacer|dame una receta de|receta de|como hacer|como cocinar|tengo)\b/gi, '')
    .trim();

  // Known signature dishes database
  const DISH_MAP = [
    { key: 'biryani', name: 'Chicken Dum Biryani', nameUr: 'Laziz Chicken Dum Biryani', cat: 'dinner', cuisine: 'Pakistani / Hyderabadi', time: 45 },
    { key: 'karahi', name: 'Special Chicken Karahi', nameUr: 'Dhabba Style Shinwari Chicken Karahi', cat: 'dinner', cuisine: 'Pakistani Desi', time: 30 },
    { key: 'korma', name: 'Shahi Chicken Korma', nameUr: 'Shahi Zafrani Chicken Korma', cat: 'dinner', cuisine: 'Mughlai', time: 40 },
    { key: 'nihari', name: 'Traditional Beef Nihari', nameUr: 'Khaas Shahi Beef Nihari', cat: 'dinner', cuisine: 'Pakistani Traditional', time: 60 },
    { key: 'haleem', name: 'Shahi Daleem / Haleem', nameUr: 'Garam Shahi Reshadar Haleem', cat: 'dinner', cuisine: 'Pakistani Gourmet', time: 50 },
    { key: 'pulao', name: 'Yakhni Mutton Pulao', nameUr: 'Degi Yakhni Pulao', cat: 'dinner', cuisine: 'Traditional Desi', time: 45 },
    { key: 'tikka', name: 'Smoky Chicken Tikka Boti', nameUr: 'Koyla Dum Chicken Tikka Boti', cat: 'dinner', cuisine: 'Barbecue', time: 35 },
    { key: 'pasta', name: 'Creamy Garlic Alfredo Pasta', nameUr: 'Creamy White Sauce Chicken Pasta', cat: 'dinner', cuisine: 'Italian', time: 25 },
    { key: 'pizza', name: 'Artisan Cheesy Pan Pizza', nameUr: 'Homemade Chicken Fajita Pan Pizza', cat: 'dinner', cuisine: 'Italian Fusion', time: 35 },
    { key: 'burger', name: 'Juicy Smash Gourmet Burger', nameUr: 'Double Patty Crispy Chicken Burger', cat: 'lunch', cuisine: 'Fast Food Gourmet', time: 20 },
    { key: 'cake', name: 'Moist Double Chocolate Cake', nameUr: 'Soft Fudgy Chocolate Sponge Cake', cat: 'desserts', cuisine: 'Bakery Special', time: 40 },
    { key: 'daal', name: 'Tarka Dal Tadka Special', nameUr: 'Dhabba Style Desi Ghee Tarka Daal', cat: 'lunch', cuisine: 'Desi Vegetarian', time: 25 },
    { key: 'chai', name: 'Karak Cardamom Matka Chai', nameUr: 'Karak Doodh Patti Elaichi Chai', cat: 'breakfast', cuisine: 'Desi Beverage', time: 10 },
    { key: 'steak', name: 'Herb Butter Sizzling Beef Steak', nameUr: 'Garlic Butter Pan-Seared Beef Steak', cat: 'dinner', cuisine: 'Continental', time: 25 },
    { key: 'fish', name: 'Crispy Lahori Fried Fish', nameUr: 'Crispy Masaledar Lahori Fried Fish', cat: 'dinner', cuisine: 'Seafood Special', time: 25 },
    { key: 'soup', name: 'Hot & Sour Chicken Corn Soup', nameUr: 'Desi Style Chicken Corn Hot & Sour Soup', cat: 'snacks', cuisine: 'Pan-Asian', time: 20 }
  ];

  for (const dish of DISH_MAP) {
    if (lower.includes(dish.key)) {
      return { matched: true, dish, cleanStr };
    }
  }

  return { matched: false, dish: null, cleanStr: cleanStr || raw };
}

// Knowledge Base for Q&A (Supports Roman Urdu, English, Urdu, Hindi, Spanish)
const CULINARY_QA = {
  roman_ur: {
    chicken: [
      "Chicken ko juicy aur tender rakhne ka behtareen tareeqa yeh hai ke pakanay se 15 minute pehle dahi ya halkay namak aur sirke walay pani mein marinate karein. Tez aanch par 5 minute bhunai ke baad dhaanp kar darmiyani aanch par pakayein, aur kaatne se pehle 5 minute rest dein.",
      "Chicken breast ko overcook na karein! Agar aap karahi ya handi bana rahe hain toh aakhir mein 2 chamach dahi ya fresh cream daal kar 3 minute dam lagayein, boti bohat soft aur rasili banegi."
    ],
    biryani: [
      "Khula khula Biryani rice banane ke liye: Chawal ko pehle 30 minute bhigo kar rakhein. Ubaalte waqt pani mein 1 chamach sirka, sabut garam masalay aur thoda oil daalein. Chawal ko 70-80% (1 kani) pakne par chhaan lein aur phir gosht ke sath 15-20 minute halki aanch par dam dein.",
      "Biryani ke masale mein hamesha meetha ittar ya kewra water aur zafran/zarda rang aakhir mein dam ke waqt dalein, behtareen degi khushboo aayegi."
    ],
    rice: [
      "Chawal khilay khilay banane ke liye hamesha Basmati rice ko kam az kam 30 minute pehle paani mein bhigoyen. Chawal aur paani ka ratio 1 cup chawal par 1.75 cup paani rakhein aur ubaal aane ke baad dhak kar bilkul dheemi aanch par dam dein."
    ],
    meat: [
      "Bade gosht (Beef/Mutton) ko jaldi galane ke liye 1 chhota chamach kacha papita paste ya thoda sa meetha soda marination mein shamil karein. Handi mein pakaate waqt dahi aur adrak lehsan ke sath acchi tarah bhunai zaroori hai."
    ],
    chai: [
      "Karak Doodh Patti banane ke liye: Pehle 1/2 cup paani mein patti, 2 elaichi aur daarchini daal kar 2 minute achi tarah ubaalein. Phir 1.5 cup taza gaadha doodh shamil karein aur phent phent kar 3-4 ubaal aane tak pakayein."
    ],
    oil_masala: [
      "Tadkay aur bhunai ka sunehri usool: Sabut masalay (zeera, laung, elaichi) ko pehle garam oil mein 30 second kadkadayen. Pise hue masalay hamesha thoda paani mila kar daalein taake masalay jal na jayein aur rangat laal aye."
    ]
  },
  en: {
    chicken: [
      "For juicy, tender chicken: Brine in salted water or yogurt for 15 minutes before cooking. Sear on high heat for a golden crust, then finish on medium heat until internal temp reaches 165°F (74°C). Rest for 5 minutes before slicing!",
      "To avoid dry chicken breast, don't overcook it. Use gentle poaching or pan-searing with butter and herbs, and always let the juices settle after removing from heat."
    ],
    pasta: [
      "Boil pasta in water that tastes salty like the sea. Cook until al dente (1-2 minutes under package time). Never rinse cooked pasta—always reserve 1/2 cup of starchy pasta water to emulsify your sauce smoothly in the pan."
    ],
    rice: [
      "For fluffy, separated rice grains: Rinse basmati rice until water runs clear, soak for 30 minutes, and cook with a 1:1.75 rice-to-water ratio. Let it rest covered for 10 minutes off heat before fluffing with a fork."
    ],
    baking: [
      "Baking is precise chemistry! Always weigh flour on a digital scale rather than scooping with a cup, use room-temperature eggs and butter, and never open the oven during the first 20 minutes of baking."
    ],
    spices: [
      "Always bloom whole spices (cumin, mustard seeds, cardamom) in hot oil or ghee for 30-45 seconds to extract fat-soluble aromatic oils before adding aromatics like onions and garlic."
    ]
  }
};

export async function answerChefQuestion(arg, maybeLang) {
  await new Promise(r => setTimeout(r, 600));

  let questionText = '';
  let language = 'en';

  if (typeof arg === 'object' && arg !== null) {
    questionText = arg.question || arg.text || arg.query || '';
    language = arg.language || detectLanguage(questionText);
  } else {
    questionText = String(arg || '');
    language = maybeLang || detectLanguage(questionText);
  }

  const detectedLang = detectLanguage(questionText) || language || 'en';
  const lower = questionText.toLowerCase();

  // Roman Urdu Answers
  if (detectedLang === 'roman_ur') {
    if (/chicken|murgh|boti/.test(lower)) {
      const list = CULINARY_QA.roman_ur.chicken;
      return list[Math.floor(Math.random() * list.length)];
    }
    if (/biryani|dum/.test(lower)) {
      const list = CULINARY_QA.roman_ur.biryani;
      return list[Math.floor(Math.random() * list.length)];
    }
    if (/chawal|rice|pulao/.test(lower)) {
      return CULINARY_QA.roman_ur.rice[0];
    }
    if (/gosht|meat|beef|mutton|gala/.test(lower)) {
      return CULINARY_QA.roman_ur.meat[0];
    }
    if (/chai|tea|patti/.test(lower)) {
      return CULINARY_QA.roman_ur.chai[0];
    }
    if (/masala|oil|tarka|bhunai|namak/.test(lower)) {
      return CULINARY_QA.roman_ur.oil_masala[0];
    }
    const genericUr = [
      "Chef ka mashwara: Khana banate waqt har stage par namak aur mirch ka taste zaroor check karein. Agar saalan mein namak zyada ho jaye toh ubla hua aaloo ya 2 chamach dahi shamil karein.",
      "Zaiqaydaar khana banane ka raaz: Pyaaz ko hamesha barabar golden brown karein aur adrak lehsan ko kachapan khatam hone tak 2 minute zaroor bhunein.",
      "Aapka sawal bohat acha hai! Mazid kisi specific dish (jaise Biryani, Karahi, Korma, Pasta, ya Baking) ke baray mein poochen toh main mukammal tareeqa bata sakta hoon."
    ];
    return genericUr[Math.floor(Math.random() * genericUr.length)];
  }

  // English & Multi-language answers
  if (/chicken|breast|sear|tender/.test(lower)) {
    return CULINARY_QA.en.chicken[Math.floor(Math.random() * CULINARY_QA.en.chicken.length)];
  }
  if (/pasta|spaghetti|alfredo/.test(lower)) {
    return CULINARY_QA.en.pasta[0];
  }
  if (/rice|biryani|grains/.test(lower)) {
    return CULINARY_QA.en.rice[0];
  }
  if (/bake|baking|cake|cookie/.test(lower)) {
    return CULINARY_QA.en.baking[0];
  }
  if (/spice|flavor|tarka|oil/.test(lower)) {
    return CULINARY_QA.en.spices[0];
  }

  const genericEn = [
    "Chef's Rule #1: Always taste your food as you cook to balance salt, acidity (lemon/vinegar), and spices properly.",
    "For maximum flavor, sear meats and vegetables over high heat to achieve a caramelized Maillard crust before simmering.",
    "Keep your chef's knife sharp and prep your ingredients beforehand (Mise en Place) for smooth, stress-free cooking!"
  ];
  return genericEn[Math.floor(Math.random() * genericEn.length)];
}

export async function generateAIRecipe(arg, maybeLang) {
  await new Promise(r => setTimeout(r, 700));

  let rawPrompt = 'Chicken, garlic, herbs';
  let category = 'dinner';
  let diet = 'none';
  let maxTime = 30;
  let language = 'en';

  if (typeof arg === 'object' && arg !== null) {
    rawPrompt = arg.ingredients || rawPrompt;
    category = arg.category || category;
    diet = arg.diet || diet;
    maxTime = arg.maxTime || maxTime;
    language = arg.language || detectLanguage(rawPrompt);
  } else {
    rawPrompt = String(arg || rawPrompt);
    language = maybeLang || detectLanguage(rawPrompt);
  }

  const detectedLang = detectLanguage(rawPrompt) || language || 'en';
  const { matched, dish, cleanStr } = extractCulinaryDish(rawPrompt);

  const imagesByDish = {
    biryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
    karahi: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=80',
    korma: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=1000&q=80',
    pasta: 'https://images.unsplash.com/photo-1621996346565-e3d5d628129a?auto=format&fit=crop&w=1000&q=80',
    pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
    burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    cake: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80',
    general: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80'
  };

  let title = '';
  let description = '';
  let ingredients = [];
  let instructions = [];
  let chefNotes = '';
  let cuisine = dish?.cuisine || 'Chef Special';
  let prepTime = 10;
  let cookTime = dish?.time || Math.min(Math.max(parseInt(maxTime) || 25, 15), 45);

  // ════════════════════════════════════════════════════════
  // 1. ROMAN URDU RECIPE GENERATION
  // ════════════════════════════════════════════════════════
  if (detectedLang === 'roman_ur') {
    if (matched && dish) {
      title = dish.nameUr;
      cuisine = dish.cuisine;
      if (dish.key === 'biryani') {
        description = `Zaiqedaar aur khushboodar Chicken Dum Biryani ki mukammal authentic recipe jo har daawat ki shaan ban jaye.`;
        ingredients = [
          { name: 'Basmati Rice (30 min Bhigoye Hue)', amount: 500, unit: 'g' },
          { name: 'Chicken (Medium Pieces)', amount: 600, unit: 'g' },
          { name: 'Pyaaz (Golden Fried)', amount: 2, unit: 'cup' },
          { name: 'Dahi (Feta Hua)', amount: 1, unit: 'cup' },
          { name: 'Adrak Lehsan Paste', amount: 2, unit: 'tbsp' },
          { name: 'Biryani Masala & Sabut Garam Masala', amount: 2, unit: 'tbsp' },
          { name: 'Tamatar (Kate Hue)', amount: 3, unit: 'medium' },
          { name: 'Podina, Hara Dhaniya & Sabz Mirch', amount: 1, unit: 'bunch' },
          { name: 'Kewra Water & Zarda Rang', amount: 1, unit: 'tsp' },
          { name: 'Cooking Oil / Desi Ghee', amount: 0.5, unit: 'cup' }
        ];
        instructions = [
          'Chawal ko namak, sabut garam masalay aur 1 chamach oil ke sath 80% (1 kani) tak ubaal kar chhaan lein.',
          'Paan mein oil garam karein aur adrak lehsan paste ke sath chicken ko 5 minute tez aanch par bhunein.',
          'Tamatar, fried pyaaz, dahi, biryani masala, lal mirch aur namak daal kar 10-12 minute pakayein jab tak chicken gal jaye aur oil upar aa jaye.',
          'Bari handi mein pehle chicken qorma ki layer lagayein, phir ublay hue chawal daalein.',
          'Upar podina, hara dhaniya, kewra water aur zarda rang daal kar dhakkan ko kapray se seal karein.',
          'Dheemi aanch par 15 minute dam dein. Garma-garam Raita aur Salad ke sath pesh karein!'
        ];
        chefNotes = 'Chef ka Mashwara: Chawal ko dam kholte waqt chamach se aahista hilayein taake chawal ke daane tootne na payein.';
      } else if (dish.key === 'karahi') {
        description = `Dhabba style chatpati aur juicy Chicken Karahi jo taaza tamatar, adrak aur kali mirch se tayyar hoti hai.`;
        ingredients = [
          { name: 'Chicken (Karahi Cut)', amount: 750, unit: 'g' },
          { name: 'Tamatar (Darmian se Katay Hue)', amount: 5, unit: 'pieces' },
          { name: 'Adrak Lehsan Paste', amount: 2, unit: 'tbsp' },
          { name: 'Sabz Mirchain (Lambi Kati Hui)', amount: 5, unit: 'pieces' },
          { name: 'Kuti Hui Lal Mirch & Kali Mirch', amount: 1.5, unit: 'tbsp' },
          { name: 'Bhuna Pisa Zeera & Dhaniya', amount: 1.5, unit: 'tbsp' },
          { name: 'Taza Adrak ke Lachhe', amount: 2, unit: 'tbsp' },
          { name: 'Cooking Oil / Ghee', amount: 0.5, unit: 'cup' }
        ];
        instructions = [
          'Karahi mein oil garam karein aur chicken ko adrak lehsan aur 1 tsp namak ke sath 5 minute tez aanch par fry karein jab tak rang safed se halka golden ho jaye.',
          'Tamatar ko do hisson mein kaat kar chicken ke upar ulta rakh dein aur 5 minute dhaanp dein taake chilka narm ho jaye.',
          'Tamatar ke chilkay chimtay se nikaal dein aur chamach se tamatar ko chicken mein achi tarah mash karein.',
          'Tez aanch par tamatar ka paani khushk hone tak bhunai karein.',
          'Kuti lal mirch, kali mirch, bhuna zeera aur sabz mirchain shamil karke 3-4 minute mazid bhunein jab tak oil alag ho jaye.',
          'Taza adrak aur hara dhaniya daal kar garma-garam Naan ya Roghani Roti ke sath serve karein!'
        ];
        chefNotes = 'Chef ka Mashwara: Asal karahi ka zaiqa tez aanch par bhunai aur taaza kali mirch se nikalta hai, is mein paani hargiz na daalein.';
      } else {
        // Generic Desi dish
        title = dish.nameUr;
        description = `Zaiqaydaar ${dish.nameUr} jo bilkul restaurant style mein aasani se ghar par tayyar ho jati hai.`;
        ingredients = [
          { name: 'Main Ingredient / Meat', amount: 500, unit: 'g' },
          { name: 'Pyaaz (Bareek Kati Hui)', amount: 2, unit: 'pieces' },
          { name: 'Tamatar Paste', amount: 2, unit: 'tbsp' },
          { name: 'Adrak Lehsan Paste', amount: 1.5, unit: 'tbsp' },
          { name: 'Desi Masala Mix (Haldi, Mirch, Namak)', amount: 2, unit: 'tbsp' },
          { name: 'Taza Hara Dhaniya', amount: 1, unit: 'handful' },
          { name: 'Cooking Oil / Ghee', amount: 4, unit: 'tbsp' }
        ];
        instructions = [
          'Handi mein oil garam karke pyaaz ko sunehri hone tak fry karein.',
          'Adrak lehsan paste aur main ingredient shamil karke 5 minute achi tarah bhunein.',
          'Tamatar aur tamam masalay daal kar darmiyani aanch par pakayein.',
          'Thoda sa paani shamil karke dhaanp dein aur narm hone tak pakayein.',
          'Aakhir mein hara dhaniya aur garam masala chhidak kar 2 minute dam dein.',
          'Garma-garam roti ya chawal ke sath serve karein.'
        ];
        chefNotes = 'Chef ka Mashwara: Dheemi aanch par pakane se masalon ka zaiqa gosht ke andar tak utar jata hai.';
      }
    } else {
      // Custom Roman Urdu Recipe
      const cleanIngredients = cleanStr.split(',').map(s => s.trim()).filter(Boolean);
      const mainName = cleanIngredients[0] ? cleanIngredients[0].charAt(0).toUpperCase() + cleanIngredients[0].slice(1) : 'Chef Special';
      title = `Laziz ${mainName} Delight`;
      description = `${cleanIngredients.join(', ')} se tayyar kardah aik nihayat lazeez aur aasan dish jo ${cookTime} minute mein ban jati hai.`;
      ingredients = cleanIngredients.map((item, idx) => ({
        name: item.charAt(0).toUpperCase() + item.slice(1),
        amount: idx === 0 ? 1.5 : 1,
        unit: idx === 0 ? 'cup / portion' : 'piece / tbsp'
      }));
      if (ingredients.length < 3) {
        ingredients.push(
          { name: 'Adrak Lehsan Paste', amount: 1, unit: 'tbsp' },
          { name: 'Khas Masala Mix', amount: 1.5, unit: 'tbsp' },
          { name: 'Cooking Oil / Ghee', amount: 3, unit: 'tbsp' }
        );
      }
      instructions = [
        `Tamam ajza (${cleanIngredients.join(', ')}) ko dho kar saaf suthra kaat lein.`,
        'Paan mein oil garam karein aur halki aanch par pehle lehsan adrak ko 1 minute saute karein.',
        `Ab ${cleanIngredients[0] || 'mukhya samagri'} shamil karke 5 minute tak bhunai karein.`,
        'Baqi masalay aur namak shamil karke darmiyani aanch par pakayein.',
        'Halka sa paani daal kar 6-8 minute dhaanp kar pakayein taake tamam zaiqay yakjaan ho jayein.',
        'Garma-garam roti ya paratha ke sath pesh karein aur lutf uthayein.'
      ];
      chefNotes = 'Chef ka Mashwara: Taza sabz mirchain aur lemon juice aakhir mein daalne se zaiqa double ho jata hai.';
    }
  } 
  // ════════════════════════════════════════════════════════
  // 2. ENGLISH & OTHER LANGUAGES
  // ════════════════════════════════════════════════════════
  else {
    if (matched && dish) {
      title = dish.name;
      cuisine = dish.cuisine;
      if (dish.key === 'biryani') {
        description = `Fragrant, royal Dum Biryani featuring tender spiced chicken, caramelized onions, aromatic basmati rice, and saffron essence.`;
        ingredients = [
          { name: 'Aged Long-Grain Basmati Rice', amount: 500, unit: 'g' },
          { name: 'Chicken (Bone-in Curry Cut)', amount: 650, unit: 'g' },
          { name: 'Crispy Fried Onions (Birista)', amount: 1.5, unit: 'cups' },
          { name: 'Greek Yogurt (Whisked)', amount: 1, unit: 'cup' },
          { name: 'Ginger-Garlic Paste', amount: 2, unit: 'tbsp' },
          { name: 'Shahi Biryani Masala & Whole Spices', amount: 2, unit: 'tbsp' },
          { name: 'Fresh Mint & Coriander Leaves', amount: 1, unit: 'cup' },
          { name: 'Saffron strands steeped in warm milk', amount: 3, unit: 'tbsp' },
          { name: 'Ghee or Cooking Oil', amount: 4, unit: 'tbsp' }
        ];
        instructions = [
          'Parboil soaked basmati rice with whole cloves, cardamom, and bay leaf until 75% done (al dente); drain thoroughly.',
          'Marinate chicken in yogurt, ginger-garlic paste, biryani masala, chili, and half the fried onions for 20 minutes.',
          'In a heavy-bottomed pot, sear the marinated chicken with ghee until 80% cooked through.',
          'Layer the drained rice over the chicken gravy, scattering remaining fried onions, mint, coriander, and saffron milk on top.',
          'Seal tightly with foil and lid, then dum-cook on low flame for 15-18 minutes.',
          'Gently fluff from the edges and serve hot with cooling cucumber raita!'
        ];
        chefNotes = "Chef's Secret: Let the pot rest for 5 minutes after cooking before opening the lid to allow the steam to set the grains perfectly.";
      } else if (dish.key === 'karahi') {
        title = 'Authentic Shinwari Chicken Karahi';
        description = 'Traditional wok-tossed chicken cooked exclusively with ripe vine tomatoes, green chilies, ginger juliennes, and freshly cracked black pepper.';
        ingredients = [
          { name: 'Chicken (Karahi Cut)', amount: 750, unit: 'g' },
          { name: 'Vine-Ripened Tomatoes (Halved)', amount: 5, unit: 'medium' },
          { name: 'Fresh Ginger-Garlic Paste', amount: 2, unit: 'tbsp' },
          { name: 'Green Chilies (Slit)', amount: 4, unit: 'pieces' },
          { name: 'Freshly Ground Black Pepper & Cumin', amount: 1.5, unit: 'tbsp' },
          { name: 'Ginger Juliennes & Cilantro', amount: 2, unit: 'tbsp' },
          { name: 'Pure Ghee or Mustard Oil', amount: 0.5, unit: 'cup' }
        ];
        instructions = [
          'Heat oil in a wok (karahi), add chicken and ginger-garlic with 1 tsp salt, and flash-fry on high heat for 5 minutes.',
          'Place halved tomatoes cut-side down over the chicken, cover, and steam for 5 minutes until skins loosen.',
          'Peel off tomato skins with tongs, then crush the pulp vigorously into the pan juices.',
          'Cook on high heat until the tomato water evaporates and the gravy reduces to a thick glaze.',
          'Toss in crushed black pepper, cumin, and slit green chilies, stirring continuously until oil separates.',
          'Garnish with fresh ginger strips and cilantro, serving immediately with hot tandoori naan.'
        ];
        chefNotes = "Chef's Secret: Authentic Karahi never uses onions—the entire rich gravy comes from reduced caramelized tomatoes and high-heat wok frying.";
      } else {
        // Other matched dishes in English
        title = dish.name;
        description = `Chef-crafted ${dish.name} prepared with balanced seasonings, vibrant aromatics, and restaurant-grade technique.`;
        ingredients = [
          { name: 'Primary Protein / Base', amount: 500, unit: 'g' },
          { name: 'Fresh Aromatics (Garlic, Herbs)', amount: 2, unit: 'tbsp' },
          { name: 'Extra Virgin Olive Oil / Ghee', amount: 3, unit: 'tbsp' },
          { name: 'Signature Seasoning Blend', amount: 1.5, unit: 'tbsp' },
          { name: 'Fresh Vegetables / Sides', amount: 1.5, unit: 'cups' }
        ];
        instructions = [
          'Prep and dice all ingredients uniformly for even heat distribution.',
          'Preheat skillet or pan over medium-high heat with cooking oil.',
          'Sear the primary protein until golden-brown and caramelized.',
          'Incorporate seasonings, aromatics, and sauces, simmering until tender.',
          'Rest for 3 minutes before plating to retain juices, then garnish and serve.'
        ];
        chefNotes = "Chef's Secret: Always balance savory dishes with a final splash of fresh citrus or cold butter for a velvety restaurant finish.";
      }
    } else {
      // General custom ingredients in English
      const cleanIngredients = cleanStr.split(',').map(s => s.trim()).filter(Boolean);
      const p = cleanIngredients[0] ? cleanIngredients[0].charAt(0).toUpperCase() + cleanIngredients[0].slice(1) : 'Seasonal Medley';
      const s = cleanIngredients[1] ? cleanIngredients[1].charAt(0).toUpperCase() + cleanIngredients[1].slice(1) : 'Garlic Herb';
      title = `Artisan Pan-Seared ${p} with ${s}`;
      description = `A gourmet, nutrient-dense recipe designed around ${cleanIngredients.join(', ')}, finished with extra virgin olive oil and fragrant aromatics in ${cookTime} minutes.`;
      ingredients = cleanIngredients.map((item, idx) => ({
        name: item.charAt(0).toUpperCase() + item.slice(1),
        amount: idx === 0 ? 1.5 : 1,
        unit: idx === 0 ? 'cup / portion' : 'portion / tbsp'
      }));
      if (ingredients.length < 3) {
        ingredients.push(
          { name: 'Minced Garlic & Herbs', amount: 1.5, unit: 'tbsp' },
          { name: 'Extra Virgin Olive Oil', amount: 2, unit: 'tbsp' },
          { name: 'Sea Salt & Black Pepper', amount: 1, unit: 'pinch' }
        );
      }
      instructions = [
        `Rinse, trim, and slice ${cleanIngredients.join(', ')} into uniform bite-sized pieces.`,
        'Heat 2 tablespoons of extra virgin olive oil in a heavy skillet over medium-high heat.',
        `Add ${cleanIngredients[0] || 'main ingredient'} and sear for 4-5 minutes until golden and fragrant.`,
        'Toss in the remaining ingredients, garlic, sea salt, and black pepper, stirring to coat evenly.',
        'Lower the heat, cover with lid, and let simmer for 6-8 minutes until tender and caramelized.',
        'Plate immediately, drizzle with pan juices, garnish with fresh herbs, and serve hot.'
      ];
      chefNotes = "Chef's Secret: Deglaze the pan with a spoonful of broth or lemon water at the end to lift all the rich caramelized fond into your sauce!";
    }
  }

  const recipeId = `ai-recipe-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const chosenImage = imagesByDish[dish?.key] || imagesByDish.general;

  return {
    id: recipeId,
    title,
    category: category || dish?.cat || 'dinner',
    cuisine,
    prepTime,
    cookTime,
    totalTime: prepTime + cookTime,
    servings: 4,
    difficulty: 'Easy-Medium',
    rating: 5.0,
    reviewsCount: Math.floor(Math.random() * 20) + 12,
    image: chosenImage,
    description,
    ingredients,
    instructions,
    steps: instructions,
    chefNotes,
    chefNote: chefNotes,
    calories: Math.floor(Math.random() * 250) + 380,
    nutrition: {
      protein: '28g',
      carbs: '34g',
      fat: '14g',
      fiber: '5g'
    },
    tags: [
      'AI Chef Special',
      cuisine,
      `${cookTime} Mins`
    ]
  };
}

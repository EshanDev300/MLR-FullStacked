export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'hi', name: 'Hindi' },
  { code: 'de', name: 'German' },
  { code: 'fr', name: 'French' }
];

export const detectLanguage = (text) => {
  if (!text) return 'en';
  const lowerText = text.toLowerCase();
  
  if (/[\u0900-\u097F]/.test(text) || lowerText.match(/\b(kya|kaise|hai|mujhe|banaye|karo|sabzi|roti)\b/)) return 'hi';
  if (lowerText.match(/\b(el|la|los|las|un|una|como|qué|por qué|receta|cocinar|hacer|horno)\b/)) return 'es';
  if (lowerText.match(/\b(comment|pourquoi|recette|le|la|les|un|une|cuire|faire)\b/)) return 'fr';
  if (lowerText.match(/\b(wie|was|warum|rezept|der|die|das|ein|eine|kochen|backen)\b/)) return 'de';
  
  return 'en';
};

export const isChefQuestion = (text) => {
  if (!text) return false;
  const qWords = ['how', 'what', 'why', 'can', 'should', 'is', 'does', 'do', 'como', 'qué', 'kya', 'kaise', 'wie', 'was', 'comment'];
  const lower = text.toLowerCase().trim();
  return text.includes('?') || qWords.some(w => lower.startsWith(w));
};

const KNOWLEDGE_BASE = {
  en: {
    baking: [
      "For perfect baking, always measure flour by weight rather than volume.",
      "Room temperature eggs and butter are crucial for baking to ensure smooth mixing.",
      "Don't open the oven door too early while baking, or your cake might collapse!"
    ],
    grilling: [
      "Always preheat your grill and oil the grates before adding your food.",
      "For the perfect grill marks, rotate your meat 45 degrees halfway through cooking on each side.",
      "Let your grilled meats rest for at least 5 minutes before slicing to retain juices."
    ],
    sauces: [
      "To fix a broken sauce, whisk in a tablespoon of boiling water or heavy cream.",
      "Always simmer tomato sauces for at least 30 minutes to reduce acidity.",
      "A classic roux is equal parts fat and flour by weight, cooked until it smells nutty."
    ],
    spices: [
      "Toast whole spices in a dry pan until fragrant before grinding for maximum flavor.",
      "Store your spices in a cool, dark place to keep them fresh longer.",
      "Add delicate herbs like basil or cilantro at the very end of cooking."
    ],
    "knife techniques": [
      "Keep your knives sharp! A dull knife is more dangerous than a sharp one.",
      "Use the 'claw grip' with your non-knife hand to protect your fingertips.",
      "Let the weight of the knife do the work when slicing; don't force it down."
    ],
    "food safety": [
      "Always wash your hands and sanitize cutting boards after handling raw meat.",
      "Keep hot foods above 140°F (60°C) and cold foods below 40°F (4°C).",
      "When in doubt, throw it out. Never taste food to check if it has spoiled."
    ],
    nutrition: [
      "Incorporate a rainbow of vegetables in your meals for a wide range of vitamins.",
      "Swap refined grains for whole grains to increase fiber intake.",
      "Healthy fats from avocados and nuts are essential for nutrient absorption."
    ],
    fermentation: [
      "Always ensure your vegetables stay completely submerged in the brine to prevent mold.",
      "Temperature matters: keep your ferments around 65-72°F for the best results.",
      "Use non-iodized salt (like sea salt or kosher salt) for fermentation."
    ],
    desserts: [
      "A pinch of salt in sweet desserts enhances the overall flavor profile.",
      "Chill your cookie dough for at least an hour before baking for thicker cookies.",
      "Melt chocolate gently over a double boiler to prevent it from seizing."
    ],
    soups: [
      "Build flavor by sautéing aromatics (onions, carrots, celery) before adding liquids.",
      "If your soup is too salty, add a splash of acid like lemon juice or vinegar to balance it.",
      "Simmer soups gently instead of boiling them to keep the broth clear."
    ],
    salads: [
      "Dry your greens thoroughly before dressing them so the dressing adheres well.",
      "Dress your salad right before serving to keep the leaves crisp.",
      "Balance your salad with a mix of textures: crunchy, soft, chewy, and crisp."
    ],
    marinades: [
      "Don't marinate seafood with acidic ingredients for more than 30 minutes or it will turn mushy.",
      "Score thicker cuts of meat to help the marinade penetrate deeper.",
      "Always discard leftover marinade that has touched raw meat, unless you boil it first."
    ],
    "meal prep": [
      "Batch cook versatile grains like quinoa or rice to use throughout the week.",
      "Store prepped vegetables in airtight containers with a damp paper towel to maintain crispness.",
      "Label your containers with dates so you know exactly when food was prepared."
    ],
    "kitchen equipment": [
      "Never put cast iron pans in the dishwasher; clean them with water and a brush, then oil them.",
      "A heavy-bottomed stainless steel skillet is perfect for searing and creating pan sauces.",
      "Use wooden or silicone utensils on non-stick pans to prevent scratching."
    ],
    "cooking temperatures": [
      "Poultry should always reach an internal temperature of 165°F (74°C).",
      "For a perfect medium-rare steak, aim for an internal temp of 130-135°F.",
      "Fish is done when it is opaque and flakes easily with a fork."
    ],
    "flavor pairing": [
      "Pair rich, fatty dishes with something acidic (like lemon or vinegar) to cut through the richness.",
      "Sweet and salty is a classic combo; try a sprinkle of flaky sea salt on chocolate.",
      "Earthy flavors like mushrooms pair wonderfully with herbs like thyme and rosemary."
    ]
  },
  es: {
    baking: ["Mide la harina por peso en lugar de volumen para una cocción perfecta.", "Usa huevos a temperatura ambiente para mezclar mejor."],
    grilling: ["Precalienta la parrilla y engrasa las rejillas.", "Deja reposar la carne asada por 5 minutos antes de cortarla."],
    sauces: ["Hierve a fuego lento las salsas de tomate para reducir la acidez.", "Agrega crema espesa para arreglar una salsa cortada."],
    spices: ["Tuesta las especias enteras antes de molerlas.", "Guarda las especias en un lugar oscuro y fresco."],
    "knife techniques": ["Mantén tus cuchillos afilados, es más seguro.", "Usa el agarre de garra para proteger tus dedos."],
    "food safety": ["Lava siempre tus manos después de tocar carne cruda.", "Mantén los alimentos fríos por debajo de 4°C."],
    nutrition: ["Come un arcoíris de verduras para obtener vitaminas.", "Cambia los granos refinados por granos enteros."],
    fermentation: ["Mantén los vegetales sumergidos en la salmuera.", "Usa sal sin yodo para fermentar."],
    desserts: ["Una pizca de sal mejora los postres dulces.", "Refrigera la masa de galletas antes de hornear."],
    soups: ["Saltea los aromáticos (cebolla, zanahoria, apio) antes de añadir líquido.", "Si la sopa está muy salada, añade un poco de limón."],
    salads: ["Seca bien las hojas antes de añadir el aderezo.", "Aliña la ensalada justo antes de servir."],
    marinades: ["No marines mariscos con ácidos por más de 30 minutos.", "Haz cortes en la carne gruesa para que penetre el adobo."],
    "meal prep": ["Cocina granos en lotes para usar en la semana.", "Pon etiquetas con la fecha en tus contenedores."],
    "kitchen equipment": ["No laves sartenes de hierro fundido en el lavavajillas.", "Usa utensilios de madera en sartenes antiadherentes."],
    "cooking temperatures": ["El pollo debe alcanzar siempre 74°C internamente.", "El pescado está listo cuando se desmenuza fácilmente."],
    "flavor pairing": ["Equilibra lo graso con algo ácido como el limón.", "Dulce y salado es una combinación clásica."]
  },
  hi: {
    baking: ["Baking ke liye hamesha maida ko vajan se napein.", "Eggs aur butter ko room temperature par rakhein."],
    grilling: ["Grill ko pehle se garam karein aur tel lagayein.", "Meat ko katne se pehle 5 minute aaram karne dein."],
    sauces: ["Tomato sauce ko acidity kam karne ke liye 30 minute tak ubaalein."],
    spices: ["Masalo ko peesne se pehle thoda bhun lein.", "Masalo ko thandi aur andheri jagah par rakhein."],
    "knife techniques": ["Chaku ko tez rakhein, tez chaku zyada surakshit hota hai."],
    "food safety": ["Kaccha meat chune ke baad haath zarur dhoye."],
    nutrition: ["Bhojan mein rang-birangi sabziyan shamil karein."],
    fermentation: ["Sabziyon ko pani mein dubo kar rakhein taaki fafundi na lage."],
    desserts: ["Meethe mein ek chutki namak swaad badhata hai."],
    soups: ["Soup mein pyaz aur gajar ko pehle bhun lein."],
    salads: ["Salad dressing dalne se pehle patto ko sookhne dein."],
    marinades: ["Seafood ko 30 minute se zyada marinate na karein."],
    "meal prep": ["Chawal aur quinoa ek saath bana kar rakh lein."],
    "kitchen equipment": ["Cast iron pan ko dishwasher mein na dhoye."],
    "cooking temperatures": ["Chicken ko hamesha achhi tarah paka hona chahiye."],
    "flavor pairing": ["Fatty khane ke sath nimbu ka ras istemal karein."]
  }
};

const GENERIC_TIPS = {
  en: [
    "A clean workspace makes cooking twice as easy!",
    "Taste your food as you cook to adjust seasoning.",
    "Don't overcrowd the pan if you want a good sear.",
    "Always read a recipe all the way through before you start cooking."
  ],
  es: [
    "¡Un espacio limpio hace que cocinar sea más fácil!",
    "Prueba tu comida mientras cocinas para ajustar la sazón.",
    "No llenes demasiado la sartén si quieres dorar bien la comida."
  ],
  hi: [
    "Khana banate waqt safai ka dhyan rakhein!",
    "Pakaate samay namak chakhte rahein.",
    "Pan mein ek saath zyada chizein na dalein."
  ]
};

const getRandomVariant = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const answerChefQuestion = (question, language = 'en') => {
  const detectedLang = detectLanguage(question) || language;
  const langKey = KNOWLEDGE_BASE[detectedLang] ? detectedLang : 'en';
  
  const lowerQuestion = question.toLowerCase();
  let matchedTopic = null;
  
  const keywords = {
    baking: ['bake', 'cake', 'flour', 'cookie', 'bread', 'oven', 'hornear', 'pastel'],
    grilling: ['grill', 'bbq', 'charcoal', 'barbecue', 'parrilla', 'asar'],
    sauces: ['sauce', 'gravy', 'roux', 'salsa'],
    spices: ['spice', 'herb', 'seasoning', 'salt', 'pepper', 'especias', 'masala'],
    "knife techniques": ['knife', 'cut', 'slice', 'chop', 'dice', 'cuchillo', 'chaku'],
    "food safety": ['safe', 'spoil', 'mold', 'bacteria', 'raw', 'wash', 'seguro'],
    nutrition: ['healthy', 'vitamin', 'protein', 'diet', 'saludable', 'nutrition'],
    fermentation: ['ferment', 'kombucha', 'kimchi', 'kraut'],
    desserts: ['dessert', 'sweet', 'chocolate', 'sugar', 'postre', 'meetha'],
    soups: ['soup', 'broth', 'stew', 'sopa'],
    salads: ['salad', 'lettuce', 'dressing', 'ensalada'],
    marinades: ['marinade', 'marinate', 'soak'],
    "meal prep": ['prep', 'store', 'batch', 'container'],
    "kitchen equipment": ['pan', 'pot', 'skillet', 'blender', 'sartén'],
    "cooking temperatures": ['temp', 'heat', 'boil', 'simmer', 'degrees'],
    "flavor pairing": ['pair', 'flavor', 'taste', 'match', 'sabor']
  };

  for (const [topic, words] of Object.entries(keywords)) {
    if (words.some(w => lowerQuestion.includes(w))) {
      matchedTopic = topic;
      break;
    }
  }

  if (matchedTopic && KNOWLEDGE_BASE[langKey][matchedTopic]) {
    return getRandomVariant(KNOWLEDGE_BASE[langKey][matchedTopic]);
  }

  return getRandomVariant(GENERIC_TIPS[langKey] || GENERIC_TIPS['en']);
};

const RECIPE_TITLES = {
  en: ["Sizzling %s Delight", "Chef's Special %s", "Rustic %s Feast", "Ultimate %s Medley", "Gourmet %s Creation"],
  es: ["Delicia de %s", "Especial del Chef: %s", "Banquete Rústico de %s", "Mezcla Suprema de %s", "Creación Gourmet de %s"],
  hi: ["Chatpata %s", "Chef ki Khas %s", "Mazedar %s ki Dawath", "Special %s", "Shahi %s"]
};

const CHEF_NOTES = {
  en: [
    "Don't forget to garnish with fresh herbs!",
    "Serve hot with a side of toasted bread.",
    "Adjust the salt and spices to your liking.",
    "This dish pairs wonderfully with a light salad."
  ],
  es: [
    "¡No olvides decorar con hierbas frescas!",
    "Sirve caliente con un poco de pan tostado.",
    "Ajusta la sal y especias a tu gusto."
  ],
  hi: [
    "Taza dhaniya dalna na bhoolein!",
    "Garam padosiye.",
    "Namak aur mirch apne swaad anusar dalein."
  ]
};

export const generateAIRecipe = (ingredientsStr, language = 'en') => {
  const detectedLang = detectLanguage(ingredientsStr);
  const langKey = RECIPE_TITLES[detectedLang] ? detectedLang : (RECIPE_TITLES[language] ? language : 'en');
  
  const ingredientsList = ingredientsStr.split(',').map(i => i.trim()).filter(Boolean);
  const mainIngredient = ingredientsList.length > 0 ? ingredientsList[0] : (langKey === 'es' ? 'Ingredientes' : langKey === 'hi' ? 'Samagri' : 'Ingredients');
  
  const titleTemplate = getRandomVariant(RECIPE_TITLES[langKey]);
  const title = titleTemplate.replace('%s', mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1));
  
  const calories = Math.floor(Math.random() * (600 - 250 + 1) + 250);
  const protein = Math.floor(Math.random() * (40 - 10 + 1) + 10);
  const carbs = Math.floor(Math.random() * (60 - 20 + 1) + 20);
  const fat = Math.floor(Math.random() * (30 - 5 + 1) + 5);
  
  const stepsEn = [
    `Wash and prep your ${ingredientsList.join(', ')}.`,
    "Heat a pan over medium heat with a splash of oil.",
    `Add the ${ingredientsList[0] || 'main ingredient'} and sauté for 5 minutes.`,
    "Stir in the remaining ingredients and cook until tender.",
    "Season generously with salt, pepper, and your favorite spices.",
    "Plate beautifully and serve immediately."
  ];
  
  const stepsEs = [
    `Lava y prepara: ${ingredientsList.join(', ')}.`,
    "Calienta una sartén a fuego medio con un poco de aceite.",
    `Añade ${ingredientsList[0] || 'el ingrediente principal'} y saltea por 5 minutos.`,
    "Agrega el resto de los ingredientes y cocina hasta que estén tiernos.",
    "Sazona con sal, pimienta y tus especias favoritas.",
    "Sirve inmediatamente."
  ];
  
  const stepsHi = [
    `${ingredientsList.join(', ')} ko dho kar taiyaar karein.`,
    "Ek pan mein thoda tel daal kar garam karein.",
    `${ingredientsList[0] || 'mukhya samagri'} daalein aur 5 minute tak bhunein.`,
    "Baki samagri daalein aur pakaayein.",
    "Swaadanusar namak aur masale daalein.",
    "Garma-garam parosein."
  ];
  
  let steps;
  if (langKey === 'es') steps = stepsEs;
  else if (langKey === 'hi') steps = stepsHi;
  else steps = stepsEn;

  return {
    title,
    ingredients: ingredientsList.length ? ingredientsList : ['Assorted ingredients'],
    steps,
    nutrition: {
      calories: calories,
      protein: `${protein}g`,
      carbs: `${carbs}g`,
      fat: `${fat}g`
    },
    chefNote: getRandomVariant(CHEF_NOTES[langKey] || CHEF_NOTES['en']),
    language: langKey
  };
};

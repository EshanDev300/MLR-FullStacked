// Multilingual AI Chef Recipe Suggestion & Culinary Intelligence Engine

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
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

  // Unicode scripts detection
  if (/[\u0600-\u06ff]/.test(val)) {
    // Urdu vs Arabic heuristics
    if (/\b(hai|kya|kaise|karna|chahiye|mein|ka|ki|banaun|shukriya)\b/i.test(val) || /[\u0679\u0686\u0698\u06af\u06ba\u06d2]/.test(val)) {
      return 'ur';
    }
    return 'ar';
  }
  if (/[\u0900-\u097f]/.test(val)) return 'hi';
  if (/[\u3040-\u30ff]/.test(val)) return 'ja';
  if (/[\u4e00-\u9fff]/.test(val)) return 'zh';

  // Romanized Hindi / Urdu detection
  if (/\b(kya|kaise|banaun|banaye|karen|chahiye|swaad|namak|tel|pani|batao|masala|roti|sabzi|gosht|chawal)\b/i.test(lower)) {
    return 'hi';
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
    'cómo', 'como', 'qué', 'que', 'por qué', 'cuánto', 'puedo', 'debo',
    'comment', 'pourquoi', 'puis-je', 'est-ce',
    'wie', 'was', 'warum', 'kann', 'sollte',
    'come', 'cosa', 'perché', 'posso',
    'kya', 'kaise', 'kyun', 'kab', 'kahan', 'batao',
    'ما', 'كيف', 'لماذا', 'هل', 'كم',
    '怎么', '如何', '什么', '为什么',
    'どう', 'なぜ', '何', 'いかに'
  ];
  const lower = text.toLowerCase().trim();
  return /[?؟]/.test(text) || qWords.some(w => lower.startsWith(w) || lower.includes(` ${w} `));
}

const TOPIC_RESPONSES = {
  pasta: {
    en: [
      "Always boil pasta in generously salted water (it should taste like the sea). Cook until al dente—usually 1-2 minutes less than package instructions. Never rinse pasta after draining; preserve 1/2 cup of starchy pasta water to emulsify your sauce smoothly.",
      "The secret to restaurant-quality pasta is finishing it directly inside the sauce pan with a splash of hot pasta cooking water and a knob of cold butter or olive oil for a glossy sheen.",
      "Match pasta shapes to sauce weight: light tomato or olive oil sauces pair best with long thin strands like spaghetti, while hearty ragùs and chunky sauces cling best to ridged tubes like rigatoni or penne."
    ],
    es: [
      "Cuece la pasta en agua muy salada hasta que esté 'al dente' (1-2 minutos menos que el paquete). Nunca la enjuagues y guarda media taza del agua de cocción para emulsionar tu salsa a la perfección.",
      "El gran secreto del chef: termina de cocinar la pasta dentro de la sartén con la salsa caliente, añadiendo un chorrito de agua de la pasta y queso rallado para un brillo sedoso."
    ],
    hi: [
      "पास्ता को हमेशा अच्छे से नमकीन पानी में 'अल दांते' (हल्का टाइट) उबालें। पानी छानने के बाद पास्ता को ठंडे पानी से न धोएं, बल्कि थोड़ा उबला हुआ स्टार्च वाला पानी सॉस में मिलाकर क्रीमी टेक्सचर पाएं।",
      "सॉस को और स्वादिष्ट बनाने के लिए पके हुए पास्ता को सीधे पैन में सॉस के साथ 1 मिनट तक टॉस करें और ऊपर से एक्स्ट्रा वर्जिन ऑलिव ऑयल डालें।"
    ],
    ur: [
      "پاستا کو ہمیشہ نمکین ابلتے پانی میں پکائیں۔ چھاننے کے بعد ٹھنڈے پانی سے نہ دھوئیں اور تھوڑا سا پاستا والا پانی سوس میں شامل کریں تاکہ کریمی ذائقہ آئے۔",
      "بہترین پاستا بنانے کا راز یہ ہے کہ اسے چھان کر براہ راست گرم سوس والے پین میں 1 منٹ کے لیے ٹاس کریں۔"
    ],
    fr: [
      "Faites cuire les pâtes dans une eau généreusement salée jusqu'à consistance 'al dente'. Gardez toujours une louche d'eau de cuisson pour lier et émulsionner parfaitement votre sauce.",
      "Le secret des chefs : terminez la cuisson des pâtes directement dans la poêle avec la sauce chaude et un filet d'huile d'olive."
    ],
    de: [
      "Koche Pasta in reichlich gesalzenem Wasser bis sie 'al dente' ist. Bewahre etwas Nudelwasser auf, um deine Sauce seidig und cremig zu binden.",
      "Das Küchengeheimnis: Schwenke die Nudeln direkt in der heißen Pfanne mit der Sauce und etwas frischem Parmesan."
    ]
  },
  chicken: {
    en: [
      "For juicy chicken breast every time, brine it in salted water for 15 minutes before cooking, sear on high heat to get a golden crust, and ensure internal temperature hits 165°F (74°C). Let it rest 5 minutes before slicing!",
      "To avoid dry chicken, use an instant-read meat thermometer and pull it off heat at 160°F—residual heat will carry it to the safe 165°F while locking in natural juices.",
      "For crispy-skin pan-seared chicken thighs, start skin-side down in a cold, dry skillet over medium-low heat to render the fat slowly until shatteringly crisp."
    ],
    es: [
      "Para pechugas de pollo jugosas, sumérgelas en salmuera durante 15 minutos, sella a fuego alto hasta dorar y retira al alcanzar 74°C. ¡Déjalas reposar 5 minutos antes de cortar!",
      "Cocina los muslos de pollo empezando con la piel hacia abajo en sartén fría para extraer la grasa lentamente y lograr una piel crujiente inigualable."
    ],
    hi: [
      "चिकन को जूसी रखने के लिए पकाने से 15 मिनट पहले नमक के पानी में मैरीनेट करें। इसे तेज आंच पर सुनहरा भूनें और काटने से पहले 5 मिनट रेस्ट करने दें ताकि जूसेस अंदर सील हो जाएं।",
      "चिकन ब्रेस्ट को ओवरकुक न करें। धीमी आंच पर ढककर पकाने से यह अंदर तक कोमल और रसीला बनता है।"
    ],
    ur: [
      "چکن کو نرم اور رسیلا رکھنے کے لیے پکانے سے پہلے 15 منٹ دہی یا نمکین پانی میں میرینیٹ کریں۔ کاٹنے سے پہلے 5 منٹ ٹھہرنے دیں تاکہ ذائقہ برقرار رہے۔",
      "چکن بریسٹ کو زیادہ نہ پکائیں، درمیانی آنچ پر ڈھانپ کر پکانے سے بوٹیاں اندر تک نرم رہتی ہیں۔"
    ],
    fr: [
      "Pour un poulet ultra-juteux, faites-le dorer à feu vif puis baissez la température jusqu'à 74°C à cœur. Laissez reposer 5 minutes avant de découper.",
      "Faites mariner vos blancs de poulet avec du yaourt, du citron et de l'ail pour attendrir la viande naturellement."
    ],
    de: [
      "Für saftiges Hähnchenfleisch brate es scharf an und gare es sanft bis 74°C Kerntemperatur. Vor dem Anschneiden 5 Minuten ruhen lassen.",
      "Eine Marinade aus Joghurt, Zitrone und Kräutern macht Hähnchenbrust wunderbar zart."
    ]
  },
  substitute: {
    en: [
      "Need a replacement? For Heavy Cream: use whole milk + melted butter or blended silken tofu. For Eggs in baking: use 1/4 cup unsweetened applesauce or 1 tbsp ground flaxseed mixed with 3 tbsp water per egg.",
      "For Buttermilk: mix 1 cup milk with 1 tbsp lemon juice or white vinegar and rest 5 minutes. For Cornstarch: use twice the amount of all-purpose flour.",
      "For Fresh Herbs vs Dried: use 1 teaspoon dried herbs for every 1 tablespoon of fresh herbs (a 1:3 ratio)."
    ],
    es: [
      "¿Sustitutos rápidos? Para crema de leche: leche entera con mantequilla derretida. Para huevos en repostería: 1/4 taza de puré de manzana o semillas de chía hidratadas. Para suero de leche: 1 taza de leche con 1 cucharada de limón.",
      "Para hierbas secas en lugar de frescas: usa 1 cucharadita de hierba seca por cada cucharada de hierba fresca (proporción 1:3)."
    ],
    hi: [
      "सामग्री का विकल्प: क्रीम की जगह मलाई + दूध फेंटकर इस्तेमाल करें। बेकिंग में अंडे की जगह 1/4 कप दही या सेब की प्यूरी लें। बटरमिल्क (छाछ) के लिए 1 कप दूध में 1 चम्मच नींबू का रस मिलाकर 5 मिनट रखें।",
      "कॉर्नस्टार्च की जगह अरारोट या दोगुना मैदा इस्तेमाल किया जा सकता है।"
    ],
    ur: [
      "متبادل اجزاء: ہیوی کریم کی جگہ دودھ میں مکھن ملائیں۔ بیکنگ میں انڈے کی جگہ دہی یا کیلا میش کرکے ڈالیں۔ خشک جڑی بوٹیوں کی مقدار تازہ سے تہائی رکھیں۔",
      "بٹر ملک بنانے کے لیے ایک کپ دودھ میں ایک چمچ لیموں کا رس ملا کر 5 منٹ رکھ دیں۔"
    ],
    fr: [
      "Remplacement d'ingrédients : Pour la crème fraîche, utilisez du yaourt grec ou du lait + beurre. Pour remplacer un œuf en pâtisserie, utilisez 1/4 de compote de pommes.",
      "Pour le babeurre : 1 tasse de lait avec 1 cuillère à soupe de jus de citron, laissez reposer 5 minutes."
    ],
    de: [
      "Zutaten-Ersatz: Für Schlagsahne eignet sich Vollmilch mit geschmolzener Butter. Für Eier beim Backen nimm 1/4 Tasse Apfelmus pro Ei.",
      "Für Buttermilch: 1 Tasse Milch mit 1 EL Zitronensaft 5 Minuten stehen lassen."
    ]
  },
  baking: {
    en: [
      "Baking is pure culinary chemistry! Always weigh dry ingredients (especially flour) with a digital scale for consistency, ensure butter and eggs are at true room temperature, and avoid over-mixing your batter.",
      "To prevent cakes from sticking, brush pans with homemade cake goop (equal parts flour, shortening/butter, and vegetable oil) instead of simple cooking spray.",
      "Always chill cookie dough for at least 24 hours before baking—this hydrates the flour, concentrates the butter solids, and produces rich toffee-caramel undertones."
    ],
    es: [
      "¡La repostería es ciencia! Pesa la harina en lugar de medir por tazas, usa huevos y mantequilla a temperatura ambiente, y nunca batas de más la masa para que quede esponjosa.",
      "Enfría la masa de galletas en el refrigerador al menos 1 hora antes de hornear para lograr bordes crujientes y un centro suave."
    ],
    hi: [
      "बेकिंग के लिए हमेशा सामग्री का वजन तौलकर लें। अंडे और मक्खन को कमरे के तापमान पर रखें और केक के बैटर को ज्यादा न फेंटें ताकि वह स्पंजी बने।",
      "ओवन को हमेशा पहले से 10-15 मिनट प्री-हीट करें ताकि केक बराबर फूले।"
    ],
    ur: [
      "بیکنگ کے لیے میدہ اور چینی تول کر استعمال کریں۔ مکھن اور انڈے کمرے کے درجہ حرارت پر ہوں اور اوون کو پہلے سے گرم کرنا لازمی ہے۔"
    ]
  },
  spices: {
    en: [
      "Bloom whole spices in hot oil or ghee for 30-45 seconds to release fat-soluble aromatic oils before adding vegetables or meat. Add ground spices with a splash of liquid so they don't burn.",
      "Toast whole cumin, coriander, and cardamom in a dry skillet until fragrant before grinding them for 10x more depth and fragrance.",
      "Salt enhances flavor, acid (lemon/vinegar) brightens and cuts richness, while a tiny pinch of sugar balances bitter earthy spices."
    ],
    es: [
      "Tuesta las especias enteras (comino, cilantro, pimienta) en una sartén seca antes de molerlas para despertar sus aceites aromáticos.",
      "Añade las especias en polvo a fuego medio con un toque de líquido o grasa para evitar que se quemen y amarguen."
    ],
    hi: [
      "मसालों को पहले तेल या घी में 30 सेकंड 'तड़का' देकर भूनें ताकि उनकी खुशबूदार ऑयल्स बाहर आएं। पिसे मसालों को थोड़ा पानी मिलाकर डालें ताकि वे जलें नहीं।",
      "साबुत धनिया और जीरा को हल्का सूखा भूनकर पीसने से करी का स्वाद दस गुना बढ़ जाता है।"
    ],
    ur: [
      "مصالحوں کو گھی یا تیل میں ہلکا سا تڑکا لگائیں تاکہ ان کی خوشبو نکلے۔ پسی ہوئی مرچ اور دھنیا ڈالتے وقت تھوڑا پانی ڈالیں تاکہ مصالحہ جلے نہ۔"
    ]
  },
  storage: {
    en: [
      "Store fresh herbs like a bouquet of flowers: trim the stems, place them in a small jar with 1 inch of water, and loosely cover with a plastic bag in the fridge (except basil, which thrives at room temp).",
      "Cool cooked food to room temperature within 2 hours, store in airtight glass containers, and consume within 3-4 days in the fridge or freeze for up to 3 months.",
      "Keep onions, potatoes, and garlic in a cool, dark, well-ventilated spot—never refrigerate raw potatoes or store onions right next to potatoes."
    ],
    es: [
      "Guarda las hierbas frescas como flores en un frasco con agua en el refrigerador (excepto la albahaca, que prefiere temperatura ambiente).",
      "Refrigera las sobras en recipientes herméticos dentro de las 2 horas posteriores a la cocción y consúmelas en un plazo de 3 a 4 días."
    ],
    hi: [
      "ताज़ा धनिये और पुदीने को डंठल काटकर पानी के छोटे गिलास में रखें और फ्रिज में स्टोर करें। पके हुए खाने को 2 घंटे में ठंडा करके एयरटाइट डब्बे में 3-4 दिन तक रखें।",
      "आलू और प्याज को कभी एक साथ न रखें, उन्हें खुली और सूखी जगह पर अलग-अलग रखें।"
    ],
    ur: [
      "تازہ دھنیا اور پودینہ پانی کے برتن میں رکھ کر فریج میں محفوظ کریں۔ پکا ہوا کھانا 3 سے 4 دن میں استعمال کر لیں۔"
    ]
  }
};

const GENERIC_TIPS = {
  en: [
    "Chef's Rule #1: Taste your food at every stage of cooking and adjust salt, acid (lemon/vinegar), and heat accordingly.",
    "Keep your chef's knife razor-sharp. A dull blade slips and crushes ingredients, while a sharp knife cuts cleanly and safely.",
    "Never crowd your pan! Overcrowded ingredients steam in their own juices instead of developing that delicious caramelized Maillard crust.",
    "Rest seared meats (steaks, chicken, pork) for 5-8 minutes after cooking so the savory juices redistribute throughout the fibers.",
    "A clean, organized prep station (Mise en Place) makes cooking relaxing, fast, and foolproof."
  ],
  es: [
    "Regla de oro del chef: Prueba tu comida en cada paso y ajusta la sal, la acidez (limón o vinagre) y el picante.",
    "No sobrecargues la sartén; si pones demasiada comida a la vez, se cocinará al vapor en lugar de dorarse con una costra crujiente.",
    "Mantén tu cuchillo siempre bien afilado para cortes limpios, rápidos y seguros."
  ],
  hi: [
    "शेफ का मुख्य नियम: खाना पकाते समय हर स्टेज पर स्वाद चखें और नमक व खटास (नींबू/टमाटर) को संतुलित करें।",
    "कढ़ाई या पैन में एक साथ बहुत ज्यादा सामान न भरें, ताकि हर टुकड़ा क्रिस्पी और सुनहरा भून सके।",
    "सब्जियों और मसालों को पहले से काटकर तैयार (Mise en Place) रखने से खाना मिनटों में आसानी से बन जाता है।"
  ],
  ur: [
    "کھانا پکاتے وقت نمک اور کھٹاس کا توازن رکھیں اور ہر مرحلے پر چکھ کر ایڈجسٹ کریں۔",
    "پین میں ایک ساتھ بہت زیادہ چیزیں نہ ڈالیں تاکہ سب کچھ اچھے سے گولڈن براؤن ہو سکے۔"
  ],
  fr: [
    "Goûtez régulièrement votre plat tout au long de la cuisson pour réajuster le sel, l'acidité et les épices.",
    "Ne surchargez jamais votre poêle pour permettre aux ingrédients de bien caraméliser et dorer."
  ],
  de: [
    "Schmecke deine Gerichte während des Kochens immer wieder ab und balanciere Salz, Säure und Süße perfekt aus.",
    "Überfülle niemals die Pfanne, damit das Bratgut knusprig anbraten kann statt im eigenen Saft zu dünsten."
  ]
};

export async function answerChefQuestion(arg, maybeLang) {
  // Simulate smart chef thinking delay
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
  const langKey = TOPIC_RESPONSES.pasta[detectedLang] ? detectedLang : 'en';
  const lower = questionText.toLowerCase();

  // Match topic
  let matchedTopic = null;
  if (/pasta|spaghetti|macaroni|noodle|fettuccine|penne|lasagna|sauce water|al dente/.test(lower)) matchedTopic = 'pasta';
  else if (/chicken|poultry|thigh|breast|meat|steak|sear|crispy skin|dry chicken/.test(lower)) matchedTopic = 'chicken';
  else if (/substitute|replace|alternative|instead|swap|no egg|no cream|no milk/.test(lower)) matchedTopic = 'substitute';
  else if (/bake|baking|cake|cookie|dough|oven|flour|bread|pastry|yeast/.test(lower)) matchedTopic = 'baking';
  else if (/spice|masala|herb|seasoning|curry|cumin|coriander|bloom|flavor/.test(lower)) matchedTopic = 'spices';
  else if (/store|storage|fridge|freeze|keep|shelf life|leftover|refrigerat/.test(lower)) matchedTopic = 'storage';

  if (matchedTopic && TOPIC_RESPONSES[matchedTopic]) {
    const list = TOPIC_RESPONSES[matchedTopic][langKey] || TOPIC_RESPONSES[matchedTopic]['en'];
    if (list && list.length > 0) {
      return list[Math.floor(Math.random() * list.length)];
    }
  }

  const genericList = GENERIC_TIPS[langKey] || GENERIC_TIPS['en'];
  return genericList[Math.floor(Math.random() * genericList.length)];
}

const CUISINES_LIST = ['Mediterranean', 'Italian', 'Pan-Asian', 'Mexican Fusion', 'French Bistro', 'Modern American', 'Indian Gourmet', 'Spanish Tapas'];

export async function generateAIRecipe(arg, maybeLang) {
  // Simulate AI chef generation
  await new Promise(r => setTimeout(r, 750));

  let ingredients = 'Fresh garden herbs, olive oil, garlic';
  let category = 'dinner';
  let diet = 'none';
  let maxTime = 30;
  let language = 'en';

  if (typeof arg === 'object' && arg !== null) {
    ingredients = arg.ingredients || ingredients;
    category = arg.category || category;
    diet = arg.diet || diet;
    maxTime = arg.maxTime || maxTime;
    language = arg.language || detectLanguage(ingredients);
  } else {
    ingredients = String(arg || ingredients);
    language = maybeLang || detectLanguage(ingredients);
  }

  const detectedLang = detectLanguage(ingredients) || language || 'en';
  const ingList = String(ingredients).split(',').map(s => s.trim()).filter(Boolean);
  const primary = ingList[0] || 'Seasonal Harvest';
  const secondary = ingList[1] || 'Aromatic Herbs';
  const tertiary = ingList[2] || 'Garlic & Olive Oil';

  const capPrimary = primary.charAt(0).toUpperCase() + primary.slice(1);
  const capSecondary = secondary.charAt(0).toUpperCase() + secondary.slice(1);

  const cookingTime = Math.min(Math.max(parseInt(maxTime) || 25, 15), 50);
  const caloriesCount = Math.floor(Math.random() * 320) + 360;
  const proteinCount = Math.floor(Math.random() * 24) + 18;
  const carbsCount = Math.floor(Math.random() * 30) + 24;
  const fatCount = Math.floor(Math.random() * 14) + 10;
  const chosenCuisine = CUISINES_LIST[Math.floor(Math.random() * CUISINES_LIST.length)];

  let title = '';
  let description = '';
  let instructions = [];
  let chefNotes = '';

  if (detectedLang === 'es') {
    const titlesEs = [
      `Salteado Gourmet de ${capPrimary} con ${capSecondary}`,
      `Cazuela Dorada de ${capPrimary} al Aroma de ${capSecondary}`,
      `Delicia Mediterránea de ${capPrimary} y ${capSecondary}`,
      `Creación Suprema del Chef: ${capPrimary} Crujiente`
    ];
    title = titlesEs[Math.floor(Math.random() * titlesEs.length)];
    description = `Una receta equilibrada y llena de sabor creada con ${ingList.join(', ')}. Lista en tan solo ${cookingTime} minutos con técnicas profesionales.`;
    instructions = [
      `Lava cuidadosamente y corta ${ingList.join(', ')} en porciones uniformes para una cocción homogénea.`,
      `Calienta 2 cucharadas de aceite de oliva en una sartén grande a fuego medio-alto.`,
      `Agrega ${primary} y dora durante 5-6 minutos hasta obtener un tono dorado brillante.`,
      `Incorpora ${secondary} junto con ajo picado, sal marina y pimienta negra recién molida.`,
      `Baja a fuego medio, tapa ligeramente y cocina por 6-8 minutos hasta que los sabores se fusionen.`,
      `Emplata de inmediato, decora con un chorrito de aceite de oliva virgen y sirve bien caliente.`
    ];
    chefNotes = `Consejo del Chef: Si deseas un toque más vibrante, agrega unas gotas de jugo de limón fresco justo antes de servir.`;
  } else if (detectedLang === 'hi') {
    const titlesHi = [
      `शाही ${capPrimary} और ${capSecondary} स्पेशल`,
      `तड़का ${capPrimary} विथ ${capSecondary} फ्यूजन`,
      `मसालेदार रोस्टेड ${capPrimary} डिश`,
      `शेफ स्पेशल क्रिस्पी ${capPrimary} क्रिएशन`
    ];
    title = titlesHi[Math.floor(Math.random() * titlesHi.length)];
    description = `${ingList.join(', ')} से तैयार एक बेहद स्वादिष्ट और पौष्टिक रेसिपी जो सिर्फ ${cookingTime} मिनट में बनकर तैयार हो जाती है।`;
    instructions = [
      `सभी सामग्री (${ingList.join(', ')}) को अच्छी तरह धोकर एक समान टुकड़ों में काट लें।`,
      `कढ़ाई में 2 चम्मच तेल या घी मध्यम आंच पर गर्म करें।`,
      `पहले ${primary} डालें और 5 मिनट तक हल्का सुनहरा होने तक भूनें।`,
      `${secondary} और अपने पसंदीदा मसाले (हल्दी, गरम मसाला, नमक) डालकर अच्छी तरह मिलाएं।`,
      `धीमी आंच पर ढककर 6-8 मिनट तक पकाएं जब तक कि सारी सामग्री नरम और खुशबूदार न हो जाए।`,
      `ताज़ा हरा धनिया और नींबू का रस डालकर गरमा-गरम परोसें।`
    ];
    chefNotes = `शेफ टिप: ऊपर से थोड़ा सा भुना हुआ जीरा पाउडर छिड़कने से खुशबू और स्वाद दोगुना हो जाता है।`;
  } else if (detectedLang === 'ur') {
    title = `خاص ${capPrimary} اور ${capSecondary} کچن سپیشل`;
    description = `${ingList.join('، ')} کے ساتھ بنائی گئی ایک لذیذ اور غذائیت سے بھرپور ڈش۔`;
    instructions = [
      `تمام اجزاء کو دھو کر مناسب سائز میں کاٹ لیں۔`,
      `پین میں تیل گرم کریں اور ${primary} کو ہلکا سنہری ہونے تک بھونیں۔`,
      `${secondary} اور مصالحہ جات شامل کرکے درمیانی آنچ پر پکائیں۔`,
      `ہلکی آنچ پر دم دیں تاکہ تمام ذائقے آپس میں مل جائیں۔`,
      `تازہ دھنیا اور لیموں کے رس کے ساتھ گرما گرم پیش کریں۔`
    ];
    chefNotes = `شیف کی رائے: آخر میں ہلکا سا گرم مصالحہ چھڑکیں تاکہ بہترین خوشبو آئے۔`;
  } else if (detectedLang === 'fr') {
    title = `Poêlée Raffinée de ${capPrimary} et ${capSecondary}`;
    description = `Une création culinaire gourmande préparée avec ${ingList.join(', ')}, prête en ${cookingTime} minutes.`;
    instructions = [
      `Émincez soigneusement ${ingList.join(', ')} en morceaux réguliers.`,
      `Faites chauffer de l'huile d'olive dans une poêle à feu vif.`,
      `Faites dorer ${primary} pendant 5 minutes pour une belle coloration.`,
      `Ajoutez ${secondary}, l'ail et les aromates, puis assaisonnez de fleur de sel.`,
      `Laissez mijoter à feu doux pendant 6 minutes.`,
      `Dressez dans une assiette chaude et servez sans attendre.`
    ];
    chefNotes = `Astuce du Chef : Terminez avec une noisette de beurre frais pour une sauce soyeuse.`;
  } else if (detectedLang === 'de') {
    title = `Gourmet-Pfanne mit ${capPrimary} und ${capSecondary}`;
    description = `Ein aromatisches, gesundes Gericht aus ${ingList.join(', ')}, fertig in nur ${cookingTime} Minuten.`;
    instructions = [
      `Schneide ${ingList.join(', ')} in gleichmäßige Stücke.`,
      `Erhitze 2 EL Olivenöl in einer Pfanne auf mittlerer Stufe.`,
      `Brate ${primary} etwa 5 Minuten an, bis es leicht gebräunt ist.`,
      `Füge ${secondary} und Gewürze hinzu und dünste alles sanft.`,
      `Lass das Gericht bei reduzierter Hitze 6-8 Minuten durchziehen.`,
      `Mit frischen Kräutern garnieren und dampfend heiß servieren.`
    ];
    chefNotes = `Chefkoch-Tipp: Ein Spritzer frischer Zitronensaft hebt alle Aromen wunderbar hervor.`;
  } else {
    // English default with diverse variations
    const titlesEn = [
      `Pan-Seared ${capPrimary} & ${capSecondary} Medley`,
      `Artisan Skillet ${capPrimary} with ${capSecondary} Infusion`,
      `Golden Caramelized ${capPrimary} & Herb Plate`,
      `Chef's Signature ${capPrimary} Creation`,
      `Rustic Hearth-Roasted ${capPrimary} & ${capSecondary}`
    ];
    title = titlesEn[Math.floor(Math.random() * titlesEn.length)];
    description = `A vibrant, nutrient-dense culinary plate designed around ${ingList.join(', ')}, harmonized with extra virgin olive oil, fragrant herbs, and a savory finish in ${cookingTime} minutes.`;
    instructions = [
      `Rinse and slice ${ingList.join(', ')} into uniform, bite-sized portions for even cooking.`,
      `Heat 2 tablespoons of extra virgin olive oil in a heavy-bottomed skillet over medium-high heat.`,
      `Add ${primary} and sear undisturbed for 4-5 minutes until a golden-brown caramelized crust forms.`,
      `Toss in ${secondary}, ${tertiary}, minced garlic, sea salt, and freshly cracked black pepper.`,
      `Reduce heat to medium-low, cover with a lid, and let simmer for 6-8 minutes until tender and aromatic.`,
      `Remove from heat, rest for 2 minutes, garnish with fresh herbs, and serve hot.`
    ];
    chefNotes = `Chef's Secret: Finish with a drizzle of cold-pressed oil or a squeeze of fresh lemon to instantly brighten the deep caramelized flavors!`;
  }

  // Format ingredients cleanly
  const formattedIngredients = ingList.map((item, idx) => ({
    name: item.charAt(0).toUpperCase() + item.slice(1),
    amount: idx === 0 ? 1.5 : (idx === 1 ? 1 : 0.5),
    unit: idx === 0 ? 'cup / portion' : 'tbsp / unit'
  }));

  if (formattedIngredients.length < 3) {
    formattedIngredients.push(
      { name: 'Extra Virgin Olive Oil', amount: 2, unit: 'tbsp' },
      { name: 'Sea Salt & Fresh Pepper', amount: 1, unit: 'pinch' }
    );
  }

  const recipeId = `ai-recipe-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const images = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80'
  ];

  return {
    id: recipeId,
    title,
    category: category || 'dinner',
    cuisine: chosenCuisine,
    prepTime: 10,
    cookTime: cookingTime,
    totalTime: cookingTime + 10,
    servings: 2,
    difficulty: diet !== 'none' ? 'Intermediate' : 'Easy-Medium',
    rating: 5.0,
    reviewsCount: Math.floor(Math.random() * 15) + 8,
    image: images[Math.floor(Math.random() * images.length)],
    description,
    ingredients: formattedIngredients,
    instructions,
    steps: instructions, // backwards compatibility
    chefNotes,
    chefNote: chefNotes, // backwards compatibility
    calories: caloriesCount,
    nutrition: {
      calories: caloriesCount,
      protein: `${proteinCount}g`,
      carbs: `${carbsCount}g`,
      fat: `${fatCount}g`,
      fiber: '6g'
    },
    tags: [
      'AI Generated',
      diet !== 'none' ? diet.toUpperCase() : 'Chef Special',
      `${cookingTime} Mins`
    ]
  };
}

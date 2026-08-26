// Multilingual AI Chef Recipe Suggestion Engine
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
  const value = text.toLowerCase();
  if (/[\u0600-\u06ff]/.test(value)) return 'ar';
  if (/[\u3040-\u30ff]/.test(value)) return 'ja';
  if (/[\u4e00-\u9fff]/.test(value)) return 'zh';
  if (/\b(que|una|con|para|cocinar|ingredientes|pollo|ajo|espinaca|pescado|cebolla)\b/.test(value)) return 'es';
  if (/\b(avec|une|des|pour|cuisine|ingrédients|poulet|ail|épinards)\b/.test(value)) return 'fr';
  if (/\b(und|eine|mit|für|kochen|zutaten|huhn|knoblauch|spinat)\b/.test(value)) return 'de';
  if (/\b(con|una|per|cucinare|ingredienti|pollo|aglio|spinaci)\b/.test(value)) return 'it';
  if (/[\u0900-\u097f]/.test(value)) return 'hi';
  if (/[\u0600-\u06ff]/.test(value)) return 'ur';
  return 'en';
}

export function isChefQuestion(text = '') {
  return /[?؟]/.test(text) || /^(how|what|why|when|where|can|should|is|are|do|does|which|cuánto|cómo|qué|por qué|comment|pourquoi|was|wie|warum|come|perché|ما|كيف|لماذا|什么|怎么|なぜ|どう)/i.test(text.trim());
}

export async function answerChefQuestion({ question, language = 'en' }) {
  await new Promise((resolve) => setTimeout(resolve, 650));
  const lang = language.toLowerCase();
  const text = question.toLowerCase();
  const isPasta = /pasta|noodle|spaghetti|macaroni|pâtes|nudeln|pasta|麺|パスタ/.test(text);
  const isChicken = /chicken|pollo|poulet|huhn|pollo|دجاج|鸡|鶏/.test(text);
  const isSubstitute = /substitute|replace|instead|alternative|sustituir|remplacer|ersetzen|代替|замен/.test(text);
  const isStorage = /store|storage|fridge|refrigerat|保存|fridge|conserv/.test(text);
  const answers = {
    es: isPasta ? 'Cuece la pasta en agua bien salada hasta que esté al dente, normalmente entre 8 y 12 minutos. Reserva un poco del agua antes de escurrir.' : isChicken ? 'Cocina el pollo hasta alcanzar 74 °C en el centro y déjalo reposar unos minutos antes de cortarlo.' : isSubstitute ? 'Puedes sustituir ingredientes por otros de textura y humedad parecidas. Prueba yogur natural por crema o limón por vinagre, ajustando poco a poco.' : isStorage ? 'Guarda las sobras en un recipiente cerrado dentro de las dos horas siguientes y consúmelas en 3 o 4 días.' : 'Buena pregunta culinaria. Para darte una respuesta precisa, incluye el ingrediente, la cantidad y el resultado que buscas.',
    fr: isPasta ? 'Faites cuire les pâtes dans une eau très salée pendant 8 à 12 minutes, jusqu’à ce qu’elles soient al dente. Gardez un peu d’eau de cuisson.' : isChicken ? 'Faites cuire le poulet jusqu’à 74 °C à cœur, puis laissez-le reposer quelques minutes avant de le servir.' : isSubstitute ? 'Remplacez un ingrédient par un autre de texture et d’humidité similaires. Ajoutez le substitut progressivement et goûtez.' : isStorage ? 'Placez les restes dans un récipient fermé dans les deux heures et consommez-les sous 3 à 4 jours.' : 'Bonne question. Donnez-moi l’ingrédient, la quantité et le résultat souhaité pour une réponse précise.',
    de: isPasta ? 'Koche die Nudeln in reichlich Salzwasser etwa 8 bis 12 Minuten, bis sie al dente sind. Etwas Kochwasser aufbewahren.' : isChicken ? 'Gare das Hähnchen bis zu einer Kerntemperatur von 74 °C und lass es kurz ruhen.' : isSubstitute ? 'Ersetze Zutaten durch etwas mit ähnlicher Textur und Feuchtigkeit. Füge den Ersatz schrittweise hinzu und schmecke ab.' : isStorage ? 'Bewahre Reste innerhalb von zwei Stunden luftdicht verschlossen auf und iss sie innerhalb von 3 bis 4 Tagen.' : 'Gute Kochfrage. Nenne Zutat, Menge und gewünschtes Ergebnis für eine genaue Antwort.',
    it: isPasta ? 'Cuoci la pasta in acqua ben salata per 8-12 minuti, fino a renderla al dente. Conserva un po’ di acqua di cottura.' : isChicken ? 'Cuoci il pollo fino a 74 °C al cuore e lascialo riposare prima di servirlo.' : isSubstitute ? 'Sostituisci con un ingrediente dalla consistenza simile, aggiungendolo poco alla volta e assaggiando.' : isStorage ? 'Conserva gli avanzi in un contenitore chiuso entro due ore e consumali entro 3-4 giorni.' : 'Domanda interessante. Indicami ingrediente, quantità e risultato desiderato per una risposta precisa.',
    zh: isPasta ? '将面条放入充足的盐水中煮约8到12分钟，达到有嚼劲的口感。沥干前留一些煮面水。' : isChicken ? '鸡肉中心温度达到74°C后才算熟，出锅后静置几分钟再切。' : isSubstitute ? '选择质地和含水量相近的食材替代，并少量加入、边尝边调整。' : isStorage ? '剩菜应在两小时内密封冷藏，并在3到4天内食用。' : '这是个好问题。请告诉我食材、用量和你想达到的效果，我会给出具体建议。',
    ja: isPasta ? 'パスタは塩を入れた湯で8〜12分、アルデンテまで茹でます。湯切り前に茹で汁を少し取っておきます。' : isChicken ? '鶏肉は中心温度74°Cまで加熱し、切る前に数分休ませます。' : isSubstitute ? '食感と水分量が近い食材を少しずつ代用し、味を見ながら調整します。' : isStorage ? '残り物は2時間以内に密閉して冷蔵し、3〜4日以内に食べてください。' : '良い質問です。食材、量、目指す仕上がりを教えてください。',
    ar: isChicken ? 'اطهِ الدجاج حتى تصل حرارته الداخلية إلى 74 درجة مئوية، ثم اتركه يرتاح دقائق قبل التقديم.' : isStorage ? 'احفظ بقايا الطعام في وعاء مغلق خلال ساعتين وتناولها خلال 3 أو 4 أيام.' : 'سؤال ممتاز. اذكر المكوّن والكمية والنتيجة التي تريدها لأعطيك نصيحة دقيقة.'
  };
  return answers[lang] || (isPasta ? 'Cook pasta in well-salted water for 8 to 12 minutes until al dente. Save some cooking water before draining.' : isChicken ? 'Cook chicken until its center reaches 74°C / 165°F, then rest it briefly before serving.' : isSubstitute ? 'Choose a substitute with similar texture and moisture, add it gradually, and adjust seasoning as you taste.' : isStorage ? 'Store leftovers in a sealed container within two hours and eat them within 3 to 4 days.' : 'That is a good cooking question. Tell me the ingredient, quantity, and result you want so I can give precise guidance.');
}

export const generateAIRecipe = async ({ ingredients, category, diet, maxTime, language = 'en' }) => {
  // Simulate intelligent chef thinking delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const ingList = ingredients.split(',').map((s) => s.trim()).filter(Boolean);
  const primaryIng = ingList[0] || 'Seasonal Vegetables';
  const secondaryIng = ingList[1] || 'Fresh Herbs';
  const lang = language.toLowerCase();
  const variation = [...ingredients, category || '', diet || ''].reduce((total, char) => total + char.charCodeAt(0), 0) % 3;
  const titleStyles = [
    `Pan-Seared ${primaryIng} & ${secondaryIng} Medley`,
    `Golden ${primaryIng} ${secondaryIng} Kitchen Creation`,
    `Chef's ${primaryIng} and ${secondaryIng} Flavor Plate`
  ];
  const englishDescriptions = [
    `A gourmet, nutrient-dense recipe designed around ${ingList.join(', ')}, finished with extra virgin olive oil and fragrant garlic herbs.`,
    `A bright, balanced plate where ${primaryIng} meets ${secondaryIng}, built for bold flavor and a relaxed ${maxTime || 30}-minute cook.`,
    `A flexible chef-crafted idea for ${ingList.join(', ')}, combining crisp texture, savory depth, and a fresh finishing note.`
  ];

  // Multilingual dynamic titles & descriptions generator
  let title = '';
  let description = '';
  let steps = [];
  let chefNotes = '';

  if (lang === 'es') {
    title = `Delicia Gourmet de ${primaryIng} y ${secondaryIng}`;
    description = `Una creación culinaria rápida e innovadora sazonada con finas hierbas y dorada a la perfección en menos de ${maxTime || 30} minutos.`;
    steps = [
      `Prepare y corte ${ingList.join(', ')} en porciones uniformes.`,
      `Caliente aceite de oliva en una sartén a fuego medio-alto y dore ${primaryIng} durante 5 minutos.`,
      `Agregue ${secondaryIng} junto con ajo y especias. Saltee hasta obtener un aroma delicioso.`,
      `Decore con hierbas frescas y sirva de inmediato.`
    ];
    chefNotes = `Sugerencia del Chef: Acompañe con una copa de vino blanco seco o ensalada fresca.`;
  } else if (lang === 'fr') {
    title = `Poêlée Gourmande de ${primaryIng} aux ${secondaryIng}`;
    description = `Une recette raffinée, rapide et parfumée préparée avec ${ingList.join(', ')}.`;
    steps = [
      `Coupez soigneusement ${ingList.join(', ')} en dés réguliers.`,
      `Faites revenir ${primaryIng} dans du beurre noisette pendant 6 minutes.`,
      `Incorporez ${secondaryIng} et laissez mijoter à feu doux avec une touche de crème.`,
      `Servez chaud avec un brin de persil frais.`
    ];
    chefNotes = `Conseil du Chef: Ajoutez une pincée de fleur de sel avant de servir.`;
  } else if (lang === 'de') {
    title = `Gourmet-Pfanne mit ${primaryIng} und ${secondaryIng}`;
    description = `Ein köstliches, gesundes Gericht zubereitet aus ${ingList.join(', ')}.`;
    steps = [
      `Schneiden Sie ${ingList.join(', ')} in feine Stücke.`,
      `Erhitzen Sie Pflanzenöl und braten Sie ${primaryIng} knusprig an.`,
      `Geben Sie ${secondaryIng} und Gewürze hinzu und lassen Sie es 5 Minuten köcheln.`,
      `Warm servieren und genießen.`
    ];
    chefNotes = `Chef-Tipp: Perfekt kombiniert mit frischem Vollkornbrot.`;
  } else if (lang === 'ar') {
    title = `طبق ${primaryIng} الفاخر مع ${secondaryIng}`;
    description = `وصفة شهية وسريعة التحضير تجمع بين ${ingList.join(' و ')} بتتبيلة رائعة.`;
    steps = [
      `قم بتقطيع ${ingList.join(' و ')} إلى قطع متساوية.`,
      `سخن زيت الزيتون في مقلاة وشوح ${primaryIng} لمدة 6 دقائق.`,
      `أضف ${secondaryIng} والبهارات العطرية واتركه ينضج على نار هادئة.`,
      `يقدم ساخناً مع الأرز أو الخبز الطازج.`
    ];
    chefNotes = `نصيحة الطاهي: زين الطبق بالبقدونس المفروم وقليل من عصير الليمون.`;
  } else if (lang === 'hi' || lang === 'ur') {
    title = `शाही ${primaryIng} और ${secondaryIng} स्पेशल`;
    description = `${ingList.join(', ')} से बनी एक स्वादिष्ट और पौष्टिक डिश जो मिनटों में तैयार हो जाती है।`;
    steps = [
      `सभी सामग्री (${ingList.join(', ')}) को अच्छी तरह धोकर काट लें।`,
      `कढ़ाई में तेल गर्म करें और ${primaryIng} को सुनहरा होने तक भूनें।`,
      `अब इसमें ${secondaryIng} और ताज़ा मसाले डालकर धीमी आंच पर पकाएं।`,
      `गरमा-गरम परोसें और स्वाद का आनंद लें।`
    ];
    chefNotes = `शेफ टिप: ताज़े धनिया पत्ती और नींबू के रस के साथ गार्निश करें।`;
  } else if (lang === 'it') {
    title = `Creazione Gourmet di ${primaryIng} e ${secondaryIng}`;
    description = `Un piatto originale e profumato preparato con ${ingList.join(', ')} in meno di ${maxTime || 30} minuti.`;
    steps = [`Preparate e tagliate ${ingList.join(', ')}.`, `Rosolate ${primaryIng} con olio d'oliva fino a doratura.`, `Aggiungete ${secondaryIng} e le spezie, poi cuocete dolcemente.`, `Guarnite con erbe fresche e servite caldo.`];
    chefNotes = `Segreto dello chef: completate con scorza di limone e pepe appena macinato.`;
  } else if (lang === 'zh') {
    title = `${primaryIng}与${secondaryIng}创意料理`;
    description = `用${ingList.join('、')}制作的均衡美味料理，约${maxTime || 30}分钟即可完成。`;
    steps = [`将${ingList.join('、')}洗净并切成均匀大小。`, `加热橄榄油，煎香${primaryIng}。`, `加入${secondaryIng}和香料，小火烹煮。`, `撒上新鲜香草后趁热享用。`];
    chefNotes = `厨师提示：最后加入少许柠檬汁，让风味更清爽。`;
  } else if (lang === 'ja') {
    title = `${primaryIng}と${secondaryIng}のシェフ・プレート`;
    description = `${ingList.join('、')}を使った香り豊かな料理。${maxTime || 30}分以内で仕上がります。`;
    steps = [`${ingList.join('、')}を食べやすい大きさに切ります。`, `油を熱し、${primaryIng}をきつね色になるまで焼きます。`, `${secondaryIng}と調味料を加えて弱火で煮ます。`, `ハーブを添えて温かいうちに盛り付けます。`];
    chefNotes = `シェフのコツ：仕上げにレモンの皮を少し加えると香りが引き立ちます。`;
  } else {
    // Default English
    title = titleStyles[variation];
    description = englishDescriptions[variation];
    steps = [
      `Prep and slice ${ingList.join(', ')} into bite-sized uniform pieces.`,
      `Heat 2 tbsp olive oil in a heavy-bottomed skillet over medium-high heat. Add ${primaryIng} and sear for 5 minutes until lightly golden.`,
      `Toss in ${secondaryIng}, garlic, and your favorite herbal seasoning. Reduce heat to medium and simmer for 6-8 minutes.`,
      `Adjust seasoning with sea salt and freshly cracked black pepper. Garnish with lemon zest and serve warm.`
    ];
    chefNotes = [
      `Chef's Secret: Drizzle a teaspoon of truffle oil or toasted sesame oil right before serving to elevate the aroma!`,
      `Chef's Secret: Give the pan a final splash of lemon water and scrape up the golden bits for instant depth.`,
      `Chef's Secret: Rest the finished dish for two minutes so the juices settle and every bite stays generous.`
    ][variation];
  }

  return {
    id: `ai-recipe-${Date.now()}`,
    title,
    category: category || 'lunch',
    cuisine: 'AI Chef Special',
    prepTime: 10,
    cookTime: Math.min(parseInt(maxTime) || 20, 45),
    servings: 2,
    difficulty: diet !== 'none' ? 'Easy-Medium' : 'Easy',
    rating: 5.0,
    reviewsCount: 1,
    image: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80`,
    description,
    ingredients: ingList.map((item, idx) => ({
      name: item.charAt(0).toUpperCase() + item.slice(1),
      amount: idx === 0 ? 1 : 0.5,
      unit: idx === 0 ? 'portion / cup' : 'tbsp / unit'
    })),
    instructions: steps,
    chefNotes,
    nutrition: { protein: '22g', carbs: '28g', fat: '14g', fiber: '6g' },
    tags: ['AI Generated', 'Custom Recipe', diet !== 'none' ? diet.toUpperCase() : 'Balanced']
  };
};

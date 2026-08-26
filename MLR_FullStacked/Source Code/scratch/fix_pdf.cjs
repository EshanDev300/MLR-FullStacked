const fs = require('fs');

let content = fs.readFileSync('src/pages/MealPlannerPage.jsx', 'utf8');

const replacement = `  const handleGenerateShoppingList = () => {
    const currentList = getShoppingList();
    const recipeMap = new Map(recipes.map((r) => [r.id, r]));
    const newItems = [];
    const pdfLines = [];

    days.forEach((day) => {
      const dayPlan = mealPlan[day];
      if (dayPlan) {
        ['breakfast', 'lunch', 'dinner'].forEach((mealType) => {
          const recId = dayPlan[mealType];
          if (recId && recipeMap.has(recId)) {
            const recipe = recipeMap.get(recId);
            
            pdfLines.push(\`- \${recipe.title} (\${day} \${mealType})\`);
            
            (recipe.ingredients || []).forEach((ing) => {
              newItems.push({
                id: \`\${day}-\${mealType}-\${ing.name}-\${Math.random()}\`,
                recipeTitle: \`\${day} \${mealType}: \${recipe.title}\`,
                name: ing.name,
                amount: ing.amount,
                unit: ing.unit,
                checked: false
              });
              
              pdfLines.push(\`   [ ] \${ing.name} (\${ing.amount} \${ing.unit})\`);
            });
            pdfLines.push('');
          }
        });
      }
    });

    saveShoppingList([...currentList, ...newItems]);
    setGeneratedSuccess(true);
    soundSynth.playClick();
    
    // Generate PDF
    if (pdfLines.length > 0) {
      import('jspdf').then(({ jsPDF }) => {
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text("CookSmart Weekly Grocery List", 20, 20);
        
        doc.setFontSize(12);
        let yPos = 35;
        
        pdfLines.forEach(line => {
          if (yPos > 280) {
            doc.addPage();
            yPos = 20;
          }
          doc.text(line, 20, yPos);
          yPos += 7;
        });
        
        doc.save("CookSmart-Grocery-List.pdf");
      });
    }

    setTimeout(() => setGeneratedSuccess(false), 3000);
  };`;

const regex = /const handleGenerateShoppingList = \(\) => \{[\s\S]*?setTimeout\(\(\) => setGeneratedSuccess\(false\), 3000\);\n  \};/;
content = content.replace(regex, replacement);
fs.writeFileSync('src/pages/MealPlannerPage.jsx', content);

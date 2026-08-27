# CookSmart - Smart Cooking & Recipe Discovery Portal
## Software Requirements Specification & Technical Documentation
**Team Name:** MLR_FullStacked  
**Event:** TechWiz 7 — The World Tech Championship  
**Category:** Web & App Development  
**Theme:** Smart Cooking & Recipe Discovery Portal  

---

## 1. Executive Summary & Problem Definition

### 1.1 Background and Necessity
In fast-paced modern households, people frequently face the "ingredient paradox": having a pantry stocked with various food items but struggling to decide what meal to cook. Conventional recipe platforms often require browsing through endless static lists, lacking intelligent filtering based on available home ingredients, dietary needs, cook times, and multi-language user support.

### 1.2 Proposed Solution: CookSmart
**CookSmart** is an advanced, responsive Single-Page Application (SPA) designed to revolutionize recipe discovery. Equipped with an OGL-powered WebGL hero slider, an interactive canvas grid background, a multilingual rule-based AI Culinary Assistant, and an offline-capable LocalStorage database, CookSmart provides personalized recipe suggestions based on available ingredients, category preferences, difficulty levels, and prep time constraints.

---

## 2. Project Scope & Deliverables

### 2.1 Scope of Project
CookSmart delivers 12+ fully functional screen views and interactive utilities:
1. **Home Portal**: 3D hero canvas, quick AI recipe prompt, featured recipes carousel, visual categories grid, daily cooking tips, live stats.
2. **Recipe Library**: Multi-criteria search, filtering (category, difficulty, cook time, dietary tags), sorting, grid/list view toggle.
3. **Recipe Details Modal & View**: Comprehensive ingredient breakdown, step-by-step cooking guide with active timer, serving size multiplier, nutritional macros, and video guides.
4. **Visual Categories Navigator**: Interactive 3D cards for Breakfast, Lunch, Dinner, Snacks, Desserts, Vegan, Quick & Easy, and World Cuisine.
5. **Multilingual AI Chef Agent**: Intelligent culinary AI supporting English, Spanish, French, German, Italian, Arabic, Hindi, Chinese, Urdu, etc.
6. **Weekly Meal Planner**: Interactive 7-day scheduler (Mon-Sun) with one-click shopping list generation.
7. **Favorites Manager**: Local bookmarking with instant synchronization and export capabilities.
8. **Cooking Tips & Video Masterclasses**: Culinary tricks, knife skills guides, and spice pairing matrix.
9. **Interactive Kitchen Utilities**: Integrated Kitchen Timer with sound alerts and Measurement Unit Converter.
10. **Culinary Quiz Game**: Gamified trivia module to test culinary knowledge and earn badges.
11. **User Preference Setup**: Personalized user profile modal storing name, preferred cuisine, and dietary preferences.
12. **Custom Recipe Creator**: User form allowing home chefs to add their own custom recipes directly into the local database system.
13. **Contact & Feedback System**: Form with star rating, input validation, and local feedback logging.

---

## 3. System Architecture & Flowcharts

```
 +-----------------------------------------------------------------------------------+
 |                                   USER INTERFACE                                  |
 |  +-------------------+   +--------------------+   +----------------------------+  |
 |  | OGL WebGL Hero Slider |   | Tailwind Glass UI  |   | GSAP Page Transitions  |  |
 |  +-------------------+   +--------------------+   +----------------------------+  |
 +----------------------------------------+------------------------------------------+
                                          |
                                          v
 +-----------------------------------------------------------------------------------+
 |                                  APPLICATION CORE                                 |
 |  +-------------------+   +--------------------+   +----------------------------+  |
 |  | Recipe Search     |   | Serving Multiplier |   | Weekly Meal Planner        |  |
 |  | Engine & Filters  |   | & Step Timer       |   | & Shopping List Engine     |  |
 |  +-------------------+   +--------------------+   +----------------------------+  |
 +-------------------+--------------------+--------------------+---------------------+
                     |                    |                    |
                     v                    v                    v
 +-----------------------+    +-----------------------+    +-------------------------+
 | Multilingual AI Agent |    | Pre-populated Data    |    |  LocalStorage DB System |
 | (Rule-based & Dynamic |    | (JSON Databases)      |    |  (User Profile, Favs,   |
 | Chef Inference Engine)|    | recipes.json, etc.    |    |  Meal Plans, Custom DB) |
 +-----------------------+    +-----------------------+    +-------------------------+
```

---

## 4. AI Tool Usage Specification

### 4.1 AI Engine Purpose
The **CookSmart Chef AI Agent** assists users in real-time by interpreting input ingredients, dietary constraints, time limits, and language preferences to construct custom, dynamically generated culinary recipes and advice.

### 4.2 Inputs and Outputs
* **Inputs**:
  - Available ingredients (e.g., `"chicken, spinach, garlic, cream"`)
  - Target language (e.g., English, Spanish, French, German, Arabic, Hindi, etc.)
  - Meal category & Maximum cooking time
  - Dietary restrictions (Vegan, Gluten-Free, Keto, Nut-Free)
* **Processing**:
  - Local rule-based intent detection, language detection, and flavor-pairing templates
  - Ingredient parsing, substitution matching, and step sequence generation
* **Outputs**:
  - Dynamic Recipe Title, Description, Prep/Cook Time, Servings
  - Formatted Ingredient List with precise measurements
  - Step-by-Step Cooking Instructions
  - Chef Tips and practical cooking guidance

---

## 5. Software & Hardware Requirements

### 5.1 Software & Technologies
* **Frontend Framework**: React 18 / Vite
* **Styling & Effects**: Tailwind CSS, custom glass UI, CSS transitions, and GSAP page transitions
* **Graphics & Animation**: OGL WebGL MorphSlider, Interactive Grid canvas, GSAP, and CSS animations
* **Icons & UI Assets**: Lucide React Icons
* **Database & Storage**: JSON Pre-populated Data + HTML5 LocalStorage Persistence System
* **Runtime**: Node.js v18+ / v26+

### 5.2 Minimum Hardware Requirements
* **Processor**: Intel Core i5 Processor or equivalent
* **RAM**: 8 GB RAM minimum
* **Graphics**: WebGL-compatible SVGA GPU monitor
* **Storage**: 500 MB available disk space

---

## 6. Testing & Verification

Test data used: `recipes.json`, `categories.json`, `tips.json`, and `quiz.json`. Verification covered production build compilation, SPA navigation across all page views, recipe detail interactions, search/filter/sort controls, favorites, planner and shopping-list LocalStorage flows, custom recipe persistence, AI recipe generation, direct AI cooking questions, multilingual output, contact validation, and responsive layouts.

The AI feature is local and rule-based; no external AI API or network service is required. Ingredient lists and cooking questions are processed in the browser and the generated recipe or guidance is displayed in the selected or detected language.

## 7. Installation & Setup Guide

1. Open a terminal inside the `Source Code` folder:
   ```bash
   cd "Source Code"
   ```
2. Install project dependencies:
   ```bash
   npm install
   ```
3. Launch the development server:
   ```bash
   npm run dev
   ```
4. Access the web portal in your browser at `http://localhost:5173`.

---
*Documentation maintained by Team MLR_FullStacked.*

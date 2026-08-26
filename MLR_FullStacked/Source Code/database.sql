-- ==============================================================================
-- CookSmart - Manual MySQL Database System Schema
-- ==============================================================================

-- Create Database
CREATE DATABASE IF NOT EXISTS cooksmart_db;
USE cooksmart_db;

-- ==============================================================================
-- 1. USERS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    dietary_preference VARCHAR(100) DEFAULT 'none',
    skill_level ENUM('beginner', 'intermediate', 'advanced', 'expert') DEFAULT 'beginner',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 2. CATEGORIES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 3. RECIPES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS recipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    author_id INT NULL, -- NULL if system recipe, otherwise user_id
    title VARCHAR(255) NOT NULL,
    cuisine VARCHAR(100),
    prep_time_minutes INT,
    cook_time_minutes INT,
    total_time_minutes INT,
    servings INT,
    difficulty ENUM('Easy', 'Medium', 'Hard', 'Expert'),
    calories INT,
    image_url VARCHAR(255),
    video_url VARCHAR(255),
    description TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_popular BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ==============================================================================
-- 4. INGREDIENTS & RECIPE_INGREDIENTS TABLES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS ingredients (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS recipe_ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    amount DECIMAL(10, 2),
    unit VARCHAR(50),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id) ON DELETE CASCADE
);

-- ==============================================================================
-- 5. RECIPE_INSTRUCTIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS recipe_instructions (
    instruction_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT NOT NULL,
    step_number INT NOT NULL,
    instruction_text TEXT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE
);

-- ==============================================================================
-- 6. NUTRITION TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS nutrition (
    recipe_id INT PRIMARY KEY,
    protein VARCHAR(50),
    carbs VARCHAR(50),
    fat VARCHAR(50),
    fiber VARCHAR(50),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE
);

-- ==============================================================================
-- 7. USER FAVORITES (MANY-TO-MANY)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS user_favorites (
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE
);

-- ==============================================================================
-- 8. MEAL PLANNER
-- ==============================================================================
CREATE TABLE IF NOT EXISTS meal_plans (
    plan_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    meal_type ENUM('breakfast', 'lunch', 'dinner', 'snack') NOT NULL,
    recipe_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE
);

-- ==============================================================================
-- 9. REVIEWS & RATINGS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT NOT NULL,
    user_id INT NOT NULL,
    rating DECIMAL(2, 1) CHECK (rating >= 1.0 AND rating <= 5.0),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ==============================================================================
-- DUMMY SEED DATA (Optional Manual Insertion)
-- ==============================================================================
INSERT INTO categories (slug, name, description) VALUES 
('breakfast', 'Breakfast & Brunch', 'Kickstart your day with energizing smoothies, fluffy pancakes, and savory egg creations.'),
('lunch', 'Power Lunch', 'Nourishing grain bowls, gourmet artisan wraps, and vibrant seasonal salads.'),
('dinner', 'Gourmet Dinner', 'Hearty pasta, wood-fired roasts, pan-seared proteins, and fragrant stews.');

import axios from "axios";
import { transformRecipe } from "../utils/transformRecipe";
import { Recipe } from "../types";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchRecipeById = async (idMeal: string): Promise<Recipe | null> => {
    const response = await axios.get(`${API_URL}/lookup.php?i=${idMeal}`);
    return response.data.meals?.[0] ? transformRecipe(response.data.meals[0]) : null;
};

export const searchRecipes = async (query: string) => {
    console.log("By query", query);

    const response = await axios.get(`${API_URL}/search.php?s=${query}`);
    const foundMeals = response.data.meals || [];
    return foundMeals.map(transformRecipe);
};

export const fetchCategories = async () => {
    const response = await axios.get(`${API_URL}/categories.php`);
    return response.data.categories || [];
};

export const fetchRecipesByCategory = async (category: string) => {
    console.log("By category", category);

    const response = await axios.get(`${API_URL}/filter.php?c=${category}`);
    const categoryMeals = response.data.meals || [];

    const detailedMeals = await Promise.all(
        categoryMeals.map(async (meal: { idMeal: string }) => {
            return fetchRecipeById(meal.idMeal);
        })
    );

    return detailedMeals.filter((meal) => meal !== null) as Recipe[];
};
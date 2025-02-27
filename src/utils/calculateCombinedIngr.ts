import { Recipe } from "../types";

export const calculateCombinedIngredients = (recipes: Recipe[]) => {
    const ingredientsMap: Record<string, string[]> = {};

    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            if (!ingredientsMap[ingredient.name]) {
                ingredientsMap[ingredient.name] = [];
            }
            ingredientsMap[ingredient.name].push(ingredient.measure);
        });
    });

    return Object.entries(ingredientsMap).map(([name, measures]) => ({
        name,
        measure: measures.join(" + "),
    }));
};
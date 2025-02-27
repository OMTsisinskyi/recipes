import { RawRecipe, Recipe } from "../types";

export const transformRecipe = (rawRecipe: RawRecipe): Recipe => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        const ingredientName = rawRecipe[`strIngredient${i}`];
        const ingredientMeasure = rawRecipe[`strMeasure${i}`];

        if (ingredientName && ingredientMeasure) {
            ingredients.push({
                name: ingredientName,
                measure: ingredientMeasure,
            });
        }
    }

    return {
        idMeal: rawRecipe.idMeal,
        strMeal: rawRecipe.strMeal,
        strDrinkAlternate: rawRecipe.strDrinkAlternate,
        strCategory: rawRecipe.strCategory,
        strArea: rawRecipe.strArea,
        strInstructions: rawRecipe.strInstructions,
        strMealThumb: rawRecipe.strMealThumb,
        strTags: rawRecipe.strTags,
        strYoutube: rawRecipe.strYoutube,
        ingredients,
        strSource: rawRecipe.strSource,
        strImageSource: rawRecipe.strImageSource,
        strCreativeCommonsConfirmed: rawRecipe.strCreativeCommonsConfirmed === 'true' ? true : rawRecipe.strCreativeCommonsConfirmed === 'false' ? false : null,
        dateModified: rawRecipe.dateModified,
    };
};

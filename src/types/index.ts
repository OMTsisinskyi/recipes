export interface RawRecipe {
    idMeal: string;
    strMeal: string;
    strDrinkAlternate: string | null;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string;
    strYoutube: string;
    strSource: string;
    strImageSource: string | null;
    strCreativeCommonsConfirmed: string | null;
    dateModified: string | null;
    [key: string]: string | null;
}


export interface Recipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string;
    strYoutube: string;
    ingredients: { name: string; measure: string }[];
    strSource: string;
    strDrinkAlternate?: string | null;
    strImageSource?: string | null;
    strCreativeCommonsConfirmed?: boolean | null;
    dateModified?: string | null;
}

export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
};

import { parse, serialize } from "cookie";

const saveFavoriteRecipesToCookies = (favoriteIds: string[]) => {
    document.cookie = serialize('favoriteRecipes', JSON.stringify(favoriteIds), { path: '/', maxAge: 60 * 60 * 24 * 365 });
};

const getFavoriteRecipesFromCookies = () => {
    const cookies = parse(document.cookie);
    const favoriteRecipes = cookies.favoriteRecipes ? JSON.parse(cookies.favoriteRecipes) : [];
    return favoriteRecipes;
};

export { saveFavoriteRecipesToCookies, getFavoriteRecipesFromCookies };
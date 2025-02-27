import React, { useState } from "react";
import { Recipe } from "../types";
import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { saveFavoriteRecipesToCookies, getFavoriteRecipesFromCookies } from "../utils/cookieUtils"; // імпортуємо функції

interface RecipeCardProps {
    recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(getFavoriteRecipesFromCookies().includes(recipe.idMeal));

    const handleFavoriteClick = () => {
        let favoriteRecipes = getFavoriteRecipesFromCookies();
        if (isFavorite) {
            favoriteRecipes = favoriteRecipes.filter((id: string) => id !== recipe.idMeal);
        } else {
            favoriteRecipes.push(recipe.idMeal);
        }
        saveFavoriteRecipesToCookies(favoriteRecipes);
        setIsFavorite(!isFavorite);
    };

    return (
        <Card sx={{ maxWidth: 345, width: "345px", height: "350px", margin: "16px" }}>
            <CardMedia
                component="img"
                height="200"
                image={recipe.strMealThumb || ""}
                alt={recipe.strMeal || "Information missing"}
            />
            <CardContent sx={{ padding: "5px 10px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5" component="div" sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: "1",
                    }}>
                        {recipe.strMeal}
                    </Typography>
                    <IconButton onClick={handleFavoriteClick}>
                        <FavoriteIcon color={isFavorite ? "error" : "inherit"} />
                    </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary">
                    <b>Category:</b> {recipe.strCategory}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <b>Place of origin:</b> {recipe.strArea}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
                    <Button size="small" href={recipe.strSource} color="primary" target="_blank">
                        Source
                    </Button>
                    <Button href={recipe.strYoutube} target="_blank" color="error">
                        YouTube
                    </Button>
                    <Button size="small" color="secondary" component={Link} to={`/recipe/${recipe.idMeal}`}>
                        Details
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default RecipeCard;

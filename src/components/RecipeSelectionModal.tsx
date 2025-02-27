import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, List, ListItem, ListItemText, Divider } from "@mui/material";
import { ScrollableListContainer } from "../style";
import { calculateCombinedIngredients } from "../utils/calculateCombinedIngr";
import { Recipe } from "../types";
import { getFavoriteRecipesFromCookies } from "../utils//cookieUtils";
import { fetchRecipeById } from "../api";

interface RecipeSelectionModalProps {
    open: boolean;
    onClose: () => void;
}

const RecipeSelectionModal: React.FC<RecipeSelectionModalProps> = ({ open, onClose }) => {
    const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
    const [ingredients, setIngredients] = useState<any[]>([]);

    useEffect(() => {
        if (open) {
            const favoriteIds = getFavoriteRecipesFromCookies();
            fetchFavoriteRecipes(favoriteIds);
        }
    }, [open]);

    const fetchFavoriteRecipes = async (favoriteIds: string[]) => {
        const recipes = await Promise.all(
            favoriteIds.map((id) => fetchRecipeById(id))
        );
        const validRecipes = recipes.filter((recipe): recipe is Recipe => recipe !== null);
        setFavoriteRecipes(validRecipes);
        const combinedIngredients = calculateCombinedIngredients(validRecipes);
        setIngredients(combinedIngredients);
    };




    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, backgroundColor: "white", padding: 2 }}>
                <Typography variant="h6" align="center">Selected Recipes</Typography>
                <List>
                    {favoriteRecipes.map((recipe: Recipe) => (
                        <div key={recipe.idMeal}>
                            <ListItem>
                                <ListItemText
                                    primary={recipe.strMeal}
                                    secondary={`Category: ${recipe.strCategory} | Origin: ${recipe.strArea}`}
                                />
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
                <Typography variant="h6">Ingredients:</Typography>
                <ScrollableListContainer>
                    <List>
                        {ingredients.map((ingredient, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={`${ingredient.name} - ${ingredient.measure}`} />
                            </ListItem>
                        ))}
                    </List>
                </ScrollableListContainer>

                <Button onClick={onClose} variant="contained" fullWidth>Close</Button>
            </Box>
        </Modal>
    );
};

export default RecipeSelectionModal;

import { Box, Card, CardContent, CardMedia, Typography, Button, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipeById } from "../api";
import { useNavigate } from "react-router-dom";


const RecipePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();


    const { data, isLoading, isError } = useQuery({
        queryKey: ["recipe", id],
        queryFn: () => fetchRecipeById(id!)
    });

    if (isLoading) return <CircularProgress />;
    if (isError) return <Typography color="error">Failed to load recipe</Typography>;

    const recipe = data;

    if (!recipe) {
        return <Typography color="error">Recipe not found</Typography>;
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Card sx={{ display: "flex", flexDirection: "column", maxWidth: 1200, margin: "0 auto" }}>
                <CardMedia
                    component="img"
                    height="400"
                    image={recipe.strMealThumb}
                    alt={recipe.strMeal}
                />
                <CardContent>
                    <Typography variant="h4" component="div">
                        {recipe.strMeal}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                        <b>Category:</b> {recipe.strCategory}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                        <b>Place of origin:</b> {recipe.strArea}
                    </Typography>

                    <Typography variant="h5" sx={{ marginTop: 3 }}>
                        Instructions:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {recipe.strInstructions}
                    </Typography>

                    <Typography variant="h6" sx={{ margin: "10px 0px", }}>
                        Ingredients:
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {recipe.ingredients?.map((ingredient, index) => (
                            <Typography key={index} variant="body1" color="text.secondary" sx={{ display: "inline-flex", alignItems: "center", border: "1px solid #ccc", padding: "5px", borderRadius: "5px" }}>
                                {ingredient.name} ({ingredient.measure})
                            </Typography>
                        ))}
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: 3 }}>
                        <Button size="large" color="secondary" onClick={() => navigate(-1)}>
                            Back to recipes
                        </Button>
                        <Button size="large" href={recipe.strSource} color="primary" target="_blank">
                            Source
                        </Button>
                        <Button size="large" href={recipe.strYoutube} target="_blank" color="error">
                            YouTube
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RecipePage;

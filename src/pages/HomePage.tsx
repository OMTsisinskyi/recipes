import { useQuery } from "@tanstack/react-query";
import { Box, CircularProgress, Typography, Pagination } from "@mui/material";
import Header from "../components/Header";
import { fetchCategories, searchRecipes, fetchRecipesByCategory } from "../api";
import { useEffect, useRef } from "react";
import useDebounce from "../hooks/useDebounce";
import RecipeCard from "../components/RecipeCard";
import { Recipe } from "../types";
import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../constants";


const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const scrollBoxRef = useRef<HTMLDivElement>(null);
    const searchQuery = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const currentPage = Number(searchParams.get("page")) || 1;

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
        staleTime: Infinity,
    });


    const { data: recipes = [], isLoading } = useQuery({
        queryKey: ["recipes", category || debouncedSearchQuery],
        queryFn: category
            ? () => fetchRecipesByCategory(category)
            : () => searchRecipes(debouncedSearchQuery),
        enabled: !!(debouncedSearchQuery || category),
    });

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedRecipes = recipes.slice(startIndex, endIndex);

    const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);

    const updateParams = (newParams: Record<string, string | number>) => {
        setSearchParams((prev) => {
            const updated = new URLSearchParams(prev);
            Object.entries(newParams).forEach(([key, value]) => {
                if (value) updated.set(key, String(value));
                else updated.delete(key);
            });
            return updated;
        });
    };

    useEffect(() => {
        if (scrollBoxRef.current) {
            scrollBoxRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [currentPage]);

    const handleSearchChange = (query: string) => {
        updateParams({ search: query, page: 1, category: "" });
    };

    const handleCategoryChange = (selectedCategory: string) => {
        updateParams({ category: selectedCategory, page: 1, search: "" });
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
        updateParams({ page: newPage });
    };

    if (isLoading) return <CircularProgress />;

    return (
        <Box sx={{ padding: "" }}>
            <Header
                searchValue={searchQuery}
                category={category}
                onSearchChange={handleSearchChange}
                onCategoryChange={handleCategoryChange}
                categories={categories}
            />

            <Box sx={{ height: "calc(100vh - 88px)", display: "flex", alignItems: "center", flexDirection: "column" }}>
                {recipes.length === 0 ? (
                    <Box>
                        <Typography align="center" variant="h3">No recipes</Typography>
                        <Typography variant="h5">Select <b>category</b> or <b>search</b> by name</Typography>
                    </Box>
                ) : (
                    <>
                        <Box ref={scrollBoxRef} sx={{ width: "95%", overflow: "auto", backgroundColor: "rgba(200, 200, 200, 0.2)", borderRadius: "5px", display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                            {paginatedRecipes.map((recipe: Recipe) => (
                                <RecipeCard key={recipe.idMeal} recipe={recipe} />
                            ))}
                        </Box>

                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            sx={{ mt: 2, mb: 2 }}
                        />
                    </>
                )}
            </Box>
        </Box>
    );
};

export default HomePage;

import { Box, TextField, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, Button } from "@mui/material";

import { Category } from "../types";
import { useEffect, useRef, useState } from "react";
import RecipeSelectionModal from "./RecipeSelectionModal";

interface HeaderProps {
    searchValue: string;
    category: string;
    onSearchChange: (searchQuery: string) => void;
    onCategoryChange: (category: string) => void;
    categories: Category[];
}

const Header = ({ onSearchChange, onCategoryChange, categories, category, searchValue }: HeaderProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [searchValue]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
    };

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        const selectedCategory = event.target.value;
        onCategoryChange(selectedCategory);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <TextField
                inputRef={inputRef}
                label="Search by name"
                variant="outlined"
                fullWidth
                value={searchValue}
                onChange={handleSearchChange}
            />
            <FormControl variant="outlined" sx={{ minWidth: 200, ml: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select
                    value={category}
                    onChange={handleCategoryChange}
                    label="Category"
                >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category.idCategory} value={category.strCategory}>
                            {category.strCategory}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={handleOpenModal} variant="contained" sx={{ ml: 2 }}>
                View Favorites
            </Button>
            <RecipeSelectionModal open={openModal} onClose={handleCloseModal} />
        </Box>
    );
};

export default Header;

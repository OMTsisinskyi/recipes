import { Box, styled } from "@mui/material";

export const ScrollableListContainer = styled(Box)(() => ({
    maxHeight: "150px",
    overflow: "auto",
    borderRadius: "5px",
    "&::-webkit-scrollbar": {
        width: "8px"
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "4px",
        border: "1px solid #fff"
    },
    "&::-webkit-scrollbar-track": {
        background: "#f1f1f1"
    }
}));

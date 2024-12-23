import { Box } from "@mui/material";
import React, { useEffect } from "react";
import BookTabs from "./BookTabs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Admin() {
    const context = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!context.isAuthenticated) {
            navigate("/");
            return;
        }
    }, []);

    return (
        <Box
            id="adminContainer"
            sx={{
                marginTop: "60px",
            }}
        >
            <BookTabs id="bookTabs" />
        </Box>
    );
}

import express from "express";
import User from "../models/userSchema.js";
import Book from "../models/bookSchema.js";

const router = express.Router();

router.get("/:userId/liked_books", async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const likedBooks = await user.getLikedBooks();

        res.status(200).json({
            message: "Liked books retrieved successfully!",
            likedBooks,
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching liked books.",
        });
    }
});

export { router as userRoutes };

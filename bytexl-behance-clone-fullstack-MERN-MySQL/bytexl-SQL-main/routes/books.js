import express from "express";
import { Book, User } from "../models/index.js";
import authenticateUser from "../middleware/auth.js";

const router = express.Router();

router.post("/:bookId/like", async (req, res) => {
    const { bookId } = req.params;
    const { userId } = req.body;

    if (!userId || !bookId) {
        return res
            .status(400)
            .json({ message: "userId and bookId are required." });
    }

    try {
        const user = await User.findByPk(userId);
        const book = await Book.findByPk(bookId);

        if (!user || !book) {
            return res.status(404).json({ message: "User or Book not found." });
        }

        const isLiked = await user.hasLikedBook(book);
        if (isLiked) {
            return res.status(200).json({
                message: "Book is already liked!",
            });
        }

        await user.addLikedBook(book);
        const likedBooks = await user.getLikedBooks();

        res.status(200).json({
            message: "Book liked successfully!",
            likedBooks,
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while liking the book.",
        });
    }
});

router.post("/:bookId/unlike", async (req, res) => {
    const { userId } = req.body;
    const { bookId } = req.params;

    if (!userId || !bookId) {
        return res
            .status(400)
            .json({ message: "userId and bookId are required." });
    }

    try {
        const user = await User.findByPk(userId);
        const book = await Book.findByPk(bookId);

        if (!user || !book) {
            return res.status(404).json({ message: "User or Book not found" });
        }

        await user.removeLikedBook(book);
        const likedBooks = await user.getLikedBooks();

        res.status(200).json({
            message: "Book unliked successfully!",
            likedBooks,
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while unliking the book.",
        });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found." });
        }

        res.status(200).json({
            message: "Book retrieved successfully!",
            book,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve book." });
    }
});

router.put("/:id", authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { title, author, category, rating, price, year, image } = req.body;

    try {
        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found." });
        }

        const updatedBook = await book.update({
            title,
            author,
            category,
            rating,
            price,
            year,
            image,
        });

        res.status(200).json({
            message: "Book updated successfully!",
            book: updatedBook,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update book." });
    }
});

router.delete("/:id", authenticateUser, async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found." });
        }

        await book.destroy();

        res.status(200).json({
            message: "Book deleted successfully!",
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete book." });
    }
});

router.get("/", async (_, res) => {
    try {
        const books = await Book.findAll();
        const booksWithLikes = await Promise.all(
            books.map(async (book) => {
                const totalLikes = await book.countUsersWhoLike();
                return { ...book.toJSON(), totalLikes };
            })
        );

        res.status(200).json({
            message: "Books retrieved successfully!",
            books: booksWithLikes,
        });
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Failed to retrieve books." });
    }
});

router.post("/", authenticateUser, async (req, res) => {
    const { title, author, category, rating, price, year, image } = req.body;

    if (!title || !author || !category || !rating || !price || !year) {
        return res.status(400).json({
            message:
                "Title, author, category, ratings, price, and year are required.",
        });
    }

    try {
        const newBook = await Book.create({
            title,
            author,
            category,
            rating,
            price,
            year,
            image,
        });

        res.status(201).json({
            message: "Book created successfully!",
            book: newBook,
        });
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Failed to create book." });
    }
});

export { router as bookRoutes };

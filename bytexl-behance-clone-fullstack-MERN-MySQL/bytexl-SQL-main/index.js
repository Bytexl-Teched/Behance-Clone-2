import express from "express";
import synchronize from "./database/sync.js";
import { authRoutes } from "./routes/auth.js";
import { bookRoutes } from "./routes/books.js";
import { userRoutes } from "./routes/users.js";
import { config } from "dotenv";
import seedBooks from "./database/seedDatabase.js";
config();

const app = express();
app.use(express.json());
await synchronize();

// Uncomment the function call
// ONLY IF you want to seed the database
// with mock data
// await seedBooks();

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

const PORT = 5491;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

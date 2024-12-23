import sequelize from "./connection.js";
import Book from "../models/bookSchema.js";
import mockData from "./mockData.js";

async function seedBooks() {
    try {
        await sequelize.sync();
        await Book.bulkCreate(mockData);
        console.log("Mock data inserted successfully!");
    } catch (error) {
        console.error("Error inserting mock data:", error);
    }
}

export default seedBooks;

import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

const Book = sequelize.define(
    "Book",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: "books",
        timestamps: true,
    }
);

export default Book;

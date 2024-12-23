import sequelize from "./connection.js";

async function synchronize() {
    try {
        await sequelize.sync();
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Failed to synchronize models:", error);
    }
}

export default synchronize;

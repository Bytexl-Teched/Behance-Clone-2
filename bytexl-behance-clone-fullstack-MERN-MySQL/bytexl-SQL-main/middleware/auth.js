import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const authenticateUser = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res
            .status(401)
            .json({ message: "No token provided, authorization denied." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ message: "Token is not valid, authorization denied." });
    }
};

export default authenticateUser;

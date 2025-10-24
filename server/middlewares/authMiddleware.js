import { header } from "express-validator";
import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {

    let token;



    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
        token = req.cookies.token
    }

    if (!token) {

        return res.status(401).json({ message: "Not authorized, no token" })
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (err) {
        return res.status(401).json({ message: "Not authorized, token failed" })
    }

}

export default authMiddleware;
import express from "express"
import { createProfile, editOrUpdateProfile, getCurrentUser } from "../controllers/user.controllers.js"
import authMiddleware from "../middlewares/authMiddleware.js";


const route = express.Router();
route.post("/profile", authMiddleware, createProfile);
route.get("/current", authMiddleware, getCurrentUser);
route.put("/profileupdate", authMiddleware, editOrUpdateProfile)


export default route;
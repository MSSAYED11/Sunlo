import jwt from "jsonwebtoken";

const getToken = async (id) => {
    try {
        const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        return token;
    } catch (err) {
        throw new Error("Error in generating token");
    }
}

export default getToken;
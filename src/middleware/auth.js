import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export const authJWTAuth = (req, res, next) =>{

    const token =
    (req.cookies && req.cookies.token) ||
    (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);    

    if(!token){
        return res.status(401).json({
            message: "No existe token de autenticación"
        })    
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.usuario = decoded;
        next();
    }  
    catch(error){
        res.status(401).json({
            meesage:"Token invalido o expirado",
            error:error.message
        })
    }
}
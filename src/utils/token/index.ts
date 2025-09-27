
import jwt, { Secret } from "jsonwebtoken";
import config from "@app/config";


const encoder = new TextEncoder();
const configJwt = config.jwt;

if (!configJwt) {
    throw new Error("JWT_ACCESS_SECRET no esta configurado");
}

export const SecretKey: Secret | Uint8Array = encoder
    .encode(configJwt.access_secret)
    .toString();


export const verifyTokenRoute = (token: string): any => {
    try {
        const decoded = jwt.verify(token, SecretKey);

        if (decoded.sub === "token_authenticate") {
            return { valid: true, decoded };
        } else {
            return { valid: false, decoded: null };
        }
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            console.error("El token ha expirado");
        } else if (err.name === "JsonWebTokenError") {
            console.error("El token no es válido");
        } else {
            console.error("Error al verificar el token:", err.message);
        }
        return { valid: false, decoded: null };
    }
};

export const verifyToken = (token: string): any => {
    try {
        const decoded = jwt.verify(token, SecretKey);

        return { valid: true, decoded };
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            console.error("El token ha expirado");
        } else if (err.name === "JsonWebTokenError") {
            console.error("El token no es válido");
        } else {
            console.error("Error al verificar el token:", err.message);
        }
        return { valid: false, decoded: null };
    }
};
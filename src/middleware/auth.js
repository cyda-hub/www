import jwt from "jsonwebtoken";

export default function(strict = true) {
    return function (req, res, next) {
        const token = req.cookies.token;
        if (!token) {
            if (!strict) {
                next();
                return;
            }

            return res.redirect("/");
        }

        try {
            const decoded = jwt.verify(token, "randomString");
            req.user = decoded.user;
            next();
        } catch (e) {
            console.error(e);
            res.status(500).send({ message: "Invalid Token" });
        }
    }
}

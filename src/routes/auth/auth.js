import jwt from "jsonwebtoken";
import express from "express";

import cryptr from "../../encription/index.js";
import { check, validationResult } from "express-validator";

import User from "../../models/userModel.js";

const router = express.Router();

const createError = (err) => {
    return { msg: err }
}

router.get("/signup", async (req, res) => {
    const token = req.cookies.token;
    if (token) { return res.redirect("/app") };

    return res.render("auth/register.ejs");
});

router.get("/login", async (req, res) => {
  const token = req.cookies.token;
  if (token) { return res.redirect("/app") };

  return res.render("auth/login.ejs");
});

router.post(
    "/signup",
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password (min. characters is 6)").isLength({
            min: 6,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array().map(x => x.msg),
            });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({
                email,
            });

            if (user) {
                return res.status(400).json({
                    errors: [createError("User Already Exists")],
                });
            }

            user = new User({
                email,
                password,
            });

            user.password = cryptr.encrypt(password);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                "randomString",
                {
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token,
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).json({
                errors: [createError("Error saving (server error)")],
            });
        }
    }
);

router.post(
    "/login",
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({
                email,
            });
            if (!user)
                return res.status(400).json({
                    errors: [createError("User Not Exist")],
                });


            const isMatch = cryptr.decrypt(user.password) == password;
            if (!isMatch)
                return res.status(400).json({
                    errors: [createError("Incorrect Password!")],
                });

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                "randomString",
                {
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token,
                    });
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({
                errors: [createError("Server Error")],
            });
        }
    }
);

export default router;

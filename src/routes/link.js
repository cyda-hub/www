
import { nanoid } from "nanoid";
import mongoose from "mongoose";

import URL from "../models/urlModel.js";
import cryptr from "../encription/index.js";
import User from "../models/userModel.js";

export default async (req, res) => {
    const { destination, code, pwd, date } = req.body;
    let user = undefined;
    let has_errors = false;

    // Generate a unique id to identify the URL
    let id = nanoid(7);

    id = code || id;

    const originalLink = await URL.findOne({ id });
    if (originalLink) {
        return res.json({ message: "Link with that code already exists", type: "failure" });
    }

    let newURL;
    if (req.user) {
        user = await User.findById(req.user.id);
        newURL = new URL({ destination, id, pwd: pwd === "" ? "" : cryptr.encrypt(pwd), expireAt: date, owner: user._id });
    } else {
        newURL = new URL({ destination, id, pwd: pwd === "" ? "" : cryptr.encrypt(pwd), expireAt: date })
    }

    if (has_errors) return;

    try {
        newURL.save();
    } catch (err) {
        res.send("An error was encountered! Please try again.");
    }

    // The shortened link: our server address with the unique id
    res.json({
        message: `/${newURL.id}`,
        type: "success",
    });
}

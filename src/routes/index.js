import User from "../models/userModel.js";
import { createURL } from "../utils/index.js";

export default async (req, res) => {
    let user = undefined;
    if (req.user) {
        user = await User.findById(req.user.id);
    }

    res.render("index.ejs", {
        user,
        url: createURL(req)
    });
}

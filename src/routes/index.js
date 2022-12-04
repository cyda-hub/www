import User from "../models/userModel.js";

export default async (req, res) => {
    let user = undefined;
    if (req.user) {
        user = await User.findById(req.user.id); 
    }

    res.render("index.ejs", { user });
}

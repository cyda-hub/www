import User from "../models/userModel.js";

export default async (req, res) => {
    const user = await User.findById(req.user.id);

    return res.render("dashboard/index.ejs", { user, dashboardPage: 'home' });
}

import User from "../models/userModel.js";

export default async (req, res) => {
    const user = await User.findById(req.user.id);

    return res.render("dashboard/index.ejs", { user, dashboardPage: 'home' });
}

export const dashboard_links = async (req, res) => {
    const user = await User.findById(req.user.id);

    return res.render("dashboard/index.ejs", { user, dashboardPage: 'links' });
}

export const dashboard_settings = async (req, res) => {
    const user = await User.findById(req.user.id);

    return res.render("dashboard/index.ejs", { user, dashboardPage: 'settings' });
}

import URL from "../models/urlModel.js";
import User from "../models/userModel.js";

import cryptr from "../encription/index.js";

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

export const dashboard_info = async (req, res) => {
    const user = await User.findById(req.user.id);
    let info = {
        links: []
    }

    let links = (await URL.find({ owner: user._id })).reverse();
    for (const link of links) {
        info.links.push({
            id: link.id,
            dest: link.destination,
            pws: link.pwd === "" ? "" : cryptr.decrypt(link.pwd),
            expire: link.expireAt
        })
    }

    return res.json(info)
}

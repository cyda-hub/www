import URL from "../models/urlModel.js";
import User from "../models/userModel.js";

import cryptr from "../encription/index.js";
import Analytics from "../models/analyticsModel.js";

import { createURL } from "../utils/index.js";

export default async (req, res) => {
    const user = await User.findById(req.user.id);

    return res.render("dashboard/index.ejs", {
        user,
        dashboardPage: 'home',
        url: createURL(req),
    });
}

export const dashboard_settings = async (req, res) => {
    const user = await User.findById(req.user.id);

    return res.render("dashboard/index.ejs", {
        user,
        dashboardPage: 'settings',
        url: createURL(req)
    });
}

export const dashboard_link = async (req, res) => {
    const user = await User.findById(req.user.id);
    const {id} = req.params;

    const originalLink = await URL.findOne({ id });
    if ((!originalLink) || (originalLink.owner != user._id)) {
      return res.redirect("/app");
    }

    const analytics = await Analytics.findOne({ linkID: originalLink._id });
    return res.render("dashboard/index.ejs", {
        user,
        url: createURL(req),
        link: originalLink,
        analytics,
        dashboardPage: "link-view"
    });
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
            pwd: link.pwd === "" ? "" : cryptr.decrypt(link.pwd),
            expire: link.expireAt
        })
    }

    return res.json(info)
}

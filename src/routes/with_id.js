
import URL from "../models/urlModel.js";
import {createURL, nowUnix} from "../utils/index.js";
import Analytics from "../models/analyticsModel.js";
import UAParser from "ua-parser-js";

import geoip_lite from "geoip-lite";
const { lookup } = geoip_lite;

export default async (req, res) => {
    const {id} = req.params;

    const originalLink = await URL.findOne({ id });
    if (!originalLink) {
      return res.redirect("/");
    }

    let analytics = await Analytics.findOne({ linkID: originalLink._id });
    if (analytics) {
        let now = nowUnix();

        let referers = analytics.referers;
        let locations = analytics.locations;
        let linksClicked = analytics.linksClicked;
        let devices = analytics.devices;

        const addIfExistsOrUpdate = (schema, value) => {
          schema.push({value, timestamp: now });
        }

        {
          let referer = req.headers.referer;
          if (referer) {
            addIfExistsOrUpdate(referers, referer);
          }
        }

        {
          const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
          let location = lookup(ip);

          if (location) {
            addIfExistsOrUpdate(locations, location.country);
          }
        }

        {
          linksClicked.push({ timestamp: now });
        }

        {
          let ua = req.headers['user-agent'];
          let parsed_ua = new UAParser(ua);

          console.log(parsed_ua.getOS().name ?? "BOT")
          if (req.device) {
            addIfExistsOrUpdate(devices, {
              devices: req.device.type.toUpperCase(),
              os: parsed_ua.getOS().name ?? "BOT",
              browsers: parsed_ua.getBrowser().name ?? "BOT"
            });
          }
        }

        analytics.updateOne({
          referers,
          locations,
          linksClicked,
          devices,
        }).exec();
    }

    if (originalLink.pwd) {
      return res.render("password.ejs", {
        id: id,
        url: createURL(req)
      });
    }

    res.redirect(originalLink.destination);
}

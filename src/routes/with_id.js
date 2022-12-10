
import URL from "../models/urlModel.js";
import {createURL, nowUnix} from "../utils/index.js";
import Analytics from "../models/analyticsModel.js";

export default async (req, res) => {
    const {id} = req.params;

    const originalLink = await URL.findOne({ id });
    if (!originalLink) {
      return res.redirect("/");
    }

    let analytics = await Analytics.findOne({ linkID: id });
    if (analytics) {
        let now = nowUnix();

        let referers = analytics.referers;
        let locations = analytics.locations;
        let linksClicked = analytics.linksClicked;
        let devices = analytics.devices;

        {
          let referer = req.headers.referer;
          if (referer) {
            referers.push({value: referer, timestamp: now });
          }
        }

        // {
        //   let location = req.headers.referer;
        //   if (location) {
        //     locations.push({value: referer, timestamp: now });
        //   }
        // }

        // {
        //   let referer = req.headers.referer;
        //   if (referer) {
        //     referers.push({value: referer, timestamp: now });
        //   }
        // }

        // {
        //   let referer = req.headers.referer;
        //   if (referer) {
        //     referers.push({value: referer, timestamp: now });
        //   }
        // }

        analytics.update({
          referers,
          locations,
          linksClicked,
          devices,
        }).exec();
      // TODO: fill analytics
    }

    if (originalLink.pwd) {
      return res.render("password.ejs", {
        id: id,
        url: createURL(req)
      });
    }

    res.redirect(originalLink.destination);
}

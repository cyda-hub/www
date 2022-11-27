
import URL from "../models/urlModel.js";

export default async (req, res) => {
    const id = req.params.id;

    const originalLink = await URL.findOne({ id });

    if (!originalLink) {
      return res.sendFile(__dirname + "/public/404.html");
    }

    res.redirect(originalLink.url);
}

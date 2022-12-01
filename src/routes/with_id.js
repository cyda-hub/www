
import URL from "../models/urlModel.js";
import path from "path";

const __dirname = path.resolve();

export default async (req, res) => {
    const id = req.params.id;

    const originalLink = await URL.findOne({ id });

    if (!originalLink) {
      return res.sendFile(__dirname + "/public/404.html");
    }

    res.redirect(originalLink.destination);
}

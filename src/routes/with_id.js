
import URL from "../models/urlModel.js";
import path from "path";

export default async (req, res) => {
    const {id} = req.params;

    const originalLink = await URL.findOne({ id });
    if (!originalLink) {
      return res.redirect("/");
    }

    if (originalLink.pwd) {
      return res.render("password.ejs", {
        id: id
      });
    }

    res.redirect(originalLink.destination);
}

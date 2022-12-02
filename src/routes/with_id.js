
import URL from "../models/urlModel.js";
import path from "path";

const __dirname = path.resolve();

export default async (req, res) => {
    const {id} = req.params;

    const originalLink = await URL.findOne({ id });

    console.log(id)
    if (!originalLink) {
      return res.sendFile(__dirname + "/public/404.html");
    }

    if (originalLink.pwd) {
      return res.render("password.ejs", {
        id: id
      });
    }

    res.redirect(originalLink.destination);
}

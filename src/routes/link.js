
import { nanoid } from "nanoid";
import URL from "../models/urlModel.js";

export default (req, res) => {
    const { destination, code, pwd, date } = req.body;

    // Generate a unique id to identify the URL
    let id = nanoid(7);

    id = code || id;

    let newURL = new URL({ destination, id, pwd, date });
    try {
        newURL.save();
    } catch (err) {
        res.send("An error was encountered! Please try again.");
    }

    // The shortened link: our server address with the unique id
    res.json({
        message: `/${newURL.id}`,
        type: "success",
    });
}

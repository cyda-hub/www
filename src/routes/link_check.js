
import URL from "../models/urlModel.js";
import path from "path";
import cryptr from "../encription/index.js";

const __dirname = path.resolve();

export default async (req, res) => {
    const { id, pwd } = req.body;

    const link = await URL.findOne({ id });
    if (pwd == cryptr.decrypt(link.pwd)) {
        res.json({
            message: link.destination,
            type: "success",
        });
    } else {
        res.json({
            message: `Incorrect password!`,
            type: "failure",
        });;
    }
}

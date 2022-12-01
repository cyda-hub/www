import path from "path";
const __dirname = path.resolve();

export default (req, res) => {
    res.sendFile(__dirname + "/public/pages/index.html");
}

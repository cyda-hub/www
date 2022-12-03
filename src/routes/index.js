import path from "path";
const __dirname = path.resolve();

export default (req, res) => {
    res.render("index.ejs");
}

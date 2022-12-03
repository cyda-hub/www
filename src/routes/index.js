import path from "path";

export default async (req, res) => {
    let user = undefined;

    if (res.user) {
        user = await User.findById(req.user.id)
    }


    res.render("index.ejs", { user });
}

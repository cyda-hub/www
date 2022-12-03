import express from "express";
import dotenv from "dotenv";
import path from "path";
import ejs from "ejs";

import index_route from "./routes/index.js";
import with_id from "./routes/with_id.js";
import link_check from "./routes/link_check.js";
import link from "./routes/link.js";

import dashboard from "./routes/app.js";

import auth from "./routes/auth/auth.js";
import auth_middleware from "./middleware/auth.js";

import { validateURL } from "./utils/index.js";
import { connectToDB } from "./db/connect.js";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const __dirname = path.resolve();

dotenv.config();

export default () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname + "/public")); // This line helps us server static files in the public folder. Here we'll write our CSS and browser javascript code

    app.use(cookieParser());
    app.use(bodyParser.json());

    app.get("/", index_route);
    app.post("/link", validateURL, link);
    app.post("/link-pws-check", link_check);

    app.get("/app", auth_middleware, dashboard);

    app.use("/auth", auth);
    app.get("/:id", with_id);

    app.set('views', path.join(__dirname, '/public/pages'));
    app.engine('html', ejs.renderFile);

    connectToDB();

    app.listen(8000, () => {
        console.log("App listening on host http://localhost:8000 and on port 8000");
    });
}

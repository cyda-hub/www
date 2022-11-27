import express from "express";
import dotenv from "dotenv";
import path from "path";

import index_route from "./src/routes/index.js";
import with_id from "./src/routes/with_id.js";
import link from "./src/routes/link.js";

import { validateURL } from "./src/utils/index.js";
import { connectToDB } from "./src/db/connect.js";

const __dirname = path.resolve();

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); // This line helps us server static files in the public folder. Here we'll write our CSS and browser javascript code

app.get("/", index_route);
app.get("/:id", with_id);
app.post("/link", validateURL, link);

connectToDB();

app.listen(8000, () => {
    console.log("App listening on port 8000");
});

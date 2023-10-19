import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000;

app.use(express.static("public"));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`Listening to port ${port}!`);
})
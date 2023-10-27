import express from "express";
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let taskArray = [];

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index.ejs", { tasks: taskArray });
});

app.post("/submit", (req, res) => {
  let newTask = req.body["task-name"];
  taskArray.unshift(newTask);

  res.render("index.ejs", { tasks: taskArray });
})

// Generating an index.html file for github
app.get("/generate", (req, res) => {
  ejs.renderFile(
    path.join(__dirname, "views", "partials", "header.ejs"),
    {},
    (err, header) => {
      if (err) {
        res.status(500).send("Error rendering header template");
        return;
      }

      ejs.renderFile(
        path.join(__dirname, "views", "index.ejs"),
        {},
        (err, content) => {
          if (err) {
            res.status(500).send("Error rendering index template");
            return;
          }

          ejs.renderFile(
            path.join(__dirname, "views", "partials", "footer.ejs"),
            {},
            (err, footer) => {
              if (err) {
                res.status(500).send("Error rendering footer template");
                return;
              }

              // Combine the header, content, and footer and save the HTML
              const fullHtml = `${header}${content}${footer}`;
              fs.writeFileSync(
                path.join(__dirname, "build", "index.html"),
                fullHtml
              );
              res.send("HTML file generated and saved.");
            }
          );
        }
      );
    }
  );
});

app.listen(port, () => {
  console.log(`Listening to port ${port}!`);
});

import express from "express";

const app = express();
const PORT = 3000;
let taskArray = [];
let workTaskArray = [];

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("mockup.ejs", { tasks: taskArray });
});

app.post("/submit", (req, res) => {
  let newTask = req.body["new-task"];
  taskArray.unshift(newTask);

  res.render("mockup.ejs", { tasks: taskArray });
});

app.get("/work", (req, res) => {
  res.render("mockup1.ejs", { workTasks: workTaskArray });
});

app.post("/work/submit", (req, res) => {
  let newWorkTask = req.body["new-work-task"];
  workTaskArray.unshift(newWorkTask);

  res.render("mockup1.ejs", { workTasks: workTaskArray });
});

app.listen(PORT, () => {
  console.log(`This server is running on port ${PORT}!`);
});

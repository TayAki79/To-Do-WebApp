import express from 'express';

const app = express()
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("<h1>Welcome to my To-Do-List-Web-App!</h1>");
})

app.listen(port, () => {
    console.log(`Listening to port ${port}!`);
})
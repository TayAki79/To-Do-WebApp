<!-- Here are my steps by building this Mockup for testing purpose for this To-Do-List App -->

1. npm init -y --> Creating a package.json file
2. Inside json-file insert "type": "module" --> To make ES6 modules work for imports
3. npm i express --> Installing express.js and its modules
4. [In Terminal] touch index.js --> Create index.js file
5. [In Terminal] mkdir public views --> Create a public folder and a views folder
6. [In Terminal] cd public --> Go into public folder
7. [In Terminal] mkdir images styles --> Create an images folder and a styles folder
8. [In Terminal] cd styles --> Go into styles folder
9. [In Terminal] touch style.css --> Create style.css file
10. [In Terminal] cd .. (2x) --> Go back to root folder
11. [In Terminal] cd views --> Go into views folder
12. [In Terminal] mkdir partials && touch partials/header.ejs partials/footer.ejs && touch index.ejs work.ejs --> Creates a partials folder with a header.ejs file and footer.ejs file inside of it, and also create an index.ejs file and work.ejs file inside the views folder
13. import express from "express"; --> Import express modules in index.js
14. const app = express(); --> Create an express app in index.js
15. const PORT = 3000; --> Create a variable for port-number in index.js
16. app.listen(PORT, () => { console.log(`This server is running on port ${PORT}!`); }); --> Make the app listen to port 3000 in index.js
17. [In Terminal] cd .. --> Go back to root directory
18. [In Terminal] nodemon index.js --> running nodemon on the index.js file
19. app.get("/", (req, res) => { res.render("index.ejs"); }) --> Make a get-request in index.js in order to render the index.ejs file in the browser
20. npm i ejs --> Page did not render because EJS module wasn't installed
21. Setting up an simplified HTML page in index.ejs first for functionality testings
22. <p>Copyright © <%= new Date().getFullYear() %> </p> --> Write this inside the footer. EJS tag creates current year automatically
23. <div class="date-wrapper">
      <h1>
        <%= new Date().toLocaleDateString("de-DE", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); %>
      </h1>
    </div>
    --> Write this inside the main section. EJS tag creates a date in german format ("de-DE"). The object determines wether a data is in long form or numeric form.
24. <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>To Do List App</title>
    </head>
    <body>
      <header>
        <nav>
          <ul>
            <li>Today</li>
            <li>Work</li>
          </ul>
        </nav>
      </header>
      <main>
    Cutting this out of index.ejs and paste it into header.ejs to create a header partial
25. </main>
      <footer>
        <p>Copyright © 
          <%= new Date().getFullYear() %>
        </p>
      </footer>
    </body>
    </html>
    Cutting this out of index.ejs and paste it into footer.ejs to create a footer partial
26. <%- include("partials/header.ejs") %> --> Write this on top of the index.ejs file includes all of the header.ejs content
27. <%- include("partials/footer.ejs") %> --> Write this at the bottom of the index.ejs file includes all of the footer.ejs content
28. app.get("/work", (req, res) => { res.render("work.ejs"); }); --> Renders the work.ejs file in the browser with the path https://localhost:3000/work
29. app.post("/submit", (req, res) => { --> Setting up a post request targeting "/submit" where the data will be sent to after the submit button got pushed
    let newWorkTask = req.body["new-work-task"]; --> Creating a new variable to store the input data from the form element in my index.ejs file
    workTaskArray.unshift(newWorkTask); --> Right on top underneath const PORT = 3000; Creating an empty array let taskArray = []; Here newTask will be pushed to the beginning of the array everytime the submit button got pushed

    res.render("index.ejs", { workTasks: workTaskArray}); --> Rendering the index.ejs file in the /submit page with the taskArray and the key-name tasks inside of index.ejs
    })

30. [In Terminal] npm i body-parser --> Install body-parser middleware to make use of it
31. app.use(express.urlencoded({ extended: true })); --> In order to make req.body["new-task"] accessible we make use of body-parser
32. Setting up an simplified HTML page in work.ejs first for functionality testings
33. let workTaskArray = []; --> Creating a new empty workTaskArray underneath the empty todayTaskArray for later use
34. app.get("/work", (req, res) => {
    res.render("work.ejs");
    });
    Creating a get request for the /work page. The empty workTaskArray is also for refreshing purposes in order to delete its content
35. app.post("/work/submit", (req, res) => {
    let workNewTask = req.body["new-task-work"];
    workTaskArray.unshift(workNewTask);

    res.render("work.ejs", { workTasks: workTaskArray });
    });
    Creating a post request for the /work page when a new task item is submitted

<!-- Crossing the task item when the checkbox got pushed -->

1. <input type="checkbox" class="task-checkbox"> --> Creating a checkbox before a task
2. <label class="task-label"><%= newTask %></label> --> This label takes in the new task and is inline with the checkbox
3. .task-checkbox:checked + .task-label {
   text-decoration: line-through;
   }
   That's a CSS styling code. The pseudo element :checked checks if a checkbox got checked or not. If it's checked the text-content of the label element with the class name task-label will be lined through. If clicking again the line disappears again, "Job's not done!"
4. Implementing this functionality in the work page with different class-names.

<!-- Issues I ran into -->

1. Whenever I try to submit a new task it replaces the task in the array instead of it being pushed to the array. The problem was I declared the empty array inside the post request. Since Javascript compiles the code from top to bottom it always starts with the empty array, initialize the new task to a variable and then pushes it to the array and finally got rendered in the EJS file. When I submit a new task it again starts with deleting the array. So the solution was to declare the empty array outside of the post request scope so that every task that has been pushed to the array stays in the array.

2. When I refresh the page and submit a new task the items I already pushed to the array before the refreshing stayed in there and the new task just been added to them. So I inserted the array as an empty array inside the get request which means when I refresh the page the get request got triggered and everything inside of it. Since I put the empty array before the res.render function it deletes the array first before rendering the page again.

3. Now I have two pages running. The index.ejs page which runs the today tasks and the work.ejs page which runs the work tasks. The problem I ran into was that whenever I switched to the work page and try to submit a new task it always switches back to the today page and added the task to that array. The mistake I made was that I did not realize that inside my post request I render the index.ejs page instead of the work.ejs page. Maybe it's also worth mentioned that I only realize that mistake because when the today page got displayed the path still showed localhost:3000/work/submit while the today page actually runs on / or /submit =D

4. After fixing this issue I had the problem that when I added some tasks into my array in the today page they still remain on the page even when I switched over to the work page. But there should be two different to do lists each for every page. I fixed that problem by giving the work page its uniqe variable names for the array, for the new task and for the name attribute in my work.ejs file.

5. Also I had a little issue when I switch between those pages after adding some tasks to the arrays. The list items always disappears. But then I recall that whenever I switch the page a get request got triggered and I had no object passed to the render function. So I inserted the tasks object to my get requests.

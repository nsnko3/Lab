let express = require('express');
let bodyParser = require('body-parser');
let app = express();

let db = [];

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

//parse application/json
app.use(bodyParser.json());

//Setup the view Engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Setup the static assets directories
app.use(express.static('images'));
app.use(express.static('css'));

//To call the homepage
app.get('/', function (req, res) {
    res.render('index.html');
});

//GET callback method to render the html page to add the task
app.get('/addtask', function (req, res) {
    res.render('addtasks.html');
});

//POST method to handle POST requests from the input field
app.post('/newtask', function (req, res) {
    let taskdetails = req.body;
    let newTask = {
        name: taskdetails.taskname,
        due: taskdetails.taskdue,
        description: taskdetails.taskdescription
    };

    db.push(newTask); //Pushes the input data from the form into a database array
    console.log(taskdetails.taskname);
    console.log(taskdetails.taskdue);
    console.log(taskdetails.taskdescription);
    res.redirect('listtasks'); //Redirects to the List Tasks method and page to show the current task added
});

//GET method for the request to print out all tasks in the database
app.get('/listtasks', function (req, res) {
    let taskdb = db; //Declaring the database locally to be ale to call it using the HTML page
    res.render('listtasks.html', {taskdb:db});
});

app.listen(8080);

let express = require('express');
const mongodb = require("mongodb");
let bodyParser = require('body-parser');
let app = express();

//Configure MongoDB
const MongoClient = mongodb.MongoClient;
{useUnifiedTopology : true}

// Connection URL
const url = "mongodb://localhost:27017/";

let db;

//Connect to mongoDB server
MongoClient.connect(url, { useNewUrlParser: true },
    function (err, client) {
        if (err) {
            console.log("Err  ", err);
        } else {
            console.log("Connected successfully to server");
            db = client.db("fit2095db");
        }
});


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

<<<<<<< HEAD
//GET callback method to render the html page and form to add the task
app.get('/addtasks', function (req, res) {
=======
//GET callback method to render the html page to add the task
app.get('/addtasks', function (req, res) {
>>>>>>> 8a8f4f885fa971b6fc66e6103d812426e505d0f8
    res.render('addtasks.html');
});

//POST method to handle POST requests from the input field
app.post('/newtask', function (req, res) {
    let taskdetails = req.body;
    taskdetails.taskId = getNewId();
    taskdetails.taskstatus = "InProgress"
    db.collection('tasks').insertOne({ 
        id: taskdetails.taskId, 
        name: taskdetails.taskname, 
        assignto: taskdetails.taskassigned, 
        due: taskdetails.taskdue,
        status: taskdetails.taskstatus,
        description: taskdetails.taskdescription 
    });
    res.redirect('listtasks'); // redirect the client to list tasks page
});
    

//GET method for the request to print out all tasks in the database
app.get('/listtasks', function (req, res) {
    db.collection('tasks').find({}).toArray(function (err, data) {
        res.render('listtasks', { taskdb: data });
    });

    // let taskdb = db; //Declaring the database locally to be ale to call it using the HTML page
    // res.render('listtasks.html', {taskdb:db});
});

//Delete Task: 
//GET request: send the page to the client to enter the user's name
app.get('/deletetask', function (req, res) {
    res.render('deletetask.html');
});

//POST request: receive the user's name and do the delete operation 
app.post('/deletetaskdata', function (req, res) {
    let taskdetails = req.body;
    let filter = { id: parseInt(taskdetails.taskId) };
    db.collection('tasks').deleteOne(filter);
    res.redirect('listtasks'); // redirect the client to list users page
});

<<<<<<< HEAD
app.post('/deletealltasks', function (req, res) {
    db.collection('tasks').deleteMany({status: 'Completed'});
    res.redirect('listtasks');
});

//Update Task:
app.get('/updatetasks', function (req, res) {
    res.render('updatetask.html');
});

//POST method to change status of task from InProgress to Completed
app.post('/updatetaskdata', function (req, res) {
    let taskdetails = req.body;
    let filter = { id: parseInt(taskdetails.taskId) };
    let update = { $set: { status: 'Completed' } };
    db.collection('tasks').updateOne(filter, update);
    res.redirect('/listtasks');// redirect the client to list tasks page
});

//POST method to change status of task from Completed to InProgress
app.post('/updatecompletedtask', function (req, res) {
    let taskdetails = req.body;
    let filter = { id: parseInt(taskdetails.taskId) };
    let update = { $set: { status: 'InProgress' } };
    db.collection('tasks').updateOne(filter, update);
    res.redirect('/listtasks');// redirect the client to list tasks page
});

function getNewId() {
    return (Math.floor(100000 + Math.random() * 900000));
};

app.listen(8080);
=======
app.listen(8080);
>>>>>>> 8a8f4f885fa971b6fc66e6103d812426e505d0f8

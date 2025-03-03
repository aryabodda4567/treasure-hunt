const express = require('express')
const app = express();
const  path = require('path');
const bodyParser = require('body-parser');
const addQuestion = require('./routes/questions');
const  port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
    console.log(path.join(__dirname, 'views'));
    res.render('index');
})



app.use("/addQuestion", addQuestion);


app.listen(port, function () {
            console.log("Listening on port " + port);
});








const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const question = require('./routes/questions');
const cookieParser = require("cookie-parser");
const validator = require("./validation/validate");




const  port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));







app.get('/', validator.validateAndSetCookies, function (req, res) {
    res.render('index');
})


app.get('/add-question',  function (req, res) {
    res.render('addQuestion');
});


app.get("/eliminate", (req, res) => {
    const  clientToken = req.cookies['token'];
    res.cookie(clientToken,0,{maxAge:(60 * 60 * 1000)*24});
    res.render('eliminate');
})

app.get('/game', validator.validateElimination,validator.validateAndSetCookies,(req, res) => {
    res.render('game');
})

app.use("/question",validator.validateElimination, question);

app.listen(port, function () {
            console.log("Listening on port " + port);
});








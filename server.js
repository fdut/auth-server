const express = require('express');
const hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'App to emulate authentication',
        currentYear: new Date().getFullYear()
    });

});

app.get('/equalauth', (req, res, next) => {
    console.log('New request ...');

    //retrieve Basic Auth
    var bot = req.get('Authorization');

    if (typeof bot !== "undefined") {
        var dec = new Buffer(bot.substring(6), 'base64').toString('ascii');

        var username = dec.split(":")[0];
        var password = dec.split(":")[1];

        console.log("username: " + dec.split(":")[0] + "," + "password: " + dec.split(":")[1]);

        res.setHeader('username', username);
        if (username.localeCompare(password) == 0) {
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    }
    res.sendStatus(400);

});


var port = process.env.PORT || 3000
app.listen(port, function () {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
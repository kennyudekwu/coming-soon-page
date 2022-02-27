const {Subscriber, validateSubscriber} = require('./models/subscribers');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');
const morgan = require('morgan');
const sslRedirect = require('heroku-ssl-redirect').default;
require('winston-mongodb');

app.use(sslRedirect()); // enable ssl redirect

app.use(express.json()); // to be able to parse req json object to endpoint

app.use(express.static("public")); // handling static files

if(app.get('env') === 'development') app.use(morgan('tiny'));

// Connecting to db...
const db = config.get('db');

    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        }).then(() => {
            console.log(`Database connected successfully to ${db}`);
            winston.info(`Database connected successfully to ${db}`);
        });

winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
);

process.on('unhandledRejection', (ex) => {
    throw ex;
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({
    db: db,
    // How to just log errors in mongo, not store debug messages or info messages
    // Although, by default, only the errors would be stored
    level: 'info'
}));


const port = process.env.PORT || 3000;

app.listen(port, () => winston.info(`Listening on port ${port}...`));

// app.get('/home', (req, res)=>{
//     res.sendFile(path.join(__dirname+'/index.html'));
// });

app.post('/api/subscribe', async (req, res) => {
    const {error} = validateSubscriber(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Prevent duplicates

    let subscriber = await Subscriber.findOne({email: req.body.email});
    if (subscriber) return res.status(400).send("You are already subscribed");

    subscriber = new Subscriber(req.body);

    const result = await subscriber.save();

    res.send(result);

});
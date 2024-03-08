const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors({
    origin: true, // "true" will copy the domain of the request back
                  // to the reply. If you need more control than this
                  // use a function.
    credentials: true, // This MUST be "true" if your endpoint is
                       // authenticated via either a session cookie
                       // or Authorization header. Otherwise the
                       // browser will block the response.
    methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
                                           // pre-flight OPTIONS requests
}));

app.use(express.json());

const annoncesRouter = require('./routes/annonce.route');
const adminRouter = require('./routes/admin.route');
const realtorRouter = require('./routes/realtor.route');
const bienRouter = require('./routes/bien.route');
const avantageRouter = require('./routes/avantage.route');
const keywordRouter = require('./routes/keyword.route');

app.use('/annonces', annoncesRouter);
app.use('/admin', adminRouter);
app.use('/realtors', realtorRouter);
app.use('/biens', bienRouter);
app.use('/avantages', avantageRouter);
app.use('/keywords', keywordRouter);


app.listen(3000, () => {
    console.log('serveur is running')
})

module.exports = app;
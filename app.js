const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

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
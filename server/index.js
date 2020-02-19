//Middleware
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const bodyParser = require('body-parser');



//Models
const FakeDb = require('./fake-db');
//const Rental = require('./models/rental');

//Routes
const rentalRoutes = require('./routes/rentals'),
        userRoutes = require('./routes/users');



mongoose.connect(config.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then( () => {
        const fakeDb = new FakeDb();
       // fakeDb.seedDB();
    })

const app = express();

//Use bodyparser
app.use(bodyParser.json());

// RESTFUL routes
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes)


const PORT = process.env.PORT || 3001


app.listen(PORT, function() {
    console.log(`server is running on port ${PORT} `);
})







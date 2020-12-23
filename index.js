const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const routes = express.Router();


//connect DB
require('./db/db')();
//port
const port = process.env.PORT || 4000;

//use cors

//use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//routes
require('./routes/route')(app);
app.use('/api/users', require('./routes/usersRoute'));

app.listen(port, () => {
    console.log(`Server up on port ${port}`)
});
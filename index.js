const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const routes = express.Router();


//connect DB
require('./db/db')();
//port
const port = process.env.PORT || 4000;

//use cors
app.use(cors());

//use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//routes
app.use('/api/users', require('./routes/usersRoute'));
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/task', require('./routes/taskRoute'));

// if(process.env.NODE_ENV === 'production'){
//     //Express will server up production assets
//     //like our main.js file, or main.css file
//     app.use(express.static('client/build'));

//     //Express will server up the index.html file
//     //I fit does not reconize the route
//     const path = require('path');
//     app.get('*', (req,res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
//     });
// };
    
app.listen(port, () => {
    console.log(`Server up on port ${port}`)
});
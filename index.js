const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./routes')
const bodyParser = require('body-parser');
const cors = require('cors');

//instancia de express en mi app
const app = express();
app.use(cors());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods: GET, POST, DELETE');
//     next();
// });

//middleware mrogan para detectar peticiones
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//primera ruta
app.use('/api', apiRouter);

app.get('/', function(req, res) {
    console.log("Estructura base del proyecto final.");
    res.send("Estructura base del proyecto final.");
});

app.set('port', process.env.PORT || 3000);

if (process.env.NODE_ENV !== 'test') {
    app.listen(app.get('port'), () => {
        console.log('Running on http://localhost:' + app.get('port'));
    });
}

module.exports = app;
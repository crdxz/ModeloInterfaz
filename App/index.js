const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'), corsConfig = {
    origin: "*",
};

const app = express(), router = require('./routes/routes');

app.set('view engine','ejs');
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json()); //Formateando el cuerpo de las peticiones
app.use(bodyParser.urlencoded({ extended: false })); //Formatenado contenido de las URL's
app.use(cors(corsConfig));

app.use("/", router);

app.listen(3000, () => {
    console.log('Server on port 3000');
});







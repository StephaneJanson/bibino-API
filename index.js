require('dotenv').config();

const debug = require('debug')('app:server');
const express = require('express');
const cors = require('cors');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const router = require('./app/routers');

const port = process.env.PORT || 4000;

const app = express();
require('./app/helpers/apiDocs')(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(process.env.CORS_DOMAINS ?? '*'));

app.use(router);

app.listen(port, () => {
    debug(`http://localhost:${port}`);
});

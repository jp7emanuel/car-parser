import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import db from './utils/database';
import cors from 'cors';
import {
  generateJson
} from './routes';

let app = express();
let router = express.Router();
router.all('*', cors());

app.server = http.createServer(app);
app.use(bodyParser.json());

router.route('/generate-json').get(generateJson);

app.use(router);

app.server.listen(process.env.PORT || 8080, function () {
  console.log('Listening on port %d!', app.server.address().port);
});

import * as bodyParser from 'body-parser';
import * as express from 'express';
import { getValidatedNumericConfig } from './components/config';
import * as cors from 'cors';
import { log } from './components/logger';
import { getServer } from './graphql';

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json({ limit: '6mb' }));
app.use(bodyParser.urlencoded({ limit: '6mb', extended: true }));
app.use('/ping', (req, res) => res.send('pong'));

const server = getServer();

server.applyMiddleware({
  app,
  path: '/',
});

const port = getValidatedNumericConfig('APP_PORT');

app.listen(
  {
    port: process.env.APP_PORT,
  },
  () => {
    log('info', `Server is running on PORT: ${process.env.APP_PORT}`);
  },
);

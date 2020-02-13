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
app.set('port', (process.env.PORT || 5000));

const server = getServer();

server.applyMiddleware({
  app,
  path: '/',
});

const port = getValidatedNumericConfig('APP_PORT');

app.listen(
  app.get('port'),
  () => {
    log('info', `Server is running on PORT: ${app.get('port')}`);
  },
);

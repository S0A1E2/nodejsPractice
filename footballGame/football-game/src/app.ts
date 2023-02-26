import express from 'express';
import { loggingMiddleware } from './middlewares/logging-middleware';
import { errorHandlingMiddleware } from './middlewares/error-handling-middleware';
import { jsonPrsingMiddleware } from './middlewares/json-parsing-middleware';

const app = express();

app.use(express.json());
app.use(loggingMiddleware);
app.use(jsonPrsingMiddleware);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.use(errorHandlingMiddleware);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
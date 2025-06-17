import express from 'express';
import path from 'path';
import routes from './src/routes';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use('/', routes);

app.listen(3000, () => console.log('Running at http://localhost:3000'));

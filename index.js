let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
let db = require('./util/database');

const expressHbs = require('express-handlebars');
app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'login-layout',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');

app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let routes = require('./routes/router');
app.use(routes);

app.get('/', function (req,res) {
  res.render('login', {layout: 'login-layout.hbs'});
});

app.listen(5000, () => console.log('Server ready @ port 5000'))
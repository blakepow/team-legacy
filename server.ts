import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi = require('swagger-ui-express');
import fs = require('fs');
const db = require('./models');

/* Swagger files start */
const swaggerFile: any = (process.cwd() + "/swagger/swagger.json");
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);

const port = process.env.PORT || 3030;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`DB Connected and server running on ${port}.`);
    });
  })
  .catch((err: JSON) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

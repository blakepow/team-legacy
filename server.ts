import express from 'express';
import { Request, Response, NextFunction } from 'express';
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
  .use(express.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', require('./routes'))
  .use(function (error: any, req: Request, res: Response, next: NextFunction) {
    if(error instanceof SyntaxError){ //Handle SyntaxError here.
      return res.status(400).send({ message : "Invalid JSON request body."});
    } else {
      console.log(error);
      res.status(500).send({ message : "Some internal error occurred. Please try again later."});
      next();
    }
  });;

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Successfully connected to MongoDB.");
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

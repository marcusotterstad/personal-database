const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const assistantRouter = require('./routers/assistantRouter')
app.use('/queries', assistantRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
  
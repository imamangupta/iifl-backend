const express = require('express')
const connectToMongo = require('./config/db');
const cors = require('cors');

const app = express()
const port = 4000

app.use(cors());
connectToMongo();
app.use(express.json());

app.get('/', (req, res) => {
  res.send({"result":"true"})
})

var indexRouter = require('./routes/index');
app.use('/api', indexRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
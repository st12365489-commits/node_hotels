const express = require('express')
const app = express()
const port = 3000
const db = require('./db');
require('dotenv').config();


// Middleware to parse JSON bodies
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello World!')
})
const peronRouter = require('./routes/personRoutes');
app.use ('/', peronRouter);

const menuRouter = require('./routes/menuitemRoutes');
app.use ('/', menuRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
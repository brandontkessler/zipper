const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const errors = require('./api/controllers/errors');
const authRoutes = require("./api/routes/auth");

const db_url = process.env.DB_URL
const port = process.env.PORT

mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: true,
});

app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use("/api/auth", authRoutes);

app.use(errors.notFound);
app.use(errors.errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
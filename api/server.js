const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;
const router = require('../routes');

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/stickers', router);

// Handle 404 and errors
app.use((req, res, next) => {
  const err = new Error('not found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status ? err.status : 500;
  res.status(status).json({
    error: {
      message: error.message
    }
  });
});

// Fire up server
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

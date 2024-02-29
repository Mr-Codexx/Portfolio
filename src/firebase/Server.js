const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // This allows requests from all origins, you can configure it to allow only specific origins if needed

// Your routes and other middleware setup here

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

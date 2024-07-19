const express = require('express');
require('dotenv').config();
const uploadFileRoute = require('./routes/upload');
process.env.PATH = process.env.PATH +  ';C:\\Users\\User\\Downloads\\ffmpeg-7.0.1-essentials_build\\bin';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use('/upload', uploadFileRoute);

app.listen(PORT, () => {
  require('./db/mongoose');
  console.log(`Server is running on ${PORT}`);
});

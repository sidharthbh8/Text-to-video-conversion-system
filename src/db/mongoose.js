const mongoose = require('mongoose');

mongoose.connect(process.env.URI).then(() => console.log('Connected to database'))
.catch((err) => console.log({error: err, message: `failed to connect to database`}))

module.exports = mongoose;
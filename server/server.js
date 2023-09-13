const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./router/authRoutes');
const userRoutes = require('./router/userRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

const dbURI = process.env.DATABASE_URL;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});

// Mounting the form data router 
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

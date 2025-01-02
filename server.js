const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const branchRoute = require("./routes/branchRoutes")
const login = require("./routes/login")

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use("/api/auth", login);
app.use("/api/branch", branchRoute);

// mongoos connection
mongoose.connect('mongodb+srv://russopaul771:36UUuTX8uxKK8a0M@cluster0.ochpu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
  

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

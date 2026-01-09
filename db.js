const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URl
//const mongoURL= process.env.MONGO_URL_LOCAL;
//const mongoURL = 'mongodb+srv://st12365489_db_user:Suraj12345@cluster0.hjxdwxf.mongodb.net/myappdb?retryWrites=true&w=majority&authSource=admin';
  
const mongoURL = process.env.MONGO_URL;
// Connect to MongoDB
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connected successfully');
})
db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
 });
module.exports = db;



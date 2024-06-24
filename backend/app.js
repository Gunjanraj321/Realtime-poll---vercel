require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./router/userRoute');
const pollRoutes = require('./router/pollRouter');
const commentRoutes = require('./router/commentRoute');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');

})

app.use(express.json());
app.use(cors());

// Use routes
app.use(userRoutes);
app.use(pollRoutes(io));
app.use(commentRoutes);

//----------Deployement---------
const __dirname1 = path.resolve();
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname1, '../frontend/dist')));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, 'frontend', 'dist', 'index.html'));
        });
}else{
    app.get('/', (req, res) => {
        res.send('API is running....');
        });
}
//----------Deployement---------

// MongoDB connection
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

// Start server
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app ;
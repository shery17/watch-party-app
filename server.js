const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3000;

// Serve static frontend files
app.use(express.static('public'));

// Route for /session/:id to serve the same HTML file
app.get('/session/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);

    socket.on('play', (currentTime) => {
      socket.to(roomId).emit('play', currentTime);
    });

    socket.on('pause', (currentTime) => {
      socket.to(roomId).emit('pause', currentTime);
    });

    socket.on('seek', (currentTime) => {
      socket.to(roomId).emit('seek', currentTime);
    });

    // Broadcast selected filename to others in the same room
    socket.on('fileName', (fileName) => {
      socket.to(roomId).emit('fileName', fileName);
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

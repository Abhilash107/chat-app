import express from "express";
import http from "http";
import { Server } from 'socket.io';

const app = express()
const server = http.createServer(app)
const PORT = 3000

const io = new Server(server)

io.on('connection', (socket) =>{
   socket.on('user-message', (msg)=>{
    console.log("A new user message", msg);
    io.emit('message', msg)
   })
})

app.use(express.static("../frontend"))

app.get('/', (req, res) =>{
    res.sendFile("../frontend/index.html")
})

server.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`); 
})
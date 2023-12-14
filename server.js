const express = require("express");
//  require("./db");
var mongoURL = `mongodb+srv://tchao:2002@cluster1.nul0kct.mongodb.net/mern-rooms`;
const mongoose = require("mongoose");
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  })

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB Connection failed");
});

connection.once("connection", () => {
  console.log("Mongo DB Connection Successful");
});


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running!");
});

const roomModel = require('./models/room');

app.post("/add_room", async (request, response) => {
    console.log(request.body, "===>>BODY");

  const room = new roomModel(request.body);

  try {
    await room.save();
    response.send(room);
  } catch (error) {
    console.log(error);

    response.status(500).send(error);
    console.log(error);
  }
});

app.get("/rooms", async (request, response) => {
  const rooms = await roomModel.find({});

  try {
    response.send(rooms);
  } catch (error) {
    response.status(500).send(error);
  }
});


const port = process.env.PORT || 5200;

app.listen(port, ()=> console.log(`Node Server Started and running on port: ${port} `)); 






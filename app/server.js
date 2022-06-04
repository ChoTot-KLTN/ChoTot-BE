const connectDb = require("./Common/ConnectDb");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const app = express();
const { PORT } = require("./Common/Config");
const router = require("./Routes/Index.Route");
const paypal = require("./config/paypal");
// const Socket = require("./socket");
const server = require("http").Server(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     method: ["GET", "POST", "PUT", "DELETE"],
//   },
// });
// Socket(io);
// const paypal = require('./config/paypal');

// app.use(
//   cors({
//     origin: [ORIGIN_DEV, ORIGIN_PROD],
//     methods: "GET,POST",
//   })
// );
//express version from v4.16.0
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/Uploads", express.static("Uploads"));
app.use(cors({
  origin: '*',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200 
}));
// app.options("*", cors());
app.use("/", router);
app.get("/", (req, res) => {
  res.send("cccccc");
});
// Connect to paypal
paypal.connect(process.env.CLIENT_ID, process.env.SECRET_PAYPAL_KEY);
connectDb();

app.listen(PORT || 8000, () => console.log(`Listen on port ${PORT}`));

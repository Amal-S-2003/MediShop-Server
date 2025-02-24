
// loads env file contents into process.env by default
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/route");
require("./db/connection");

const medizintekServer = express();
 
medizintekServer.use(cors());
// application specific middleware         
medizintekServer.use(express.json());
medizintekServer.use(router);
medizintekServer.use('/uploads',express.static('./uploads'))
const PORT = 3000;

medizintekServer.listen(PORT, () => {
  console.log(
    `pf-server started running at PORT:${PORT} & waiting for client request`
  );
});

medizintekServer.get("/", (req, res) => {
  res.send("<h1 style=color:green>HELLO</h1>");
});


// loads env file contents into process.env by default
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/route");
require("./db/connection");

const mediShopServer = express();
 
mediShopServer.use(cors());
// application specific middleware         
mediShopServer.use(express.json());
mediShopServer.use(router);
mediShopServer.use('/uploads',express.static('./uploads'))
const PORT = 3000;

mediShopServer.listen(PORT, () => {
  console.log(
    `pf-server started running at PORT:${PORT} & waiting for client request`
  );
});

mediShopServer.get("/", (req, res) => {
  res.send("<h1 style=color:green>HELLO</h1>");
});

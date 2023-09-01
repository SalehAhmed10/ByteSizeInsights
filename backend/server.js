const express = require("express");
const { PORT } = require("./config/index");
const app = express();
const router = require("./routes/index");

const dbConnect = require("./database/index");

app.use(router);

dbConnect();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

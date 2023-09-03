const express = require("express");
const { PORT } = require("./config/index");
const app = express();
const router = require("./routes/index");

const cors = require("cors");
const dbConnect = require("./database/index");
const errorHandler = require("./middlewares/errorHandler");

const cookieParser = require("cookie-parser");

// app.use(router);

// app.use(express.json());

// dbConnect();
app.use(cookieParser());

app.use(express.json());

// app.use(cors(corsOptions));

app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());

app.use(router);

dbConnect();

app.use(errorHandler);

app.listen(PORT, console.log(`Backend is running on port: ${PORT}`));

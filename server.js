const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const { json } = require("express");
require("dotenv").config();
const contactRouter = require("./routers/contactsRouter");
const userRouter = require("./routers/userRouter");

const port = process.env.PORT || 8080;
const url = process.env.MONGO_URL;

module.exports = class ContactServer {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    await this.initDatabase();
    this.startListeningServer();
  }

  initServer() {
    this.server = express();
  }
  initMiddlewares() {
    this.server.use(json());
    this.server.use(cors());
    this.server.use(morgan("dev"));
  }

  initRoutes() {
    this.server.use("/api/contacts", contactRouter);
    this.server.use("/api/users", userRouter);
  }

  async initDatabase() {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });

      console.log("Succesfuly connected to database sir!");
    } catch (error) {
      console.log("error :", error);
      process.exit(1);
    }
  }

  startListeningServer() {
    this.server.listen(port, () => {
      console.log(`Server works on port ${port}`);
    });
  }
};

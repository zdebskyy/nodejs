const express = require("express");
const contactsRouter = require("./routers/contactsRouter");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;
const url = process.env.MONGO_URL;

app.use("/api/contacts", contactsRouter);

async function start() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log("Succesfuly connected to database sir!");
  } catch (error) {
    console.log("error", error);
  }
}

start();

app.listen(port, () => {
  console.log(`Server works on port ${port}`);
});

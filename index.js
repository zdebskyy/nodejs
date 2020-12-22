const express = require("express");
const userRouter = require("./routers/contactsRouter");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.use("/api/contacts", userRouter);
app.listen(port, () => {
  console.log(`Server works on port ${port}`);
});

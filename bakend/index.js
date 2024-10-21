const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;
const app = express();
const pickingRoute= require("./routes/picking.js");
const userRoute= require("./routes/user.js");

app.use(express.json());
mongoose
  .connect(`mongodb+srv://harshnegi2004:QtwnrBVo6yGPxTDi@cluster0.oupqv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    console.log("Successful connection");
  })
  .catch((err) => console.log(`Ran into: ${err}`));
  app.use("/api",  pickingRoute);
  app.use("/api",  userRoute);

app.get("/", (req, res) => {
  return res.json({ message: "healthy server" });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
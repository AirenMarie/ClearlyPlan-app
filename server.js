console.log("API key:", process.env.CLIENT_ID);

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

const port = 3000;

app.use(express.static("./front"));
app.use(express.json);
app.use(express.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
  console.log("Press Ctrl+C/Cmd+C to end this process.");
});

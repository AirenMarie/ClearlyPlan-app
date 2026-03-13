import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

const port = 3000;

const corsOptions = {
  origin: `http://localhost:${port}`,
};

app.use(cors(corsOptions));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function imageAndQuote() {
  try {
    const image = `https://api.unsplash.com/topics?client_id=${process.env.UNSPLASH_KEY}`;

    const response = await fetch(image);
    const data = await response.json();
    const imageUrl = data;
    console.log(data);

    return imageUrl;
  } catch (error) {
    console.error(error);
  }
}

app.get("/api/v1/imageAndQuote", async (request, response) => {
  try {
    const images = await imageAndQuote();

    response.status(200).json({
      status: 200,
      data: images,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
  console.log("Press Ctrl+C to end this process.");
});

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

async function fetchImages() {
  try {
    const image = `https://api.unsplash.com/topics/spring/photos?client_id=${process.env.UNSPLASH_KEY}`;

    const response = await fetch(image);
    const data = await response.json();
    const imageUrl = data;
    console.log(data);

    return imageUrl;
  } catch (error) {
    console.error(error);
  }
}

async function fetchQuotes() {
  try {
    const quote =
      "https://api.api-ninjas.com/v2/randomquotes?categories=wisdom,courage,success";
    const api_key = process.env.QUOTES_KEY;

    const response = await fetch(quote, {
      headers: { "X-Api-Key": api_key },
    });
    const data = await response.json();

    if (data.length > 0) {
      console.log("Success! Your quote:", data[0]);
    } else {
      console.log("No quotes found in this category.");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}

app.get("/api/v1/fetchImages", async (request, response) => {
  try {
    const images = await fetchImages();

    response.status(200).json({
      status: 200,
      data: images,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.get("/api/v1/fetchQuotes", async (request, response) => {
  try {
    const quotes = await fetchQuotes();

    response.status(200).json({
      status: 200,
      data: quotes,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
  console.log("Press Ctrl+C to end this process.");
});

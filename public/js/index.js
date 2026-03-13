async function imageAndQuote() {
  try {
    const endpoint = "http://localhost:3000/api/v1/imageAndQuote";

    const response = await fetch(endpoint);
    const result = await response.json();

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

imageAndQuote();

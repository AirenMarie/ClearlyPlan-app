async function fetchImages() {
  try {
    const endpoint = "http://localhost:3000/api/v1/fetchImages";

    const response = await fetch(endpoint);
    const result = await response.json();

    const randomImg = Math.floor(Math.random() * result.data.length);
    const topImage = result.data[randomImg];
    const imgUrl = topImage.urls.regular;

    console.log(imgUrl);

    const quoteCard = document.getElementById("quote-section");
    if (imgUrl) {
      quoteCard.style.backgroundImage = `url("${imgUrl}")`;
      quoteCard.style.backgroundSize = "cover";
      quoteCard.style.backgroundPosition = "center";
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchQuotes() {
  try {
    const endpoint = "http://localhost:3000/api/v1/fetchQuotes";

    const response = await fetch(endpoint);
    const result = await response.json();

    console.log(result.data[0].quote);

    const quoteText = document.getElementById("quote-text");

    if (quoteText && result) {
      quoteText.innerHTML = `<p><i>"${result.data[0].quote}"</i>--${result.data[0].author}</p>`;
    }
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log(document.getElementById("quote-section"));
  console.log(document.getElementById("quote-text"));
});

fetchImages();
fetchQuotes();

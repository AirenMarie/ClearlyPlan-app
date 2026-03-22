async function fetchImages() {
  try {
    const endpoint = "http://localhost:3000/api/v1/fetchImages";

    const response = await fetch(endpoint);
    const result = await response.json();
    const imgUrl = result.data;

    console.log(result);

    const quoteCard = document.querySelector("#quote-section");
    quoteCard.style.backgroundImage = `url("${imgUrl}")`;
  } catch (error) {
    console.error(error);
  }
}

async function fetchQuotes() {
  try {
    const endpoint = "http://localhost:3000/api/v1/fetchQuotes";

    const response = await fetch(endpoint);
    const result = await response.json();
    const data = result[0];

    console.log(data);

    const quoteText = document.querySelector("#quote");

    if (quoteText && data) {
      quoteText.innerHTML = `<p><i>"${data.quote}"</i>--${data.author}</p>`;
    }
  } catch (error) {
    console.error(error);
  }
}

fetchImages();
fetchQuotes();

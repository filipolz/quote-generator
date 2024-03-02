const getElement = (identifier) => {
    const element = document.getElementById(identifier);
    !element && console.error(`Element with id: ${identifier} not found`);
    return element;
}

const shareQuote = () => {
    if (!quote.textContent || !author.textContent) {
        console.error("No quote or author to share");
        return;
    }
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.textContent}" - ${author.textContent}`)}`;
    window.open(twitterUrl, '_blank');
}


let data = [];
const quoteContainer = getElement("quote-container");
const quote = getElement("quote");
const author = getElement("author");
const newQuoteBtn = getElement("new-quote");
const twitterBtn = getElement("twitter");


function newQuote() {
    (data.length === 0) && console.error("No quotes available");

    const quotes = data[Math.floor(Math.random() * data.length)];
    const authorText = quotes.author;
    const quoteText = quotes.text;
    quote.textContent = quoteText;
    author.textContent = authorText ? authorText : "Unknown";

    quote.classList.toggle("long-quote", quoteText.length > 120);
}

function localQuote() {
    const localQuoteData = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    console.log(localQuoteData);
}

async function getQuotes() {
    const apiURL = "https://type.fit/api/quotes";

    try {
        const response = await fetch(apiURL);
        const apiQuotes = await response.json();

        data = [...localQuotes, ...apiQuotes];
        newQuote();
    } catch (error) {
        console.error("Error fetching quotes", error);
        data = [...localQuotes];
        newQuote();
    }
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener('click', shareQuote);

getQuotes();
localQuote();
const getElement = (id) => document.getElementById(id);
const logError = (message) => console.error(message);
const assignEventListener = (element, event, callback) =>
    element ? element.addEventListener(event, callback) : logError(`${element} not found for event: ${event}`);

let data = [];
const elements = {
    quoteContainer: getElement("quote-container"),
    quote: getElement("quote"),
    author : getElement("author"),
    newQuoteBtn :  getElement("new-quote"),
    twitterBtn : getElement("twitter"),
}

const shareQuote = () => {
    (!elements.quote.textContent || !elements.author.textContent) && logError("No quote or author to share");

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${elements.quote.textContent}" - ${elements.author.textContent}`)}`;
    window.open(twitterUrl, '_blank');
}

const setQuote = ({ author: authorText = "Unknown", text: quoteText }) => {
    const { quote, author } = elements;
    quote.textContent = quoteText;
    author.textContent = ` - ${authorText}`;
    quote.classList.toggle("long-quote", quoteText.length > 120);
}

const newQuote = () => {
    (!data.length) && logError("No quotes to display");
    setQuote(data[Math.floor(Math.random() * data.length)]);
}

async function getQuotes() {
    const apiURL = "https://type.fit/api/quotes";

    try {
        const response = await fetch(apiURL);
        const apiQuotes = await response.json();

        // not need to define localQuotes as it's already defined in the data array in quotes.js
        // which shares the same JavaScript execution context and global scope as this source file.
        data = [...localQuotes, ...apiQuotes];
        newQuote();
    } catch (error) {
        console.error("Error fetching quotes", error);
        data = [...localQuotes];
        newQuote();
    }
}

assignEventListener(elements.newQuoteBtn, "click", newQuote);
assignEventListener(elements.twitterBtn, "click", shareQuote);

getQuotes();
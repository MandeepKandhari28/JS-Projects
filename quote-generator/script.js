const quoteContainer = document.getElementById('quote-container');
const errorContainer = document.getElementById('error-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const retryButton = document.getElementById('error-btn');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

const loader = document.getElementById('loader');


const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
    errorContainer.hidden = true;
}

// Hide Loading
const quoteRequestComplete = () => {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
        errorContainer.hidden = true;
    }
}

const showErrorMessage = () => {
    errorContainer.hidden = false;
    quoteContainer.hidden = true;
    loader.hidden = true;
}

// Get Quote from API
const getQuote = async () => {
    showLoadingSpinner();
    
    /* The quote-generator api is not sending the cors
     headers and hence the response is being blocked/
     rejected by the browser. In order to resolve it, we 
     can send the cors headers using a proxy server
    */
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // If author is blank then display Unknown
        data.quoteAuthor === '' ? authorText.innerText = 'Unknown' : authorText.innerText = data.quoteAuthor;

        // reduce font-size for long quotes
        if(data.quoteText > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;

        // stop loader and show the quote
        quoteRequestComplete();

    
    } catch(error) {
        // getNewQuoteAfterTimeout = setTimeout(getQuote, 5000);
        
        setTimeout(showErrorMessage, 1000);
    }
}

// Tweet Quote
const tweetQuote = () => {
    const quote = quoteText.innerText;
    const author = authorText.innerText;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    window.open(twitterUrl, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
retryButton.addEventListener('click', getQuote);

// On Load
getQuote();
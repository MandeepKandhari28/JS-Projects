const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// toggle button state 
const toggleButtonState = () => {
    button.disabled = !button.disabled;
}

// take the Joke as an argument and play the joke using TTS
const playJoke = (joke) => {
    const jokeString =  joke.trim().replace(/ /g, '%20');
    
    VoiceRSS.speech({
        key: '76bd007da07a49ec90b55485383455df',
        src: jokeString,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}



// Get Jokes from Joke API
const getJokes = async () => {
    let joke = '';
    const apiURL = 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,racist,sexist,explicit';
    try{
        const response = await fetch(apiURL);

        const data = await response.json();

        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        
        playJoke(joke);

        // Disable the button
        toggleButtonState();
    } catch(error) {
        console.log('error while fetching jokes', error);
    }
}

// Event Listeners

button.addEventListener('click', getJokes);

audioElement.addEventListener('ended', toggleButtonState);
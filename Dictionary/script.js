// DOM Elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const result = document.getElementById('result');
const soundButton = document.getElementById('sound-button');
const wordElement = document.getElementById('word');
const phoneticElement = document.getElementById('phonetic');
const meaningsElement = document.getElementById('meanings');
const errorElement = document.getElementById('error');

// Audio object for pronunciation
let audio;

// Dictionary API URL
const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// Event Listeners
searchButton.addEventListener('click', searchWord);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchWord();
    }
});

// Main search function
async function searchWord() {
    const word = searchInput.value.trim();
    
    if (!word) {
        showError('Please enter a word to search.');
        return;
    }

    try {
        // Show loading state
        result.classList.remove('active');
        errorElement.style.display = 'none';
        
        const response = await fetch(API_URL + word);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Word not found');
        }

        displayResults(data[0]);

    } catch (error) {
        showError('Sorry, we couldn\'t find that word. Please try another one.');
    }
}

// Display the results
function displayResults(data) {
    // Clear previous results
    meaningsElement.innerHTML = '';
    
    // Display word and phonetic
    wordElement.textContent = data.word;
    phoneticElement.textContent = data.phonetic || '';

    // Set up audio if available
    const phonetics = data.phonetics || [];
    const audioUrl = phonetics.find(p => p.audio)?.audio || '';
    
    if (audioUrl) {
        audio = new Audio(audioUrl);
        soundButton.style.display = 'block';
        soundButton.onclick = () => audio.play();
    } else {
        soundButton.style.display = 'none';
    }

    // Display meanings
    data.meanings.forEach(meaning => {
        const meaningDiv = document.createElement('div');
        meaningDiv.classList.add('meaning');

        // Part of speech
        const partOfSpeech = document.createElement('p');
        partOfSpeech.classList.add('part-of-speech');
        partOfSpeech.textContent = meaning.partOfSpeech;
        meaningDiv.appendChild(partOfSpeech);

        // Definitions
        meaning.definitions.forEach(def => {
            const definition = document.createElement('div');
            definition.classList.add('definition');
            
            definition.innerHTML = `
                <p>${def.definition}</p>
                ${def.example ? `<p class="example">Example: ${def.example}</p>` : ''}
            `;
            
            meaningDiv.appendChild(definition);
        });

        meaningsElement.appendChild(meaningDiv);
    });

    // Show results
    result.classList.add('active');
    errorElement.style.display = 'none';
}

// Show error message
function showError(message) {
    result.classList.remove('active');
    errorElement.style.display = 'block';
    errorElement.textContent = message;
}
// manipulating AudioContext API

const audioElement = document.querySelector("audio");
const playButton = document.querySelector("button");
const volumeSlider = document.querySelector(".volume");


const audioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const audioSource = audioCtx.createMediaElementSource(audioElement);

const States =
{
    playing: "playing",
    paused: "paused",
    suspended: "suspended",
    ended: "ended",
}

function changeState(e, newState, buttonText)
{
    e.target.setAttribute('class', newState);
    e.target.textContent = buttonText;

    if(newState === States.playing)
    {
        audioElement.play();
    }
    else if(newState === States.paused)
    {
        audioElement.pause();
    }
}

playButton.addEventListener('click', (event) => 
{
    const state = event.target.getAttribute('class');

    if(audioCtx.state === States.suspended)
    {
        audioCtx.resume();
    }


    if(state === States.playing)
    {
        changeState(event, States.paused, "Play");
    }
    else if(state === States.paused)
    {
        changeState(event, States.playing, "Stop");
    }
});

audioElement.addEventListener(States.ended, (event) =>
{
    console.log("ended");
    event.target.setAttribute('class', States.paused);
    event.target.textContent = "Play";
});


const gainNode = audioCtx.createGain();
volumeSlider.addEventListener('input', () =>
{
    gainNode.gain.value = volumeSlider.value;
});

audioSource.connect(gainNode).connect(audioCtx.destination);







// Manipulating documents

const link = document.querySelector("a");
const section = document.querySelector("section");

link.textContent = "Mozilla developer network";
link.href = 'https://developer.mozilla.org';

const heading = document.createElement('h3');
heading.textContent = "Get to know useful techinques."
section.appendChild(heading);

const text = document.createTextNode(' - the premier source of web dev.');
const linkPara = document.querySelector('p');
linkPara.appendChild(text);

heading.after(linkPara);
//linkPara.removeChild(text);
//text.remove();
//text.parentNode.removeChild(text);

heading.setAttribute('class', 'highlight');



// Manipulating documents - shopping list example

shoppingContainer = document.querySelector("#shopping-container");
shoppingInput = document.querySelector("#item-input");
shoppingButton = document.querySelector("#add-item");
shoppingList = document.querySelector("#list");

shoppingButton.addEventListener('click', () =>
{
    inputValue = shoppingInput.value;
    if(inputValue.length < 2)
    {
        return window.alert("Define a proper shopping name, your name is too short.")
    }
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'div-shopping-item');
    shoppingList.appendChild(newDiv);

    const newItem = document.createElement("li");
    newItem.textContent = inputValue;
    newItem.style.display = "inline";
    newDiv.appendChild(newItem);

    const newButton = document.createElement("button");
    newButton.textContent = "Delete";
    newDiv.appendChild(newButton);

    newButton.addEventListener('click', (event) =>
    {
        event.target.parentElement.remove();
    });

    shoppingInput.value = "";
    shoppingInput.focus();
});



// Fetching data from the server

const verseChoose = document.querySelector('select');
const verseDisplay = document.querySelector('pre');

verseChoose.addEventListener('change', () =>
{
    updateVerseDisplay(verseChoose.value);
});

function updateVerseDisplay(verse)
{
    verse = verse.replace(' ', '');
    const verseUrl = `poems/${verse.toLowerCase()}.txt`

    fetch(verseUrl)
    .then((response) =>
    {
        if(!response.ok)
        {
            throw new Error(`HTTP error: ${response.status}`);
        }

        return response.text();
    })
    .then((text) =>
    {
        verseDisplay.textContent = text;
    } )
    .catch((error) => 
    {
        verseDisplay.textContent = `Could not fetch verse: ${error}`;
    });
}


updateVerseDisplay('Verse 1');
verseChoose.value = 'Verse 1';



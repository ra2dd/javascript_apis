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

const para = document.createElement('h3');
para.textContent = "Get to know useful techinques."
section.appendChild(para);

const text = document.createTextNode(' - the premier source of web dev.');
const linkPara = document.querySelector('p');
linkPara.appendChild(text);

const body = document.querySelector('body');
body.appendChild(linkPara);
//linkPara.removeChild(text);
//text.remove();
//text.parentNode.removeChild(text);


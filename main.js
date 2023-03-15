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
        console.log("resumed context");
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

audioCtx.addEventListener(States.ended, (event) =>
{
    changeState(event, States.paused, "Play");
});

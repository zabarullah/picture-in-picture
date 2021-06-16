const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream, ppass to video element, then play it

async function selectMediaStream() { // this function will prompt user to select video source then play it
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia(); // mediaStream will be assigned which window or screen the user will select to share
        videoElement.srcObject = mediaStream; // the mediaSteam will then be passed onto the videoElement as its source object
        videoElement.onloadedmetadata = () => { // then when the video has loaded its metadata, it will call a function that will play the video (next line)
            videoElement.play();
        }
    } catch (error) {
        // Catch Error Here
        console.log('Select media stream error:', error); 
    }
}

button.addEventListener('click', async () => { // this event listener on the button will work to request the picture in picture
    //Disable the button when we click on it
    button.disabled = true;
    //Start Picture in Picture
    await videoElement.requestPictureInPicture(); // will wait for the videoElement to request Picture in picture and will not do anything else until it has been done. Only then will the button disabled property be switched to false (next line)
    // Reset the button
    button.disabled = false; // will only happen if we successfully requested picture in picture (from line above due to the await feature), otherwise, the button remains disabled = true
});

//On Load
selectMediaStream();
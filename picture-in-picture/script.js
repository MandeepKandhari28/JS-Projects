const videoElement = document.getElementById('video');
const button = document.getElementById('button');
const pipButton = document.getElementById('button-pip');

// If the video picture in picture gets closed then we should stop sharing the screen 

// Prompt the user to select media stream, pass to video element, then play
const selectMediaStream = async () => {
    try {

        // Disable the button
        button.disabled = true;

        const mediaStream = await navigator.mediaDevices.getDisplayMedia();

        videoElement.srcObject = mediaStream;
        
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        };

        // Close the picture in picture window when user stops screen sharing
        mediaStream.getVideoTracks()[0].addEventListener('ended', () => {

            if (document.pictureInPictureElement) {
                document
                  .exitPictureInPicture()
                  .catch(error => {
                  // Error handling
                  console.log('error while exiting the picture in picture');
                })
              }

            button.disabled = false;
            pipButton.disabled = true;
          });

    } catch(error) {
        button.disabled = false;
        console.log('error', error);
    }
}

const stopSharingScreen = () => {
    let tracks = videoElement.srcObject.getTracks();

    tracks.forEach(track => track.stop());
    button.disabled = false;
    pipButton.disabled = true;
};

button.addEventListener('click', selectMediaStream);

pipButton.addEventListener('click', async () => {
    try {
        // Start Picture in Picture
        await videoElement.requestPictureInPicture();
    } catch(error) {
        // stop sharing the screen
        stopSharingScreen();
    }
});


// Play the video in picture-in picture mode as soon as video is ready to be played
videoElement.addEventListener('canplay', () => {
    pipButton.disabled = false;
});


// Stop sharing the screen if user closes the picture in picture
videoElement.addEventListener('leavepictureinpicture', () => {
    stopSharingScreen();
});

const initialButtonState = () => {
    pipButton.disabled = true;
}

// onLoad
initialButtonState();
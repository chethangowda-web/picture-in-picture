const video = document.getElementById('video');
const startBtn = document.getElementById('startBtn');
const pipBtn = document.getElementById('pipBtn');
const stopBtn = document.getElementById('stopBtn');
const statusText = document.getElementById('status');

let mediaStream;

async function startShare(){
  try{
    mediaStream = await navigator.mediaDevices.getDisplayMedia({video:true, audio:false});
    video.srcObject = mediaStream;
    video.onloadedmetadata = () => video.play();

    statusText.innerText = "Status: Live";

    pipBtn.disabled = false;
    stopBtn.disabled = false;
    startBtn.disabled = true;

    mediaStream.getVideoTracks()[0].addEventListener('ended', stopShare);
  }catch(err){
    statusText.innerText = "Status: Permission denied";
  }
}

async function enterPiP(){
  try{
    await video.requestPictureInPicture();
  }catch(err){
    console.log('PiP error', err);
  }
}

function stopShare(){
  if(mediaStream){
    mediaStream.getTracks().forEach(track => track.stop());
  }

  statusText.innerText = "Status: Stopped";
  startBtn.disabled = false;
  pipBtn.disabled = true;
  stopBtn.disabled = true;
}

startBtn.addEventListener('click', startShare);
pipBtn.addEventListener('click', enterPiP);
stopBtn.addEventListener('click', stopShare);

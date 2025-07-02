
document.addEventListener("DOMContentLoaded",()=>{
  
  const playpause = document.querySelector(".playpause");
  
  const overlayplay = document.querySelector(".overlay-play");
  
  const video = document.querySelector(".video");
  
  const progressBar = document.querySelector(".progressBar");
  
   const displayTime = progressBar.nextElementSibling;
   
   const muteUnmute = document.querySelector(".volume");
  
  //video link add:@@@@@@@@@@@@@@@@@
  video.src = "/miniproject/videoplayback.mp4";
  
  
  //document.querySelector(".controll").style.opacity = "1";
  
  
  
  let c =0;
  function playpauseToggle() {
    if(c){
      video.pause();
      playpause.innerHTML = '<i class="fas fa-play">';
      
      overlayplay.innerHTML = '<i class="fas fa-play">';
      
      c=0;
      
    }else{
      video.play();
      playpause.innerHTML = '<i class="fas fa-pause">'
      overlayplay.innerHTML= '<i class="fas fa-pause">';
       c=1;
    }
  }
  
  //playpause function:-
  playpause.addEventListener("click",playpauseToggle);
  
  overlayplay.addEventListener("click",playpauseToggle);
    
    
  
  //progressBar && displayTimen:-----
  
  function endPlayStop(m, tm, s, ts, tag) {
    m == tm && s == ts ? tag.innerHTML = '<i class="fas fa-play" ></i>' : '<i class="fas fa-pause" ></i>'
    
  }
  
  
  video.addEventListener("timeupdate",()=>{
    const currentTime =video.currentTime;
    const duration = video.duration;
    progressBar.value=((currentTime/duration)*100);
    
    const minute = Math.floor(currentTime/60);
    
    const sec = Math.floor(currentTime%60).toString().padStart(2,"0");
    
    const totalMinute =Math.floor(duration/60);
    const totalSec = Math.floor(duration%60).toString().padStart(2,"0");
    
    displayTime.textContent=`${minute}:${sec}/${totalMinute}:${totalSec}`
    
    endPlayStop(minute,totalMinute,sec,totalSec,overlayplay);
    
    endPlayStop(minute,totalMinute,sec,totalSec,playpause);
    
  });
  
  //progress Bar timeUpdate:---------
  progressBar.addEventListener("input",()=>{
    video.currentTime=(progressBar.value/100)*video.duration;
  });
  
  //muteUnmute:-------------
  muteUnmute.addEventListener("click",(e)=>{
     video.muted =!video.muted;
    video.muted? muteUnmute.innerHTML='<i class="fas fa-volume-mute" ></i>'
     :muteUnmute.innerHTML='<i class="fas fa-volume-up" ></i>'
  });
  
  
  //volume progress Bar :-----------
  
  const vlProgressBar = document.querySelector(".volume-progress");
  
  vlProgressBar.addEventListener("input",()=>{video.volume=vlProgressBar.value});
  
  
  //speedmeter :-------------------
 const speed = document.querySelector(".speed");
 
 speed.addEventListener("click",()=>{
    const newSpeed = video.playbackRate=== 1 ? 2:1;
    
    video.playbackRate = newSpeed;
    speed.innerHTML=`${newSpeed}x`;
  });
  
  
  //pictureInpicture:-----
  document.querySelector(".pip_link").addEventListener("click", async(e)=>{if(document.pictureInPictureElement){ await document.exitPictureInPicture();}
  else if(video.requestPictureInPicture){
     await video.requestPictureInPicture();
  }
  });
  
  document.querySelector(".fullscreen").addEventListener("click",(e)=>{
    if(document.fullscreenElement){
      video.exitFullscreen();
    }else{video.requestFullscreen();}
  });
  
  
});
  

  
  

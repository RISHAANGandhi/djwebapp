function setup(){
    canvas=createCanvas(500,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on("pose",gotposes);
}
var scoreleftwrist=0;
var scorerightwrist=0;
var song_status1="";
var song_status2="";
song1="";
song2="";
 function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");

 }
 function draw(){
    image(video,0,0,500,400);
    fill("red");
    stroke("red");
    if(scoreleftwrist>0.2){
      circle(leftwristX,leftwristY,30);
      song1.stop();
      if(song_status2==false){
         song2.play();
         document.getElementById("songname").innerHTML="Playing Peter Pan Song";
      }
    }
 }
 function modelloaded(){
   console.log("model loaded");
 }
 var leftwristX=0;
 var leftwristY=0;
 var rightwristX=0;
 var rightwristY=0;
 function gotposes(results){
   if(results.length>0) {
      console.log(results);
      leftwristX=results[0].pose.leftWrist.x;
      leftwristY=results[0].pose.leftWrist.y;
      console.log("Left wrist x= "+leftwristX+" Left wrist y= "+leftwristY);

      rightwristX=results[0].pose.rightWrist.x;
      rightwristY=results[0].pose.rightWrist.y;
      console.log("Right wrist x= "+rightwristX+"Right wrist y= "+rightwristY);
      scoreleftwrist=results[0].pose.keypoints[9].score;
      console.log(scoreleftwrist);
      scorerightwrist=results[0].pose.keypoints[9].score;
      console.log(scorerightwrist);
   }
 }

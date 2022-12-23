Status = "";
objects = [];
function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    ObjectDetector = ml5.ObjectDetector('cocossd', modelloaded);
    document.getElmentById("status").innerHTML = "Status: Objects Detecting";
    input = document.getElementById("input").value;
}

function modelloaded() {
    console.log("Model is initialized");
    Status = true;
}

function gotresults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 500, 600);
    if(Status != ""){
        ObjectDetector.detect(video, gotresults);
        for(var i=0; i < objects.length; i++){
            percent = floor(objects[i].confidence * 100);

            fill("white");
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("white");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label = input){
                video.stop();
                ObjectDetector.detect(gotresults);
                document.getElmentById("btn-found").innerHTML = input + " Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input + " found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("btn_found").innerHTML = input + " Note found";
            }
        }
    }
}
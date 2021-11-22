data_set = ["airplane", "apple", "bottle", "bread", "book", "apple", "cell phone", "board", "pillow"];

random_number = Math.floor((Math.random() * data_set.length) + 1);

console.log(data_set[random_number]);
sketch = data_set[random_number];
document.getElementById("to_draw").innerHTML = "Sketch to be drawn : " + sketch;

timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;

function preload() {
    classifier=ml5.imageClassifier("DoodleNet");
}

function setup() {
    var canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}

function classifyCanvas(){
    classifier.classify(canvas,got_result);
}

function draw() {
    strokeWeight(10);
    stroke("purple");
    if(mouseIsPressed)
    {
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
    check_sketch();
    if(drawn_sketch==sketch){
        answer_holder="set";
        score++;
        document.getElementById("score").innerHTML="Score: "+score;
    }
}

function got_result(error,results)
{
    if(error){
        console.error(error);
    }
    console.log(results);
    drawn_sketch=results[0].label;
    document.getElementById("label").innerHTML="Your sketch: "+drawn_sketch;
    document.getElementById("cofidence").innerHTML="Confidence: "+Math.round(results[0].confidence*100)+" %";
}

function check_sketch()
{
    timer_counter++;
    document.getElementById("timer").innerHTML="Timer: "+timer_counter;
    if(timer_counter>400){
        timer_counter=0;
        timer_check="completed";
    }

    if(timer_check=="completed" || answer_holder=="set"){
        timer_check="";
        answer_holder="";
        update_canvas();
    }
}

function clear_canvas() {
    background("white");
}

function update_canvas() {
    background("white");
    random_number = Math.floor((Math.random() * data_set.length) + 1);

    console.log(data_set[random_number]);
    sketch = data_set[random_number];
    document.getElementById("to_draw").innerHTML = "Sketch to be drawn : " + sketch;
}